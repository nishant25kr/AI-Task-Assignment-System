import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, User, LogOut, Sparkles, Menu, X } from "lucide-react";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const data = localStorage.getItem("user");
      if (data) {
        setUser(JSON.parse(data));
      } else {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  // Guest/Not Logged In Navbar
  if (!user) {
    return (
      <nav className="w-full bg-gray-800/50 min-h-[8vh] backdrop-blur-sm border-b border-gray-700/50 ">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TaskAI
              </h1>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-200 transform hover:scale-105"
            >
              <LogIn size={18} />
              <span>Login</span>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Authenticated User Navbar
  return (
    <nav className="w-full bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TaskAI
            </h1>
          </div>

          {/* Desktop User Info & Logout */}
          <div className="hidden md:flex items-center gap-4">
            {/* User Info Card */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {user.name || "User"}
                </span>
                <span className="text-xs text-gray-400">{user.email}</span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all duration-200 font-medium"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700/50 space-y-3">
            {/* User Info */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-medium text-white">
                  {user.name || "User"}
                </span>
                <span className="text-xs text-gray-400 truncate">{user.email}</span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all duration-200 font-medium"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
