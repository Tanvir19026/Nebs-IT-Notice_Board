import { useState } from 'react';
import NoticeTableHeader from './NoticeTableHeader';
import NoticeTableRow from './NoticeTableRow';

export default function NoticeTable({ notices, onToggleStatus, onDelete }) {
    const [selectedDocs, setSelectedDocs] = useState([]);

    const toggleSelectAll = () => {
        if (selectedDocs.length === notices.length) {
            setSelectedDocs([]);
        } else {
            setSelectedDocs(notices.map(n => n._id));
        }
    };

    const toggleSelectOne = (id) => {
        if (selectedDocs.includes(id)) {
            setSelectedDocs(prev => prev.filter(item => item !== id));
        } else {
            setSelectedDocs(prev => [...prev, id]);
        }
    };

    const handleDeleteSelected = () => {
        if (onDelete) {
            onDelete(selectedDocs);
            setSelectedDocs([]);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden relative min-h-[400px]">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                    <NoticeTableHeader
                        selectedCount={selectedDocs.length}
                        totalCount={notices.length}
                        onSelectAll={toggleSelectAll}
                        onDeleteSelected={handleDeleteSelected}
                    />
                    <tbody className="divide-y divide-gray-100">
                        {notices.map((notice) => (
                            <NoticeTableRow
                                key={notice._id}
                                notice={notice}
                                isSelected={selectedDocs.includes(notice._id)}
                                onSelect={toggleSelectOne}
                                onToggleStatus={onToggleStatus}
                            />
                        ))}
                        {notices.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-medium bg-gray-50/50">
                                    No notices found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
