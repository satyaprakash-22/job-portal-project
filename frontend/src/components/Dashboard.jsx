import React, { useEffect, useState } from "react";
import axios from "axios";
import JobForm from "./JobForm";

export default function Dashboard({ user }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    axios
      .get("http://localhost:5000/jobs")
      .then((res) => setJobs(res.data.filter((j) => j.postedBy === user.id)))
      .catch((err) => console.error(err));
  };

  const addJob = async (job) => {
    await axios.post("http://localhost:5000/jobs", {
      ...job,
      postedBy: user.id,
    });
    loadJobs();
  };

  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/jobs/${id}`);
    loadJobs();
  };

  const downloadCSV = async () => {
    const res = await axios.get("http://localhost:5000/jobs/export/csv", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "jobs.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Recruiter Dashboard</h2>
      <JobForm onSubmit={addJob} />

      <button
        onClick={downloadCSV}
        className="bg-green-600 text-white px-3 py-1 rounded mb-4"
      >
        Download Jobs CSV
      </button>

      <ul>
        {jobs.map((job) => (
          <li
            key={job.id}
            className="border p-2 my-2 rounded shadow bg-white flex justify-between"
          >
            <span>
              {job.title} - {job.company}
            </span>
            <button
              onClick={() => deleteJob(job.id)}
              className="bg-red-500 text-white px-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
