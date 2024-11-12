import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/jobs?jobTitle=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`
    );
  };

  return (
    <div className="w-full flex  md:items-center md:justify-between">
      <form
        onSubmit={handleSearch}
        className="flex flex-col w-full shadow-lg  rounded-lg  md:flex-row md:w-auto">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="search"
            placeholder="Job Title or Keyword"
            className="flex mt-2 md:mt-0 md:flex-1 outline-none p-2 md:p-4 border border-gray-300 rounded-md"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <input
            type="search"
            placeholder="Location"
            className="flex mt-2 md:mt-0 md:flex-1 outline-none p-2 md:p-4 border border-gray-300 rounded-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 md:mt-0 md:ml-4 bg-blue-400 py-2 px-6 rounded-md">
          Search Job
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
