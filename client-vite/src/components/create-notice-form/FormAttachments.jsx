import React from 'react';
import { Upload, File, X } from 'lucide-react';

export default function FormAttachments({ attachment, handleFileChange, removeAttachment, fileInputRef }) {
    return (
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
    );
}
