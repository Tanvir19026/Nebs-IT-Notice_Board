import React from 'react';

export default function FormTargetSection({
    targetType,
    setTargetType,
    selectedDepartment,
    setSelectedDepartment,
    formData,
    handleChange,
    errors,
    departmentOptions,
    positionOptions
}) {
    return (
        <div className="space-y-6">
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

            {/* Employee Details (Conditional) */}
            {targetType === 'Individual' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
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
        </div>
    );
}
