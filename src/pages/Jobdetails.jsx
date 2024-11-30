import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
    return <div className="absolute inset-0 flex justify-center items-center">
  <Skeleton count={5} />
</div>
  if (error)
    return  <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg  mt-40">
  <div className="flex flex-col space-y-6">
    <div className="flex justify-between">
      <h1 className="text-4xl font-bold text-gray-800">{job.title}</h1>
      <button
        onClick={() => navigate("apply")}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
      >
        Apply Now
      </button>
    </div>

    <div className="flex flex-col space-y-2">
      <p className="text-lg text-gray-600">{job.description}</p>
      <div className="flex flex-wrap justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-700">Company Information</h2>
          <ul className="list-none text-gray-600">
            <li>Company: {job.company.name}</li>
            <li>Location: {job.company.location}</li>
            <li>
              Website:{" "}
              <a
                href={job.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit Company Site
              </a>
            </li>
          </ul>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-700">Job Details</h2>
          <ul className="list-none text-gray-600">
            <li>Category: {job.category}</li>
            <li>Type: {job.jobType}</li>
            <li>Salary: ${job.salary.toLocaleString()}</li>
            <li>Remote: {job.remote? "Yes" : "No"}</li>
            <li>Featured: {job.featured? "Yes" : "No"}</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="flex flex-col space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Requirements</h2>
      <ul className="list-disc list-inside text-gray-600">
        {job.requirement.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold text-gray-700">Benefits</h2>
      {job.benefits.length > 0? (
        <ul className="list-disc list-inside text-gray-600">
          {job.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No specific benefits</p>
      )}
    </div>

    <div className="flex flex-col space-y-2">
      <h2 className="text-xl font-semibold text-gray-700">Timeline</h2>
      <ul className="list-none text-gray-600">
        <li>
          Posted on:{" "}
          {new Date(job.postedOn).toLocaleDateString()}
        </li>
        <li>
          Application Deadline:{" "}
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
