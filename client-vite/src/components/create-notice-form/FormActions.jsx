import React from 'react';

export default function FormActions({ onSaveDraft, onSubmit, isSubmitting }) {
    return (
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
            <button
                type="button"
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Cancel
            </button>
            <button
                type="button"
                onClick={onSaveDraft}
                disabled={isSubmitting}
                className="px-6 py-2 border border-blue-200 text-blue-600 rounded-full font-medium hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Save as Draft
            </button>
            <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 shadow-lg shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Publishing...
                    </>
                ) : (
                    <>✓ Publish Notice</>
                )}
            </button>
        </div>
    );
}
