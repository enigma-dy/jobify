import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { JobCard } from "../uicomponents/Cards";
import Footer from "../uicomponents/Footer";

const JobListingPage = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const initialJobTitle = searchParams.get("jobTitle") || "";
  const initialLocation = searchParams.get("location") || "";

  const [jobTitle, setJobTitle] = useState(initialJobTitle);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sort: "",
    page: 1,
    limit: 36,
    search: "",
    searchBy: "title",
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/v1/jobs", {
        params: {
          jobTitle,
          location: locationFilter,
          ...filters,
        },
      });
      setJobs(response.data.jobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [jobTitle, locationFilter, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePageChange = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }));
  };

  return (
    <>
      <div className="max-w-6xl mt-16 mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Listings</h1>

        <div className="flex items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none"
          />
          <input
            type="text"
            placeholder="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none"
          />
          <button
            onClick={fetchJobs}
            className="w-64 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
            Apply Filters
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg focus:outline-none">
            <option value="">Sort by</option>
            <option value="date">Date</option>
            <option value="salary">Salary</option>
          </select>
          <input
            type="number"
            name="page"
            value={filters.page}
            onChange={handleFilterChange}
            placeholder="Page"
            className="w-20 p-2 border rounded-lg focus:outline-none"
          />
          <input
            type="number"
            name="limit"
            value={filters.limit}
            onChange={handleFilterChange}
            placeholder="Results per page"
            className="w-32 p-2 border rounded-lg focus:outline-none"
          />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search term"
            className="w-full p-2 border rounded-lg focus:outline-none"
          />
          <select
            name="searchBy"
            value={filters.searchBy}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg focus:outline-none">
            <option value="title">Title</option>
            <option value="description">Description</option>
            <option value="category">Category</option>
          </select>
        </div>

        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}

        <div className="w-full flex justify-center mt-8">
          <button
            onClick={handlePageChange}
            className="bg-blue-500 rounded-2xl px-6 py-3 font-bold text-white">
            More
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobListingPage;
