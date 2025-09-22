import React, { useState } from "react";
import axios from "axios";

export default function ApplyModal({ job, user, onClose }) {
  const [form, setForm] = useState({
    age: "",
    experience: "",
    prevCompany: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleApply = async () => {
    try {
      await axios.post(`http://localhost:5000/jobs/${job.id}/apply`, {
        ...form,
        userId: user.id,
        email: user.email,
      });
      setMsg("Application submitted!");
    } catch {
      setMsg("Failed to apply");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h3 className="font-bold mb-2">Apply for {job.title}</h3>
        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="border p-1 rounded w-full mb-2"
        />
        <input
          name="experience"
          placeholder="Years of Experience"
          value={form.experience}
          onChange={handleChange}
          className="border p-1 rounded w-full mb-2"
        />
        <input
          name="prevCompany"
          placeholder="Previous Company / Fresher"
          value={form.prevCompany}
          onChange={handleChange}
          className="border p-1 rounded w-full mb-2"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleApply}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
        {msg && <p className="mt-2">{msg}</p>}
      </div>
    </div>
  );
}
