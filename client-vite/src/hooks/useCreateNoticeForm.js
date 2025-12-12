import { useState, useRef } from 'react';
import api from '../lib/api';

export default function useCreateNoticeForm() {
    const [targetType, setTargetType] = useState('Individual');
    const [selectedDepartment, setSelectedDepartment] = useState('Sales Team');
    const [showSuccess, setShowSuccess] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const fileInputRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAttachment(e.target.files[0]);
        }
    };

    const removeAttachment = () => {
        setAttachment(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const resetForm = () => {
        setIsSubmitting(false);
        setShowSuccess(false);
        setFormData({
            title: '',
            noticeType: '',
            employeeId: '',
            employeeName: '',
            employeePosition: '',
            publishDate: '',
            body: '',
        });
        setAttachment(null);
        setTargetType('Individual');
        setSelectedDepartment('Sales Team');
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        // 1. Title
        if (!formData.title.trim()) {
            newErrors.title = "Notice Title is required";
        } else if (formData.title.length < 5 || formData.title.length > 100) {
            newErrors.title = "Title must be between 5 and 100 characters";
        } else if (/^\d+$/.test(formData.title.trim())) {
            newErrors.title = "Title cannot be only numbers.";
        }

        // 2. Notice Type
        if (!formData.noticeType) newErrors.noticeType = "Notice Type is required";

        // 3. Publish Date
        if (!formData.publishDate) {
            newErrors.publishDate = "Publish Date is required";
        } else {
            const selectedDate = new Date(formData.publishDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) newErrors.publishDate = "Publish Date cannot be in the past";
        }

        // 4. Individual Target
        if (targetType === 'Individual') {
            if (!formData.employeeId.trim()) {
                newErrors.employeeId = "Employee ID is required";
            } else if (!/^EMP-[a-zA-Z0-9]+$/i.test(formData.employeeId.trim())) {
                newErrors.employeeId = "Format: 'EMP-XXXX' (alphanumeric)";
            }

            if (!formData.employeeName.trim()) {
                newErrors.employeeName = "Employee Name is required";
            } else if (!/^[a-zA-Z\s-]+$/.test(formData.employeeName.trim())) {
                newErrors.employeeName = "Letters, spaces, hyphens only";
            } else if (formData.employeeName.length < 2) {
                newErrors.employeeName = "Name too short";
            }

            if (!formData.employeePosition) newErrors.employeePosition = "Position is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitForm = async (status = 'Published') => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await api.post('/notices', {
                title: formData.title,
                type: formData.noticeType,
                target: {
                    type: targetType === 'Individual' ? 'Individual' : 'Department',
                    value: targetType === 'Individual' ? 'Individual' : selectedDepartment
                },
                employeeDetails: targetType === 'Individual' ? {
                    employeeId: formData.employeeId,
                    name: formData.employeeName,
                    position: formData.employeePosition
                } : {},
                body: formData.body,
                publishDate: formData.publishDate,
                status: status,
                attachment: attachment ? attachment.name : ''
            });
            setShowSuccess(true);
        } catch (err) {
            console.error(err);
            alert("Failed to create notice");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        targetType,
        setTargetType,
        selectedDepartment,
        setSelectedDepartment,
        formData,
        handleChange,
        handleFileChange,
        removeAttachment,
        submitForm,
        showSuccess,
        resetForm,
        errors,
        attachment,
        fileInputRef,
        isSubmitting
    };
}
