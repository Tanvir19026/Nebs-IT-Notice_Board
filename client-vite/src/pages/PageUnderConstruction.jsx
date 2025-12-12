import { Link } from 'react-router-dom';
import { Construction, ArrowRight, Home } from 'lucide-react';

export default function PageUnderConstruction() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
            <div className="relative mb-8">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center relative z-10">
                    <Construction className="text-orange-500 w-12 h-12" />
                </div>
                <div className="absolute top-0 left-0 w-24 h-24 bg-orange-400 rounded-full opacity-20 animate-ping"></div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Under Construction</h1>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
                We're currently working on this feature. Please check back later!
            </p>

            <Link
                to="/notice-board"
                className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-all hover:scale-105 shadow-lg shadow-orange-200"
            >
                <Home size={18} />
                <span>Go to Notice Board</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
}
