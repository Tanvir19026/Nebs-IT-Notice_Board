import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Briefcase, FileText, Download } from 'lucide-react';
import { format } from 'date-fns';
import api from '../lib/api';

export default function NoticeDetailsPage() {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await api.get(`/notices/${id}`);
                setNotice(res.data);
            } catch (err) {
                console.error("Failed to fetch notice", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotice();
    }, [id]);

    if (loading) return <div className="p-10 text-center text-gray-500">Loading notice details...</div>;
    if (!notice) return <div className="p-10 text-center text-red-500">Notice not found</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/notice-board" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Notice Details</h1>
                    <p className="text-sm text-gray-500">View complete information about this notice</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Notice Header */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start">
                    <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                            ${notice.status === 'Published' ? 'bg-green-100 text-green-700' :
                                notice.status === 'Unpublished' ? 'bg-gray-100 text-gray-700' :
                                    'bg-yellow-100 text-yellow-700'}`}>
                            {notice.status}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-800 mt-3">{notice.title}</h2>
                    </div>
                </div>

                {/* Body Content */}
                <div className="p-8 space-y-8">

                    {/* Meta Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                            <div className="bg-white p-3 rounded-full shadow-sm text-blue-500">
                                <FileText size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Notice Type</p>
                                <p className="font-semibold text-gray-800">{notice.type}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-orange-50/50 rounded-xl border border-orange-100/50">
                            <div className="bg-white p-3 rounded-full shadow-sm text-orange-500">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Target Audience</p>
                                <p className="font-semibold text-gray-800">{notice.target.value}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-purple-50/50 rounded-xl border border-purple-100/50">
                            <div className="bg-white p-3 rounded-full shadow-sm text-purple-500">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Published Date</p>
                                <p className="font-semibold text-gray-800">{format(new Date(notice.publishDate), 'dd MMMM, yyyy')}</p>
                            </div>
                        </div>

                        {notice.employeeDetails && (
                            <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100/50">
                                <div className="bg-white p-3 rounded-full shadow-sm text-gray-500">
                                    <Briefcase size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Issued By</p>
                                    <p className="font-semibold text-gray-800">{notice.employeeDetails.name}</p>
                                    <p className="text-xs text-gray-400 font-medium">ID: {notice.employeeDetails.employeeId}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Text */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                            <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                            Description
                        </h3>
                        <div className="text-gray-600 leading-7 whitespace-pre-wrap bg-gray-50 p-6 rounded-xl border border-gray-100">
                            {notice.body}
                        </div>
                    </div>

                    {/* Attachments */}
                    {notice.attachment && (
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                                <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                                Attachments
                            </h3>
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center justify-between hover:border-blue-300 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                                        <FileText size={24} className="text-gray-500 group-hover:text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{notice.attachment.name}</p>
                                        <p className="text-xs text-gray-400">Click download to view file</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                    <Download size={16} />
                                    Download
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
