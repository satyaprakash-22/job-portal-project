import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import JobList from "./components/JobList";
import MyApplications from "./components/MyApplications";
import { getUser, saveUser, clearUser } from "./storage";

function App() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    if (user) saveUser(user);
  }, [user]);

  const handleLogout = () => {
    clearUser();
    setUser(null);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">
          Welcome {user.role} {user.email}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {user.role === "seeker" && (
        <>
          <JobList user={user} />
          <MyApplications user={user} />
        </>
      )}

      {user.role === "recruiter" && <Dashboard user={user} />}
    </div>
  );
}

export default App;
