import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Mail,
  Briefcase,
  Calendar,
  Award,
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Constants for configuration
const API_BASE_URL = "http://localhost:3000/";

const statusStyles = {
  IN_PROGRESS: {
    text: "text-amber-400",
    badge: "bg-amber-500/20 border-amber-400/30",
    dot: "bg-amber-400",
    icon: Clock
  },
  COMPLETED: {
    text: "text-emerald-400",
    badge: "bg-emerald-500/20 border-emerald-400/30",
    dot: "bg-emerald-400",
    icon: CheckCircle
  },
  OPEN: {
    text: "text-rose-400",
    badge: "bg-rose-500/20 border-rose-400/30",
    dot: "bg-rose-400",
    icon: AlertCircle
  },
};

// Custom Hook: useFetchEmployee.js
const useFetchEmployee = (id) => {
  const [employee, setEmployee] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchEmployeeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}api/auth/getAlltickets/${id}`);
        const { employeeDetail, tickets } = response.data;
        setEmployee(employeeDetail);
        setTickets(tickets);
      } catch (err) {
        console.error("Error fetching employee details:", err);
        setError("Failed to fetch employee details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  return { employee, tickets, loading, error };
};

// UI Component: EmployeeInfoCard.js
const EmployeeInfoCard = ({ employee }) => (
  <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl mb-8">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-purple-500/20">
        {employee.email.charAt(0).toUpperCase()}
      </div>
      <div>
        <h2 className="text-3xl font-bold text-white mb-1">Employee Profile</h2>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>
            Joined {new Date(employee.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-600/40 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-purple-400" />
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email Address</p>
        </div>
        <p className="text-white font-medium">{employee.email}</p>
      </div>

      <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-600/40 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-4 h-4 text-purple-400" />
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Role</p>
        </div>
        <p className="text-purple-400 font-semibold">{employee.role}</p>
      </div>

      <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-600/40 rounded-2xl p-5 md:col-span-2">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-purple-400" />
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Skills & Expertise</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {employee.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-sm px-3 py-1.5 rounded-full hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// UI Component: TicketItem.js
const TicketItem = ({ ticket }) => {
  const statusStyle = statusStyles[ticket.status] || {
    text: "text-gray-400",
    badge: "bg-gray-500/20 border-gray-400/30",
    dot: "bg-gray-400",
    icon: AlertCircle
  };

  const StatusIcon = statusStyle.icon;

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-600/40 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-[1.02] group">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors flex-1">
          {ticket.title}
        </h4>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${statusStyle.badge} ml-2`}>
          <StatusIcon className="w-3 h-3" />
          <span className={`text-xs font-semibold uppercase ${statusStyle.text}`}>
            {ticket.status.replace("_", " ")}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed mb-4">
        {ticket.description}
      </p>

      <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-slate-600/30">
        <Ticket className="w-4 h-4" />
        <span>ID: {ticket._id.slice(-8)}</span>
      </div>
    </div>
  );
};

// Main Component: EmployeeDetails.js
function EmployeeDetails() {
  const { id } = useParams();
  const { employee, tickets, loading, error } = useFetchEmployee(id);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        </div>
        <p className="mt-6 text-gray-300 font-medium">Loading employee details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-400/30">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Error Occurred</h3>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-600/40">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Data Found</h3>
          <p className="text-gray-400">Employee data could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium mb-1">Total Tickets</p>
                <p className="text-4xl font-bold text-white">{tickets.length}</p>
              </div>
              <div className="p-4 bg-blue-500/20 rounded-xl">
                <Ticket className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm font-medium mb-1">Completed</p>
                <p className="text-4xl font-bold text-white">
                  {tickets.filter(t => t.status === 'COMPLETED').length}
                </p>
              </div>
              <div className="p-4 bg-emerald-500/20 rounded-xl">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium mb-1">Total Skills</p>
                <p className="text-4xl font-bold text-white">{employee.skills.length}</p>
              </div>
              <div className="p-4 bg-purple-500/20 rounded-xl">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Employee Info Card */}
        <EmployeeInfoCard employee={employee} />

        {/* Tickets Section */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Assigned Tickets</h3>
                <p className="text-sm text-gray-400">{tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'} in total</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-sm">
              {Object.entries(statusStyles).map(([status, style]) => {
                const Icon = style.icon;
                return (
                  <div key={status} className="flex items-center gap-1.5">
                    <Icon className={`w-3 h-3 ${style.text}`} />
                    <span className="text-gray-400 text-xs">{status.replace("_", " ")}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {tickets.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-full mb-4 border border-slate-600/40">
                <Ticket className="w-10 h-10 text-gray-500" />
              </div>
              <p className="text-gray-400 text-lg font-medium">No tickets assigned yet</p>
              <p className="text-gray-600 text-sm mt-2">
                Tickets will appear here when assigned to this employee
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

export default EmployeeDetails;
