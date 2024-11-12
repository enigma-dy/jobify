import React from "react";
import { useNavigate } from "react-router-dom";

export const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/jobs/${job._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
      <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
      <p className="text-gray-600">
        {job.company.name} - {job.company.location}
      </p>
      <p className="text-gray-700">{job.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-indigo-600 font-medium">
          ${new Intl.NumberFormat().format(job.salary)}
        </span>
        <span
          className={`px-2 py-1 text-sm rounded ${
            job.remote ? "bg-green-200" : "bg-red-200"
          } text-gray-700`}>
          {job.remote ? "Remote" : "On-site"}
        </span>
      </div>
    </div>
  );
};
