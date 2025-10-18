
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";


export default function Admin() {

  const [user, setUser] = useState(null);

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



  return (
    <div className="flex  bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1  flex flex-col ">
        {/* Top Header Bar */}
        <header className="  w-full">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Welcome Message */}
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, {user?.name || "Admin"}! 👋
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Manage users, create tasks, and monitor activities
                </p>
              </div>

            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
