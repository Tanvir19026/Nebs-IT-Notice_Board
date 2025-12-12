import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import CreateNoticeForm from '../components/CreateNoticeForm';

export default function CreateNoticePage() {
    return (
        <div className="max-w-5xl mx-auto pb-10">
            {/* Breadcrumb / Header */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                <Link to="/notice-board" className="hover:text-gray-900">Notice Board</Link>
                <ChevronRight size={14} />
                <span className="font-medium text-gray-900">Create a Notice</span>
            </div>

            <CreateNoticeForm />
        </div>
    );
}
