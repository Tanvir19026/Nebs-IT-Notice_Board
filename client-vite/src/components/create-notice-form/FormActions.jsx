import React from 'react';

export default function FormActions({ onSaveDraft, onSubmit }) {
    return (
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
            <button type="button" className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 font-medium hover:bg-gray-50">
                Cancel
            </button>
            <button
                type="button"
                onClick={onSaveDraft}
                className="px-6 py-2 border border-blue-200 text-blue-600 rounded-full font-medium hover:bg-blue-50"
            >
                Save as Draft
            </button>
            <button
                type="submit"
                onClick={onSubmit}
                className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 shadow-lg shadow-orange-200"
            >
                ✓ Publish Notice
            </button>
        </div>
    );
}
