import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (res.data.role !== role) {
        setError(`User is not a ${role}`);
        return;
      }
      onLogin(res.data);
    } catch (err) {
      setError("Login failed, please check your credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
      <h2 className="text-lg font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-1 rounded"
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-1 rounded"
        />
        <label>Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="seeker">Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 mt-2 rounded"
        >
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
