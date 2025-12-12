import React from 'react';

export default function NoticeContentFields({ formData, handleChange, errors }) {
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
