import React from 'react';
import { Calendar } from 'lucide-react';

export default function NoticeMetaFields({ formData, handleChange, errors }) {
    return (
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
    );
}
