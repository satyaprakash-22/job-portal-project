import React, { useState } from "react";

export default function JobForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      description: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded shadow bg-white mb-4"
    >
      <h3 className="font-bold mb-2">Post a Job</h3>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="border p-1 rounded w-full mb-2"
      />
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        className="border p-1 rounded w-full mb-2"
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="border p-1 rounded w-full mb-2"
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-1 rounded w-full mb-2"
      >
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Internship</option>
      </select>
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-1 rounded w-full mb-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Add Job
      </button>
    </form>
  );
}
