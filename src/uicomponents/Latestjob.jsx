import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LatestJob() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLatestJob = async () => {
    try {
      const response = await axios.get("https://jobify-web-api.onrender.com/api/v1/jobs");
      setData(response.data.jobs);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestJob();
  }, []);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          <span className="text-gray-800">Latest </span>
          <span className="text-blue-600">Jobs</span>
        </h1>
        <button className="text-blue-600 font-semibold hover:underline">
          Show All
        </button>
      </div>

      <ul className="flex flex-wrap gap-6 justify-center items-start">
        {data.length > 0 ? (
          data.slice(0, 12).map((job) => (
            <li
              key={job._id}
              className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
              <p className="font-semibold text-xl mb-2">{job.title}</p>

              <p className="text-gray-500 mb-1">{job.location}</p>

              <p className="flex gap-2 items-center text-gray-600 mb-4">
                <span>{job.company.name}</span>
                <span className="font-bold text-gray-400">·</span>
                <span>{job.company.location}</span>
              </p>

              <div className="flex items-center space-x-3">
                <p className="text-sm font-medium">{job.jobType}</p>
                <span className="w-1 h-6 bg-gray-300"></span>
                <p className="text-sm font-medium">{job.category}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No featured jobs available
          </p>
        )}
      </ul>
    </div>
  );
}
