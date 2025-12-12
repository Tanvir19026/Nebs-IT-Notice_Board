import { X, Calendar, User, Briefcase, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function ViewNoticeModal({ notice, onClose }) {
    if (!notice) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold 
                            ${notice.status === 'Published' ? 'bg-green-100 text-green-700' :
                                notice.status === 'Unpublished' ? 'bg-gray-100 text-gray-700' :
                                    'bg-yellow-100 text-yellow-700'}`}>
                            {notice.status}
                        </span>
                        <h2 className="text-xl font-bold text-gray-800 mt-2">{notice.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

                    {/* Meta Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                            <div className="bg-white p-2 rounded-full shadow-sm text-blue-500">
                                <FileText size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Notice Type</p>
                                <p className="font-medium text-gray-800">{notice.type}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
                            <div className="bg-white p-2 rounded-full shadow-sm text-orange-500">
                                <User size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Target Audience</p>
                                <p className="font-medium text-gray-800">{notice.target.value}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                            <div className="bg-white p-2 rounded-full shadow-sm text-purple-500">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Published Date</p>
                                <p className="font-medium text-gray-800">{format(new Date(notice.publishDate), 'dd MMMM, yyyy')}</p>
                            </div>
                        </div>

                        {notice.employeeDetails && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg border border-gray-100">
                                <div className="bg-white p-2 rounded-full shadow-sm text-gray-500">
                                    <Briefcase size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Issued By</p>
                                    <p className="font-medium text-gray-800">{notice.employeeDetails.name} <span className='text-xs text-gray-400'>({notice.employeeDetails.employeeId})</span></p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide border-b pb-2">Notice Details</h3>
                        <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {notice.body}
                        </div>
                    </div>

                    {/* Attachments */}
                    {notice.attachment && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded shadow-sm">
                                    <FileText size={20} className="text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Attachment</p>
                                    <p className="text-xs text-gray-500">{notice.attachment.name}</p>
                                </div>
                            </div>
                            <button className="text-blue-600 text-sm font-medium hover:underline">Download</button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors shadow-sm">
                        Close View
                    </button>
                </div>
            </div>
        </div>
    );
}
