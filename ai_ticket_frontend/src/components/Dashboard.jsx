import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  AlertCircle,
  Search,
  Clock,
  Sparkles,
  UserCheck,
  UserX
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
    (ticket.title && ticket.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (ticket.description && ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const assignedCount = filteredTickets.filter(ticket => ticket.assignedTo).length;
  const unassignedCount = filteredTickets.length - assignedCount;
  const activeCount = filteredTickets.filter(ticket => ticket.status === 'IN_PROGRESS' || ticket.status === 'OPEN').length;

  return (
    <div className="p-4 sm:p-6 bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* --- Responsive Stats Cards --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Card 1: Total Tickets */}
          <StatCard
            title="Total"
            value={tickets.length}
            icon={Sparkles}
            color="purple"
          />
          {/* Card 2: Assigned */}
          <StatCard
            title="Assigned"
            value={assignedCount}
            icon={UserCheck}
            color="green"
          />
          {/* Card 3: Unassigned */}
          <StatCard
            title="Unassigned"
            value={unassignedCount}
            icon={UserX}
            color="red"
          />
          {/* Card 4: Active */}
          <StatCard
            title="Active"
            value={activeCount}
            icon={Clock}
            color="pink"
          />
        </div>

        {/* --- Responsive Main Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Create Task Form (stacks on mobile) --- */}
          <div className="lg:col-span-1">
            {/* ✅ Sticky only on large screens */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl lg:sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <PlusCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Create Task</h2>
              </div>
              <CreateTaskForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />
            </div>
          </div>

          {/* --- Tasks List --- */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-white">All Tasks</h2>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-full"
                  />
                </div>
              </div>
              <TaskList tickets={filteredTickets} searchTerm={searchTerm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Reusable Components for Cleaner Code ---

const StatCard = ({ title, value, icon: Icon, color }) => {
  const colors = {
    purple: "from-purple-900/40 to-purple-800/40 border-purple-500/20 text-purple-300 bg-purple-500/20",
    green: "from-green-900/40 to-green-800/40 border-green-500/20 text-green-300 bg-green-500/20",
    red: "from-red-900/40 to-red-800/40 border-red-500/20 text-red-300 bg-red-500/20",
    pink: "from-pink-900/40 to-pink-800/40 border-pink-500/20 text-pink-300 bg-pink-500/20",
  };
  const colorClasses = colors[color] || colors.purple;

  return (
    <div className={`bg-gradient-to-br ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]} backdrop-blur-xl border ${colorClasses.split(' ')[2]} rounded-2xl p-4 sm:p-6 shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium mb-1 ${colorClasses.split(' ')[3]}`}>{title}</p>
          <p className="text-3xl sm:text-4xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-3 sm:p-4 rounded-xl ${colorClasses.split(' ')[4]}`}>
          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </div>
    </div>
  );
};

const CreateTaskForm = ({ form, handleChange, handleSubmit, loading }) => (
  <form onSubmit={handleSubmit} className="space-y-5">
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Enter task title..." className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" required />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the task details..." rows="5" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none" required></textarea>
    </div>
    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2" type="submit" disabled={loading}>
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          Submitting...
        </>
      ) : "Create Task"}
    </button>
  </form>
);

const TaskList = ({ tickets, searchTerm }) => (
  <div className="space-y-4 max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
    {tickets.length === 0 ? (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-full mb-4">
          <AlertCircle className="w-10 h-10 text-gray-500" />
        </div>
        <p className="text-gray-400 text-lg">No tasks found</p>
        <p className="text-gray-600 text-sm mt-2">{searchTerm ? "Try adjusting your search" : "Create your first task to get started"}</p>
      </div>
    ) : (
      tickets.map((ticket) => <TaskCard key={ticket._id} ticket={ticket} />)
    )}
    <style jsx>{`
      .custom-scrollbar::-webkit-scrollbar { width: 8px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: rgba(30, 41, 59, 0.3); border-radius: 10px; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.4); border-radius: 10px; }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.6); }
    `}</style>
  </div>
);

const TaskCard = ({ ticket }) => {
  const priorityStyles = {
    low: 'bg-green-500/10 text-green-400 border-green-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    high: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  const statusStyles = {
    OPEN: 'bg-blue-500/10 text-blue-400',
    IN_PROGRESS: 'bg-purple-500/10 text-purple-400',
    CLOSED: 'bg-gray-500/10 text-gray-400',
  };
  const defaultBadgeStyle = 'bg-gray-500/10 text-gray-400 border-gray-500/20';

  return (
    <Link to={`/tickets/${ticket._id}`} className="block group">
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-600/40 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-[1.02]">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">{ticket.title}</h3>
          {ticket.status && <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${statusStyles[ticket.status] || defaultBadgeStyle}`}>{ticket.status.replace('_', ' ')}</span>}
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{ticket.description}</p>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {ticket.priority && <span className={`px-3 py-1 text-xs font-bold border rounded-full ${priorityStyles[ticket.priority] || defaultBadgeStyle}`}>{ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority</span>}
          {ticket.relatedSkills?.slice(0, 3).map((skill, index) => <span key={index} className="bg-slate-700/50 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-md">{skill}</span>)}
        </div>
        <div className="mb-4">
          {ticket.assignedTo ? (
            <>
              <p className="text-xs text-purple-400/80 font-semibold mb-1">Assigned to:</p>
              <p className="text-gray-300 text-sm font-medium">{ticket.assignedTo.email}</p>
            </>
          ) : <p className="text-red-400/80 font-semibold text-sm">Unassigned</p>}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 border-t border-slate-700/50 pt-4 mt-4">
          <Clock className="w-4 h-4" />
          <span>Created on {new Date(ticket.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};
