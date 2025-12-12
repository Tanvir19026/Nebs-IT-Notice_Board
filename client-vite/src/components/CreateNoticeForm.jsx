import { useState, useRef } from 'react';
import { Calendar, Upload, File, X } from 'lucide-react';
import api from '../lib/api';
import SuccessModal from './SuccessModal';

export default function CreateNoticeForm() {
    const [targetType, setTargetType] = useState('Individual');
    const [selectedDepartment, setSelectedDepartment] = useState('Sales Team');
    const [showSuccess, setShowSuccess] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        noticeType: '',
        employeeId: '',
        employeeName: '',
        employeePosition: '',
        publishDate: '',
        body: '',
    });

    const departmentOptions = [
        "All Department",
        "Finance",
        "Sales Team",
        "Web Team",
        "Database Team",
        "Admin",
        "HR"
    ];

    const positionOptions = [
        "Software Engineer",
        "Senior Software Engineer",
        "Team Lead",
        "Project Manager",
        "HR Manager",
        "Sales Executive",
        "Data Analyst",
        "System Administrator",
        "Content Writer",
        "Designer"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
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

    const validateForm = () => {
        const newErrors = {};

        // 1. Title Validation: Required, 5-100 chars, Not numeric only
        if (!formData.title.trim()) {
            newErrors.title = "Notice Title is required";
        } else if (formData.title.length < 5 || formData.title.length > 100) {
            newErrors.title = "Title must be between 5 and 100 characters";
        } else if (/^\d+$/.test(formData.title.trim())) {
            newErrors.title = "Title cannot be only numbers. Please provide a valid descriptive title.";
        }

        // 2. Notice Type: Required
        if (!formData.noticeType) {
            newErrors.noticeType = "Notice Type is required";
        }

        // 3. Publish Date: Required, Not in past
        if (!formData.publishDate) {
            newErrors.publishDate = "Publish Date is required";
        } else {
            const selectedDate = new Date(formData.publishDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time part for accurate comparison
            if (selectedDate < today) {
                newErrors.publishDate = "Publish Date cannot be in the past";
            }
        }

        // 4. Individual Target Validation
        if (targetType === 'Individual') {
            // Employee ID: Required, Format Check (EMP-XXXX), Existence Check (Placeholder)
            if (!formData.employeeId.trim()) {
                newErrors.employeeId = "Employee ID is required";
            } else if (!/^EMP-[a-zA-Z0-9]+$/i.test(formData.employeeId.trim())) {
                newErrors.employeeId = "Employee ID must follow format 'EMP-XXXX' (alphanumeric)";
            }
            // Note: Existence check logic would go here (e.g., API call usually)

            // Employee Name: Required, Text Only
            if (!formData.employeeName.trim()) {
                newErrors.employeeName = "Employee Name is required";
            } else if (!/^[a-zA-Z\s-]+$/.test(formData.employeeName.trim())) {
                newErrors.employeeName = "Name must contain only letters, spaces, or hyphens";
            } else if (formData.employeeName.length < 2) {
                newErrors.employeeName = "Name is too short";
            }

            // Position: Required
            if (!formData.employeePosition) {
                newErrors.employeePosition = "Position is required";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e, status = 'Published') => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

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
        }
    };

    return (
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-4">Please fill in the details below</h2>

            <form onSubmit={(e) => handleSubmit(e, 'Published')} className="space-y-6">

                {/* Target Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="text-red-500">*</span> Target Department(s) or Individual
                    </label>
                    <div className="relative">
                        <select
                            value={targetType}
                            onChange={(e) => setTargetType(e.target.value)}
                            className="w-full bg-blue-50/50 border border-blue-100 rounded-lg px-4 py-3 text-blue-600 appearance-none focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                        >
                            <option value="Individual">Individual</option>
                            <option value="Department">Department</option>
                        </select>
                    </div>

                    {targetType === 'Department' && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:border-blue-400 outline-none text-gray-600 bg-white"
                            >
                                {departmentOptions.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="text-red-500">*</span> Notice Title
                    </label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Write the Title of Notice"
                        className={`w-full border rounded-lg px-4 py-2.5 outline-none transition-all placeholder:text-gray-400 ${errors.title ? 'border-red-500 ring-2 ring-red-50' : 'border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50'}`}
                    />
                    {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                </div>

                {/* Employee Details (Conditional) */}
                {targetType === 'Individual' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-red-500">*</span> Select Employee ID
                            </label>
                            <input
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                placeholder="e.g. EMP-1234"
                                className={`w-full border rounded-lg px-4 py-2.5 outline-none ${errors.employeeId ? 'border-red-500 ring-2 ring-red-50' : 'border-gray-200 focus:border-blue-400'}`}
                            />
                            {errors.employeeId && <p className="text-xs text-red-500 mt-1">{errors.employeeId}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-red-500">*</span> Employee Name
                            </label>
                            <input
                                name="employeeName"
                                value={formData.employeeName}
                                onChange={handleChange}
                                placeholder="Enter employee full name"
                                className={`w-full border rounded-lg px-4 py-2.5 outline-none ${errors.employeeName ? 'border-red-500 ring-2 ring-red-50' : 'border-gray-200 focus:border-blue-400'}`}
                            />
                            {errors.employeeName && <p className="text-xs text-red-500 mt-1">{errors.employeeName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-red-500">*</span> Position
                            </label>
                            <select
                                name="employeePosition"
                                value={formData.employeePosition}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-4 py-2.5 outline-none bg-white text-gray-600 ${errors.employeePosition ? 'border-red-500 ring-2 ring-red-50' : 'border-gray-200 focus:border-blue-400'}`}
                            >
                                <option value="">Select Position</option>
                                {positionOptions.map(pos => (
                                    <option key={pos} value={pos}>{pos}</option>
                                ))}
                            </select>
                            {errors.employeePosition && <p className="text-xs text-red-500 mt-1">{errors.employeePosition}</p>}
                        </div>
                    </div>
                )}

                {/* Type & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <span className="text-red-500">*</span> Notice Type
                        </label>
                        <select
                            name="noticeType"
                            value={formData.noticeType}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-4 py-2.5 outline-none text-gray-600 bg-white ${errors.noticeType ? 'border-red-500 ring-2 ring-red-50' : 'border-gray-200 focus:border-blue-400'}`}
                        >
                            <option value="">Select Notice Type</option>
                            <option>General / Company-Wide</option>
                            <option>Holiday & Event</option>
                            <option>HR & Policy Update</option>
                            <option>Finance & Payroll</option>
                            <option>IT / System Maintenance</option>
                            <option>Department / Team</option>
                            <option>Warning / Disciplinary</option>
                            <option>Emergency / Urgent</option>
                        </select>
                        {errors.noticeType && <p className="text-xs text-red-500 mt-1">{errors.noticeType}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <span className="text-red-500">*</span> Publish Date
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                name="publishDate"
                                value={formData.publishDate}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-4 py-2.5 outline-none text-gray-600 uppercase ${errors.publishDate ? 'border-red-500 ring-2 ring-red-50' : 'border-gray-200 focus:border-blue-400'}`}
                            />
                            <Calendar className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
                        </div>
                        {errors.publishDate && <p className="text-xs text-red-500 mt-1">{errors.publishDate}</p>}
                    </div>
                </div>

                {/* Body */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notice Body
                    </label>
                    <textarea
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        placeholder="Write the details about notice"
                        rows={4}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-gray-400 resize-none"
                    />
                </div>

                {/* Attachments */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Attachments (optional)
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".jpg,.png,.pdf"
                    />

                    {!attachment ? (
                        <div
                            onClick={() => fileInputRef.current.click()}
                            className="border-2 border-dashed border-green-200 rounded-lg p-8 bg-green-50/30 text-center hover:bg-green-50 transition-colors cursor-pointer"
                        >
                            <Upload className="mx-auto text-green-500 mb-2" />
                            <p className="text-xs text-green-700 font-medium">Upload notice file or drag and drop.</p>
                            <p className="text-xs text-gray-400 mt-1">Accepted File Type: jpg, png, pdf</p>
                        </div>
                    ) : (
                        <div className="mt-3 inline-flex items-center gap-2 bg-gray-100 rounded px-3 py-1.5 ">
                            <File size={14} className="text-gray-500" />
                            <span className="text-sm text-gray-600">{attachment.name}</span>
                            <X size={14} className="text-red-400 cursor-pointer hover:text-red-600" onClick={removeAttachment} />
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                    <button type="button" className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e, 'Draft')}
                        className="px-6 py-2 border border-blue-200 text-blue-600 rounded-full font-medium hover:bg-blue-50"
                    >
                        Save as Draft
                    </button>
                    <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 shadow-lg shadow-orange-200">
                        ✓ Publish Notice
                    </button>
                </div>
            </form>

            {showSuccess && <SuccessModal title={formData.title} date={formData.publishDate} onClose={() => {
                setShowSuccess(false);
                setFormData({ ...formData, title: '', body: '' });
                setAttachment(null);
            }} />}
        </div>
    );
}
