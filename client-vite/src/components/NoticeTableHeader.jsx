import { Trash2 } from 'lucide-react';

export default function NoticeTableHeader({ selectedCount, totalCount, onSelectAll, onDeleteSelected }) {
    if (selectedCount > 0) {
        return (
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                    <th className="px-6 py-4 w-4 bg-orange-50">
                        <input
                            type="checkbox"
                            checked={selectedCount === totalCount && totalCount > 0}
                            onChange={onSelectAll}
                            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 rounded-sm cursor-pointer"
                        />
                    </th>
                    <th colSpan="6" className="px-6 py-4 font-medium bg-orange-50 text-orange-800">
                        <div className="flex items-center justify-between w-full">
                            <span>{selectedCount} items selected</span>
                            <button
                                onClick={onDeleteSelected}
                                className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-red-200 bg-white"
                            >
                                <Trash2 size={14} />
                                Delete Selected
                            </button>
                        </div>
                    </th>
                </tr>
            </thead>
        );
    }

    return (
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
                <th className="px-6 py-4 w-4">
                    <input
                        type="checkbox"
                        checked={selectedCount === totalCount && totalCount > 0}
                        onChange={onSelectAll}
                        className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 rounded-sm cursor-pointer"
                    />
                </th>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Notice Type</th>
                <th className="px-6 py-4 font-medium hidden lg:table-cell">Departments/Individual</th>
                <th className="px-6 py-4 font-medium hidden sm:table-cell">Published On</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
        </thead>
    );
}
