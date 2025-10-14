import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const taskData = [
  { status: "Completed", count: 80 },
  { status: "Pending", count: 22 },
  { status: "AI Assigned", count: 95 },
  { status: "Manual", count: 33 },
];

const recentTasks = [
  { id: 1, title: "Update website banner", assignedTo: "Rahul", status: "In Progress" },
  { id: 2, title: "Database optimization", assignedTo: "Shoaib", status: "Completed" },
  { id: 3, title: "Design new logo", assignedTo: "Anirban", status: "Assigned by AI" },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Stats Cards */}
      
    </div>
  );
}
