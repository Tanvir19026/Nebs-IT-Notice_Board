import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import api from '../lib/api';
import NoticeTable from '../components/NoticeTable';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

export default function NoticeBoardPage() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [filterDept, setFilterDept] = useState('Departments or Individuals');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('Status');
    const [filterDate, setFilterDate] = useState('');

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemsToDelete, setItemsToDelete] = useState([]);

    const fetchNotices = async () => {
        setLoading(true);
        try {
            const res = await api.get('/notices');
            setNotices(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Published' ? 'Unpublished' : 'Published';
        // Optimistic UI update
        setNotices((prev) => prev.map((n) => n._id === id ? { ...n, status: newStatus } : n));
        try {
            await api.put(`/notices/${id}`, { status: newStatus });
        } catch (err) {
            console.error("Failed to update status", err);
            // Revert if failed
            setNotices((prev) => prev.map((n) => n._id === id ? { ...n, status: currentStatus } : n));
        }
    };

    const handleDelete = (ids) => {
        setItemsToDelete(ids);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        // Optimistic
        setNotices(prev => prev.filter(n => !itemsToDelete.includes(n._id)));
        setDeleteModalOpen(false); // Close immediately

        try {
            await Promise.all(itemsToDelete.map(id => api.delete(`/notices/${id}`)));
        } catch (err) {
            console.error("Delete failed", err);
            // In a real app, we'd refetch or revert. For now, just alert.
            fetchNotices(); // Re-sync
        }
    };

    const activeCount = notices.filter((n) => n.status === 'Published').length;
    const draftCount = notices.filter((n) => n.status === 'Draft' || n.status === 'Unpublished').length;

    // Filter Logic
    const filteredNotices = notices.filter(notice => {
        // Department Filter
        if (filterDept !== 'Departments or Individuals' && notice.target.value !== filterDept) return false;

        // Search Filter (ID or Name or Title)
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            (notice.employeeDetails?.employeeId?.toLowerCase().includes(query)) ||
            (notice.employeeDetails?.name?.toLowerCase().includes(query)) ||
            (notice.title.toLowerCase().includes(query));
        if (searchQuery && !matchesSearch) return false;

        // Status Filter
        if (filterStatus !== 'Status') {
            if (filterStatus === 'Draft') {
                // User requested "All Draft Notice" to show both Draft and Unpublished
                if (notice.status !== 'Draft' && notice.status !== 'Unpublished') return false;
            } else {
                if (notice.status !== filterStatus) return false;
            }
        }

        // Date Filter
        if (filterDate) {
            const noticeDate = new Date(notice.publishDate).toISOString().split('T')[0];
            if (noticeDate !== filterDate) return false;
        }

        return true;
    });

    const resetFilters = () => {
        setFilterDept('Departments or Individuals');
        setSearchQuery('');
        setFilterStatus('Status');
        setFilterDate('');
    };

    const departmentOptions = [
        "All Department",
        "Finance",
        "Sales Team",
        "Web Team",
        "Database Team",
        "Admin",
        "HR"
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Notice Management</h1>
                    <div className="flex gap-4 text-sm mt-1">
                        <span className="text-green-600 font-medium">Active Notices: {activeCount}</span>
                        <span className="text-orange-500 font-medium">Draft Notice: {draftCount}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link to="/notice-board/create">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                            <Plus size={16} />
                            Create Notice
                        </button>
                    </Link>
                    <button onClick={() => setFilterStatus('Draft')} className="bg-white border border-orange-200 text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        All Draft Notice
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm overflow-x-auto">
                <span className="text-sm text-gray-500 whitespace-nowrap">Filter by:</span>

                <select
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-blue-300"
                >
                    <option>Departments or Individuals</option>
                    {departmentOptions.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>

                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Title, ID or Name"
                    className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-300 w-48"
                />

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-blue-300"
                >
                    <option>Status</option>
                    <option value="Published">Published</option>
                    <option value="Unpublished">Unpublished</option>
                    <option value="Draft">Draft</option>
                </select>

                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-blue-300"
                />

                <button onClick={resetFilters} className="text-blue-500 text-sm font-medium hover:underline px-2">Reset Filters</button>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading notices...</div>
            ) : (
                <NoticeTable notices={filteredNotices} onToggleStatus={handleToggleStatus} onDelete={handleDelete} />
            )}

            {/* Pagination Mockup */}
            <div className="flex justify-center gap-2 mt-4 text-sm text-gray-600">
                <button className="p-2 hover:bg-gray-100 rounded">&lt;</button>
                <button className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 font-medium rounded">1</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">2</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">3</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">4</button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">5</button>
                <button className="p-2 hover:bg-gray-100 rounded">&gt;</button>
            </div>

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                count={itemsToDelete.length}
            />
        </div>
    );
}
