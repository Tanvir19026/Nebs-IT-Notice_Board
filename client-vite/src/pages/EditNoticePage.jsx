import { useState, useRef, useEffect } from 'react';
import { Calendar, Upload, File, X, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../lib/api';
import SuccessModal from '../components/SuccessModal';

export default function EditNoticePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // States
    const [targetType, setTargetType] = useState('Individual');
    const [selectedDepartment, setSelectedDepartment] = useState('Sales Team');
    const [showSuccess, setShowSuccess] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [loading, setLoading] = useState(true);
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

    const departmentOptions = ["All Department", "Finance", "Sales Team", "Web Team", "Database Team", "Admin", "HR"];
    const positionOptions = ["Software Engineer", "Senior Software Engineer", "Team Lead", "Project Manager", "HR Manager", "Sales Executive", "Data Analyst", "System Administrator", "Content Writer", "Designer"];

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await api.get(`/notices/${id}`);
                const data = res.data;

                setFormData({
                    title: data.title,
                    noticeType: data.type,
                    employeeId: data.employeeDetails?.employeeId || '',
                    employeeName: data.employeeDetails?.name || '',
                    employeePosition: data.employeeDetails?.position || '',
                    publishDate: data.publishDate ? new Date(data.publishDate).toISOString().split('T')[0] : '',
                    body: data.body || '',
                });

                if (data.target) {
                    setTargetType(data.target.type);
                    if (data.target.type === 'Department') {
                        setSelectedDepartment(data.target.value);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch notice", err);
                alert("Could not load notice details");
                navigate('/notice-board');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchNotice();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) setAttachment(e.target.files[0]);
    };

    const removeAttachment = () => {
        setAttachment(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Notice Title is required";
        else if (formData.title.length < 5 || formData.title.length > 100) newErrors.title = "Title must be 5-100 chars";

        if (!formData.noticeType) newErrors.noticeType = "Notice Type is required";
        if (!formData.publishDate) newErrors.publishDate = "Publish Date is required";

        if (targetType === 'Individual') {
            if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
            if (!formData.employeeName.trim()) newErrors.employeeName = "Employee Name is required";
            if (!formData.employeePosition) newErrors.employeePosition = "Position is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await api.put(`/notices/${id}`, {
                title: formData.title,
                type: formData.noticeType,
                target: {
                    type: targetType,
                    value: targetType === 'Individual' ? 'Individual' : selectedDepartment
                },
                employeeDetails: targetType === 'Individual' ? {
                    employeeId: formData.employeeId,
                    name: formData.employeeName,
                    position: formData.employeePosition
                } : {},
                body: formData.body,
                publishDate: formData.publishDate,
                attachment: attachment ? attachment.name : '' // Placeholder logic
            });
            setShowSuccess(true);
        } catch (err) {
            console.error(err);
            alert("Failed to update notice");
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading notice...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Link to="/notice-board" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit Notice</h1>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 relative">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Reusing Form Structure roughly - condensed for brevity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
                        <select value={targetType} onChange={(e) => setTargetType(e.target.value)} className="w-full border rounded-lg px-4 py-2.5 outline-none bg-blue-50/50 text-blue-600">
                            <option value="Individual">Individual</option>
                            <option value="Department">Department</option>
                        </select>
                    </div>

                    {targetType === 'Department' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                            <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="w-full border rounded-lg px-4 py-2.5 outline-none">
                                {departmentOptions.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    )}

                    {/* Basic Fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} className="w-full border rounded-lg px-4 py-2.5 outline-none" />
                        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                    </div>

                    {targetType === 'Individual' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <input name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="EMP ID" className="w-full border rounded-lg px-4 py-2.5 outline-none" />
                            <input name="employeeName" value={formData.employeeName} onChange={handleChange} placeholder="Name" className="w-full border rounded-lg px-4 py-2.5 outline-none" />
                            <select name="employeePosition" value={formData.employeePosition} onChange={handleChange} className="w-full border rounded-lg px-4 py-2.5 outline-none">
                                <option value="">Position</option>
                                {positionOptions.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-6">
                        <select name="noticeType" value={formData.noticeType} onChange={handleChange} className="w-full border rounded-lg px-4 py-2.5 outline-none">
                            <option value="">Type</option>
                            <option>General / Company-Wide</option>
                            <option>Holiday & Event</option>
                            <option>HR & Policy Update</option>
                            <option>Finance & Payroll</option>
                            <option>IT / System Maintenance</option>
                            <option>Department / Team</option>
                            <option>Warning / Disciplinary</option>
                            <option>Emergency / Urgent</option>
                        </select>
                        <input type="date" name="publishDate" value={formData.publishDate} onChange={handleChange} className="w-full border rounded-lg px-4 py-2.5 outline-none" />
                    </div>

                    <textarea name="body" value={formData.body} onChange={handleChange} rows={4} className="w-full border rounded-lg px-4 py-2.5 outline-none" placeholder="Notice Body" />

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Link to="/notice-board" className="px-6 py-2 border rounded-full text-gray-600 hover:bg-gray-50">Cancel</Link>
                        <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600">Update Notice</button>
                    </div>
                </form>

                {showSuccess && <SuccessModal title="Notice Updated Successfully" date={formData.publishDate} onClose={() => { setShowSuccess(false); navigate('/notice-board'); }} />}
            </div>
        </div>
    );
}
