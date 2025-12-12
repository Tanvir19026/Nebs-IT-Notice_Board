import React from 'react';

export default function TargetSelector({ targetType, setTargetType, selectedDepartment, setSelectedDepartment, departmentOptions }) {
    return (
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
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
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
    );
}
