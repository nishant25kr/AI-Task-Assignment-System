import React, { useEffect, useState } from 'react';
import {
  Users,
  Mail,
  Briefcase,
  Calendar,
  Search,
  UserCheck,
  TrendingUp,
  Award
} from 'lucide-react';
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom';

function Employees() {
  const URL = import.meta.env.VITE_BACKEND_URL
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
          method: "GET",
        });
        const data = await res.json();
        console.log(data);
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  async function fetchTicket(id) {
    console.log(id)
    const response = await axios.get(`${URL}/api/auth/getAlltickets/${id}`)
    console.log(response)
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.skills && user.skills.some(skill =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  function detail(id) {
    console.log(id)
    navigate(`${id}`);

  }

  return (
    <div className="p-5">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium mb-1">Total Employees</p>
                <p className="text-4xl font-bold text-white">{users.length}</p>
              </div>
              <div className="p-4 bg-blue-500/20 rounded-xl">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm font-medium mb-1">Active Users</p>
                <p className="text-4xl font-bold text-white">{users.length}</p>
              </div>
              <div className="p-4 bg-emerald-500/20 rounded-xl">
                <UserCheck className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium mb-1">Talent Pool</p>
                <p className="text-4xl font-bold text-white">
                  {users.reduce((acc, user) => acc + (user.skills?.length || 0), 0)}
                </p>
              </div>
              <div className="p-4 bg-purple-500/20 rounded-xl">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Employees</h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-64"
              />
            </div>
          </div>

          {filteredUsers && filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-600/40 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-[1.02] group"
                  onClick={() => { detail(user._id) }}
                >
                  {/* User Avatar */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* User Email */}
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <h2 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
                      {user.email}
                    </h2>
                  </div>

                  {/* User Role */}
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      <span className="text-purple-400 font-medium">{user.role}</span>
                    </span>
                  </div>

                  {/* Skills */}
                  {/* Total assigned tasks:{fetchTicket(user._id)} */}

                  {user.skills && user.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-400 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-xs px-3 py-1 rounded-full hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Join Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-slate-600/30">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-full mb-4">
                <Users className="w-10 h-10 text-gray-500" />
              </div>
              <p className="text-gray-400 text-lg">No employees found</p>
              <p className="text-gray-600 text-sm mt-2">
                {searchTerm ? "Try adjusting your search" : "No employees available at the moment"}
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }
      `}</style>
    </div>
  );
}

export default Employees;
