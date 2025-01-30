import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <Skeleton count={5} />
      </div>
    );

  if (error)
    return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-40">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">{job.title}</h1>
          <button
            onClick={() => navigate("apply")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Apply Now
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Company Information
            </h2>
            <ul className="space-y-3">
              <li className="text-gray-700">
                <span className="font-medium">Company:</span> {job.company.name}
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Location:</span>{" "}
                {job.company.location}
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Website:</span>{" "}
                <a
                  href={job.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Company Site
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Job Details
            </h2>
            <ul className="space-y-3">
              <li className="text-gray-700">
                <span className="font-medium">Category:</span> {job.category}
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Type:</span> {job.jobType}
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Salary:</span> $
                {job.salary.toLocaleString()}
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Remote:</span>{" "}
                {job.remote ? "Yes" : "No"}
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Featured:</span>{" "}
                {job.featured ? "Yes" : "No"}
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Requirements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {job.requirement.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Benefits
          </h2>
          {job.benefits.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No specific benefits</p>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Timeline
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <span className="font-medium">Posted on:</span>{" "}
              {new Date(job.postedOn).toLocaleDateString()}
            </li>
            <li>
              <span className="font-medium">Application Deadline:</span>{" "}
              {job.applicationDeadline
                ? new Date(job.applicationDeadline).toLocaleDateString()
                : "N/A"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
