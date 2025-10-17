import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  PlusCircle, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Filter,
  Zap
} from "lucide-react";

export default function Dashboard() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  const fetchTickets = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/ticket/getall-tickets`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });
      const data = await res.json();
      setTickets(data || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setForm({ title: "", description: "" });
        fetchTickets();
      } else {
        alert(data.message || "Ticket creation failed");
      }
    } catch (err) {
      alert("Error creating ticket");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-ma p-5">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium mb-1">Total Tasks</p>
                <p className="text-4xl font-bold text-white">{tickets.length}</p>
              </div>
              <div className="p-4 bg-purple-500/20 rounded-xl">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/40 backdrop-blur-xl border border-pink-500/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-300 text-sm font-medium mb-1">Active</p>
                <p className="text-4xl font-bold text-white">{tickets.length}</p>
              </div>
              <div className="p-4 bg-pink-500/20 rounded-xl">
                <Clock className="w-8 h-8 text-pink-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm font-medium mb-1">AI Efficiency</p>
                <p className="text-4xl font-bold text-white">94%</p>
              </div>
              <div className="p-4 bg-emerald-500/20 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Task Form */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <PlusCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Create Task</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Task Title
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter task title..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the task details..."
                    rows="5"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>

                      Create Task
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Tasks List */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">All Tasks</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-64"
                  />
                </div>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredTickets.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-full mb-4">
                      <AlertCircle className="w-10 h-10 text-gray-500" />
                    </div>
                    <p className="text-gray-400 text-lg">No tasks found</p>
                    <p className="text-gray-600 text-sm mt-2">
                      {searchTerm ? "Try adjusting your search" : "Create your first task to get started"}
                    </p>
                  </div>
                ) : (
                  filteredTickets.map((ticket) => (
                    <Link
                      key={ticket._id}
                      to={`/tickets/${ticket._id}`}
                      className="block group"
                    >
                      <div className="bg-gradient-to-br m-5 from-slate-800/60 to-slate-700/60 border border-slate-600/40 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-[1.02]">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                            {ticket.title}
                          </h3>
                          
                        </div>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {ticket.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(ticket.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
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
