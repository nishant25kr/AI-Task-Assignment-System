import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Cpu,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Create Task", icon: <ClipboardList size={20} />, path: "/admin/tasks" },
    { name: "AI Task Distribution", icon: <Cpu size={20} />, path: "/admin/ai-distribution" },
    { name: "Employees", icon: <Users size={20} />, path: "/admin/employees" },
    { name: "Analytics", icon: <BarChart3 size={20} />, path: "/admin/analytics" },
    { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-center mb-6">
        Task<span className="text-blue-400">AI</span>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-700 my-4"></div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-400 hover:text-red-500 mt-auto"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
