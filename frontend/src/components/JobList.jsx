import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import ApplyModal from "./ApplyModal";

export default function JobList({ user }) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredJobs = jobs
    .filter((j) =>
      j.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((j) => (filterType ? j.type === filterType : true));

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Available Jobs</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-1 rounded"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {filteredJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onApply={(j) => setSelectedJob(j)}
          isRecruiter={false}
        />
      ))}

      {selectedJob && (
        <ApplyModal
          job={selectedJob}
          user={user}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}
