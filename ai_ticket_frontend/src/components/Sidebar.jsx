import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Cpu,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Create Task", icon: <ClipboardList size={20} />, path: "/admin/tasks" },
    { name: "AI Distribution", icon: <Cpu size={20} />, path: "/admin/ai-distribution" },
    { name: "Employees", icon: <Users size={20} />, path: "/admin/employees" },
    { name: "Analytics", icon: <BarChart3 size={20} />, path: "/admin/analytics" },
    { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button (Hamburger) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white hover:bg-gray-700/90 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0  z-40
          w-64 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 text-white flex flex-col
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo / Brand - Mobile */}
        <div className="p-6 border-b border-gray-700/50 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TaskAI
              </h1>
              <p className="text-xs text-gray-400">AI-Powered System</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 flex flex-col p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMobileMenu}
                className={`group flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                    : "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} className="text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-700/50"></div>

        {/* User Info & Logout */}
        <div className="p-4 space-y-3">
          {/* User Profile Section */}
          <div className="px-4 py-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin</p>
                <p className="text-xs text-gray-400 truncate">admin@taskai.com</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 font-medium"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
