import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function JobCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fectchData = async () => {
    try {
      const response = await axios.get(
        "https://jobify-web-api.onrender.com/api/v1/jobs/categories"
      );
      setData(response.data.categories);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fectchData();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
        <span className="text-blue-500">Explore By</span> Category
      </h1>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {data.map((category, index) => (
          <li
            key={index}
            onClick={() => navigate(`/jobs?category=${category._id}`)}
            className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-blue-500 hover:text-white transition-all duration-300 flex flex-col justify-center items-center text-center p-3 sm:p-4">
            <span className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">
              {category._id}
            </span>
            <span className="text-xs sm:text-sm text-gray-600 hover:text-gray-100">
              {category.totalJob} jobs available
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
