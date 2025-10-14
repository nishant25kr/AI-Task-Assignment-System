import React, { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null); // start with null, not undefined

  useEffect(() => {
  const loadUser = () => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    } else {
      setUser(null);
    }
  };

  loadUser(); // run on mount
  window.addEventListener("storage", loadUser); // listen for changes

  return () => window.removeEventListener("storage", loadUser);
}, []);

  if(!user) return(
    <button>login</button>
  )

  return (
    <div className="w-full border p-2">
      <h1>
        Name: {user ? user.email : "Guest"} {/* ✅ Safe access */}
      </h1>
      <button className="border">Logout</button>
    </div>
  );
}

export default Navbar;
