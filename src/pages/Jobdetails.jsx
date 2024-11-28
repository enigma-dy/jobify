import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://jobify-web-api.onrender.com/api/v1/jobs/${id}`
        );
        setJob(response.data.data);
      } catch (err) {
        setError("Job not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading)
    return <div className="text-center text-lg mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10 space-y-6">
      <h1 className="text-4xl font-bold text-gray-800">{job.title}</h1>
      <p className="text-lg text-gray-600">{job.description}</p>

      <div className="border-t border-gray-300 py-4 space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Company Information
          </h2>
          <p className="text-gray-600">{job.company.name}</p>
          <p className="text-gray-500">{job.company.location}</p>
          <a
            href={job.company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline">
            Visit Company Site
          </a>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">Job Details</h2>
          <p className="text-gray-600">
            <span className="font-semibold">Category:</span> {job.category}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Type:</span> {job.jobType}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Salary:</span> $
            {job.salary.toLocaleString()}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Remote:</span>{" "}
            {job.remote ? "Yes" : "No"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Featured:</span>{" "}
            {job.featured ? "Yes" : "No"}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">Requirements</h2>
          <ul className="list-disc list-inside text-gray-600">
            {job.requirement.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">Benefits</h2>
          <ul className="list-disc list-inside text-gray-600">
            {job.benefits.length > 0 ? (
              job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))
            ) : (
              <li>No specific benefits mentioned</li>
            )}
          </ul>
        </div>

        <div className="text-gray-600 text-sm">
          <p>
            <span className="font-semibold">Posted on:</span>{" "}
            {new Date(job.datePosted).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Application Deadline:</span>{" "}
            {job.applicationDeadline
              ? new Date(job.applicationDeadline).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate("apply")}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
