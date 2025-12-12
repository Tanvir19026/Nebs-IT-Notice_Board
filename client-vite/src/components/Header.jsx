import { Bell, Menu } from 'lucide-react';

export default function Header({ onToggleSidebar }) {
    return (
        <header className="bg-white h-16 border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
                >
                    <Menu size={24} />
                </button>
                <div>
                    <h2 className="text-gray-800 font-semibold text-sm md:text-base">Good Afternoon Asif</h2>
                    <p className="text-xs text-gray-500">13 June, 2025</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <Bell className="text-gray-500 w-5 h-5 cursor-pointer hover:text-gray-700" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>

                <div className="flex items-center gap-3 border-l pl-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-800">Asif Riaj</p>
                        <p className="text-xs text-gray-500">Hr Manager</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 border border-green-200">
                        <img src="/placeholder-avatar.png" alt="Profile" className="w-full h-full rounded-full object-cover" onError={(e) => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=Asif+Riaj')} />
                    </div>
                </div>
            </div>
        </header>
    );
}
