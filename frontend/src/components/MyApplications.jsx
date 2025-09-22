import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyApplications({ user }) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${user.id}/applications`)
      .then((res) => setApps(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">My Applications</h2>
      <ul>
        {apps.map((a) => (
          <li
            key={a.id}
            className="border p-2 my-2 rounded shadow bg-white"
          >
            {a.jobTitle} at {a.company} —{" "}
            <span className="font-semibold">{a.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
