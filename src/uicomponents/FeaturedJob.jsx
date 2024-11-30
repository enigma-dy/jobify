import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCategory from "./JobCategory";

export default function FeaturedJob() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedJob = async () => {
    try {
      const response = await axios.get(
        "https://jobify-web-api.onrender.com/api/v1/jobs/featured"
      );
      setData(response.data.featured);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedJob();
  }, []);

  if (loading || !data.length) return null;

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          <span className="text-gray-800">Featured </span>
          <span className="text-blue-600">Jobs</span>
        </h1>
        <button className="text-blue-600 font-semibold hover:underline">
          Show All
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length > 0 ? (
          data.slice(0, 8).map((featured) => (
            <li
              key={featured._id}
              className="h-64 p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex flex-col space-y-3 justify-center items-center text-center">
              <p className="text-lg font-semibold">{featured.title}</p>
              <p className="text-sm text-gray-500">{featured.location}</p>
              <p className="font-medium">{featured.company.name}</p>
              <p className="text-sm font-semibold">{featured.salary}</p>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No featured jobs available
          </p>
        )}
      </ul>
    </div>
  );
}
