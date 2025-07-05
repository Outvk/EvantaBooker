import React from "react";
import { LogOut, Settings, Users, Calendar, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const sidebarLinks = [
  { icon: <BarChart2 className="h-5 w-5 mr-2" />, label: "Dashboard", to: "/admin-dashboard" },
  { icon: <Calendar className="h-5 w-5 mr-2" />, label: "Manage Events", to: "/events" },
  { icon: <Users className="h-5 w-5 mr-2" />, label: "Users", to: "/admin-dashboard#users" },
  { icon: <Settings className="h-5 w-5 mr-2" />, label: "Settings", to: "/settings" },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
// Add "historique" to allowed tab values if you use types

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className={`fixed top-0 left-0 h-full w-72 bg-white/80 dark:bg-gray-900/80 shadow-2xl border-r border-gray-200 dark:border-gray-800 z-40 flex flex-col backdrop-blur-lg transition-transform duration-300`}
      style={{ boxShadow: "8px 0 32px 0 rgba(0,0,0,0.08)" }}
    >
      {/* Toggle Button */}
      <button
        className="absolute -right-5 top-6 z-50 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full shadow p-2 focus:outline-none lg:hidden"
        onClick={() => onTabChange('toggle-sidebar')}
        aria-label="Toggle Sidebar"
      >
        <span className="block w-5 h-0.5 bg-gray-800 dark:bg-white mb-1"></span>
        <span className="block w-5 h-0.5 bg-gray-800 dark:bg-white mb-1"></span>
        <span className="block w-5 h-0.5 bg-gray-800 dark:bg-white"></span>
      </button>
      {/* Fixed header section */}

      <div className="p-8 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Admin Panel</h2>
        <p className="text-gray-500 text-sm">Quick access</p>
      </div>
      {/* Scrollable section below header */}
      <div className="flex-1 flex flex-col p-8 gap-6 overflow-y-auto">
        <nav className="flex flex-col gap-3">
          {[
            { icon: <BarChart2 className="h-5 w-5 mr-2" />, label: 'Dashboard', value: 'overview' },
            { icon: <Calendar className="h-5 w-5 mr-2" />, label: 'Manage Events', value: 'events' },
            { icon: <Users className="h-5 w-5 mr-2" />, label: 'Users', value: 'users' },
            { icon: <Settings className="h-5 w-5 mr-2" />, label: 'Settings', value: 'settings' },
          ].map(link => (
            <button
              key={link.label}
              onClick={() => {
  onTabChange(link.value);
  setTimeout(() => {
    const el = document.getElementById(link.value);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 ${activeTab === link.value ? 'bg-gray-200 dark:bg-gray-800 font-bold' : ''}`}
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <button
            onClick={() => navigate("/logout")}
            className="flex items-center w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900 font-medium transition"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </motion.aside>
  );
};
