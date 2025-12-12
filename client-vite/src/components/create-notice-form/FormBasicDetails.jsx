import React from 'react';
import { Calendar } from 'lucide-react';

export default function FormBasicDetails({ formData, handleChange, errors }) {
    return (
        <div className="space-y-6">
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
        </div>
    );
}
