import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SuccessModal({ onClose, title, date }) {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center relative animate-in fade-in zoom-in duration-200">

                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
                    <Check className="text-white w-8 h-8" strokeWidth={3} />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Notice Published Successfully</h2>
                <p className="text-sm text-gray-500 mb-8 px-4">
                    Your notice{" "}
                    <span className="font-semibold text-gray-700">
                        {title}
                        {date && " - " + new Date(date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>{" "}
                    has been published and is now visible to all selected departments.
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => navigate('/notice-board')}
                        className="flex-1 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors"
                    >
                        View Notice
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 font-medium transition-colors"
                    >
                        + Create Another
                    </button>
                    <button
                        onClick={() => navigate('/notice-board')}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
