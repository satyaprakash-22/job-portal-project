import React from "react";

export default function JobCard({ job, onApply, isRecruiter }) {
  return (
    <div className="border p-4 my-2 rounded shadow bg-white">
      <h3 className="font-semibold text-lg">{job.title}</h3>
      <p>{job.company} - {job.location}</p>
      <p className="text-sm">{job.type} | Posted: {job.date}</p>
      <p className="mt-2">{job.description}</p>

      {!isRecruiter && (
        <button
          onClick={() => onApply(job)}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2"
        >
          Apply
        </button>
      )}
    </div>
  );
}
