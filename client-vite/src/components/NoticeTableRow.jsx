import { Link } from 'react-router-dom';
import { Eye, Pencil, MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

export default function NoticeTableRow({ notice, isSelected, onSelect, onToggleStatus }) {
    const [actionOpen, setActionOpen] = useState(false);

    return (
        <tr className={`hover:bg-gray-50 transition-colors ${isSelected ? 'bg-orange-50/30' : ''}`}>
            <td className="px-6 py-4">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(notice._id)}
                    className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 rounded-sm cursor-pointer"
                />
            </td>
            <td className="px-6 py-4 font-medium text-gray-900">
                <div className="flex flex-col">
                    <span>{notice.title}</span>
                    <span className="text-xs text-gray-400 md:hidden">{notice.type}</span>
                </div>
            </td>
            <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{notice.type}</td>
            <td className="px-6 py-4 hidden lg:table-cell">
                <span className={notice.target.type === 'Department' ? 'text-blue-600' : 'text-orange-500'}>
                    {notice.target.value}
                </span>
            </td>
            <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">
                {format(new Date(notice.publishDate), 'dd-MMM-yyyy')}
            </td>
            <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold 
                    ${notice.status === 'Published' ? 'bg-green-100 text-green-700' :
                        notice.status === 'Unpublished' ? 'bg-gray-100 text-gray-700' :
                            'bg-yellow-100 text-yellow-700'}`}>
                    {notice.status}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3 relative">
                    <Link to={`/notice-board/${notice._id}`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <Eye size={18} />
                    </Link>

                    <Link to={`/notice-board/edit/${notice._id}`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Notice">
                        <Pencil size={18} />
                    </Link>

                    {/* Action Popover Trigger */}
                    <div className="relative">
                        <button
                            onClick={() => setActionOpen(!actionOpen)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <MoreVertical size={18} />
                        </button>

                        {/* Popover Menu */}
                        {actionOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setActionOpen(false)}></div>
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 py-1 overflow-hidden animate-in fade-in zoom-in duration-150 origin-top-right">
                                    <div className="px-3 py-2 border-b border-gray-50 text-xs text-gray-400 font-medium uppercase tracking-wider">
                                        Change Status
                                    </div>

                                    {notice.status !== 'Published' && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onToggleStatus(notice._id, notice.status); setActionOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                                        >
                                            <CheckCircle size={14} /> Publish
                                        </button>
                                    )}

                                    {notice.status === 'Published' && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onToggleStatus(notice._id, notice.status); setActionOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                                        >
                                            <XCircle size={14} /> Unpublish
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
}
