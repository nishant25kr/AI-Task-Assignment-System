import React, { useState } from "react";
import axios from "axios";
import {
    UserPlus,
    Mail,
    Award,
    CheckCircle,
    XCircle,
    Loader,
    User
} from 'lucide-react';

function CreateEmployee() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [skills, setSkills] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleCreateEmployee = async () => {
        setLoading(true);
        setMessage("");
        setMessageType("");

        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/create-employee",
                {
                    name,
                    email,
                    skills,
                }
            );

            setMessage("Employee created successfully!");
            setMessageType("success");
            console.log("Employee created:", res.data);

            setName("");
            setEmail("");
            setSkills("");
        } catch (error) {
            console.error("Error creating employee:", error.response?.data || error.message);
            setMessage("Failed to create employee. Please check the details.");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <div className="max-w-7xl mx-auto px-6 pb-12">
                <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                            <UserPlus className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Create New Employee</h1>
                            <p className="text-sm text-gray-400">Add a new team member to your organization</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-600/40 rounded-2xl p-6 mb-8">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-purple-400" />
                            Instructions for Admin
                        </h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400 mt-1">•</span>
                                <span>Enter a valid <span className="text-white font-medium">Name</span> (e.g., John Doe)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400 mt-1">•</span>
                                <span>Enter a unique <span className="text-white font-medium">Email</span> address</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400 mt-1">•</span>
                                <span>List <span className="text-white font-medium">Skills</span> separated by commas (e.g., <code className="bg-slate-900/50 px-2 py-0.5 rounded text-purple-300">React, Node.js, Django</code>)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6 mb-6">
                        {/* Name Input */}
                        <div>
                            <label className=" text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                <User className="w-4 h-4 text-purple-400" />
                                Employee Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className=" text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-purple-400" />
                                Employee Email
                            </label>
                            <input
                                type="email"
                                placeholder="employee@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Skills Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                <Award className="w-4 h-4 text-purple-400" />
                                Skills
                            </label>
                            <input
                                type="text"
                                placeholder="React, Node.js, Python, etc."
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-2">Separate multiple skills with commas</p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleCreateEmployee}
                        disabled={loading || !name || !email || !skills}
                        className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${loading || !name || !email || !skills
                            ? "bg-slate-700/50 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/50 transform hover:scale-[1.02]"
                            }`}
                    >
                        {loading ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                Creating Employee...
                            </>
                        ) : (
                            <>
                                <UserPlus className="w-5 h-5" />
                                Create Employee
                            </>
                        )}
                    </button>

                    {/* Message Display */}
                    {message && (
                        <div
                            className={`mt-6 p-4 rounded-xl border flex items-center gap-3 ${messageType === "success"
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                                }`}
                        >
                            {messageType === "success" ? (
                                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            ) : (
                                <XCircle className="w-5 h-5 flex-shrink-0" />
                            )}
                            <span className="font-medium">{message}</span>
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

export default CreateEmployee;
