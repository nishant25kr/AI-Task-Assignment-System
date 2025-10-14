import React, { useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const addTask = () => {
    if (!taskName.trim()) return;
    const newTask = { id: Date.now(), name: taskName };
    setTasks([...tasks, newTask]);
    setTaskName("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Task Management</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button onClick={addTask} className="btn btn-primary">Add</button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white shadow p-3 rounded flex justify-between items-center"
          >
            <span>{task.name}</span>
            <button
              onClick={() => deleteTask(task.id)}
              className="btn btn-sm btn-error"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
