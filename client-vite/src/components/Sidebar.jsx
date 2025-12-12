import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    DollarSign,
    FileText,
    Calendar,
    MessageSquare,
    Briefcase,
    FileCheck,
    LogOut,
    Settings,
    ClipboardList,
    ChevronDown,
    ChevronRight,
    X
} from 'lucide-react';
import clsx from 'clsx';
import logo from '../assets/logo.png';

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
        name: 'Employee',
        href: '#', // Prevent navigation on parent click
        icon: Users,
        subItems: [
            { name: 'Employee Database', href: '/employee/database' },
            { name: 'Add New Employee', href: '/employee/add' },
            { name: 'Performance Report', href: '/employee/performance' },
            { name: 'Performance History', href: '/employee/history' },
        ]
    },
    { name: 'Payroll', href: '/payroll', icon: DollarSign },
    { name: 'Pay Slip', href: '/payslip', icon: FileText },
    { name: 'Attendance', href: '/attendance', icon: Calendar },
    { name: 'Request Center', href: '/request', icon: MessageSquare },
    { name: 'Career Database', href: '/career', icon: Briefcase },
    { name: 'Document manager', href: '/documents', icon: FileCheck },
    { name: 'Notice Board', href: '/notice-board', icon: ClipboardList },
    { name: 'Activity Log', href: '/activity', icon: FileText },
    { name: 'Exit Interview', href: '/exit', icon: LogOut },
    { name: 'Profile', href: '/profile', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const [expandedMenu, setExpandedMenu] = useState('Employee');

    const toggleMenu = (name) => {
        setExpandedMenu(prev => prev === name ? null : name);
    };

    return (
        <aside className={clsx(
            "w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-100 flex flex-col z-50 transition-transform duration-300 ease-in-out font-sans shadow-lg md:shadow-none",
            isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
            <div className="p-6 flex items-center justify-between">
                <Link to="/notice-board" className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="Nebs-IT Logo"
                        style={{ width: '140px', height: 'auto' }} // Slightly fluid width
                        className="object-contain"
                    />
                </Link>
                <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar pb-6">
                {menuItems.map((item) => {
                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    const isActive = currentPath.startsWith(item.href) && item.href !== '#'; // Simple active check
                    const isExpanded = expandedMenu === item.name;

                    // Parent Item Wrapper
                    const ItemWrapper = hasSubItems ? 'div' : Link;
                    const wrapperProps = hasSubItems
                        ? { onClick: () => toggleMenu(item.name), className: "cursor-pointer" }
                        : { to: item.href };

                    return (
                        <div key={item.name}>
                            <ItemWrapper
                                {...wrapperProps}
                                className={clsx(
                                    "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1",
                                    isActive || (hasSubItems && isExpanded) // Highlight if expanded too
                                        ? "bg-gray-50 text-gray-900 border-l-4 border-orange-500" // Use a lighter bg for parent active state
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={18} />
                                    {item.name}
                                </div>
                                {hasSubItems && (
                                    <span className="text-gray-400">
                                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    </span>
                                )}
                            </ItemWrapper>

                            {/* Submenu */}
                            {hasSubItems && isExpanded && (
                                <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                    {item.subItems.map((subItem) => {
                                        const isSubActive = currentPath === subItem.href;
                                        return (
                                            <Link
                                                key={subItem.name}
                                                to={subItem.href}
                                                className={clsx(
                                                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                                    isSubActive
                                                        ? "text-orange-600 bg-orange-50"
                                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                                )}
                                            >
                                                {/* <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>  Dot style if needed */}
                                                {subItem.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className="p-4 border-t text-xs text-gray-400 text-center">
                © 2025 Nebs IT
            </div>
        </aside>
    );
}
