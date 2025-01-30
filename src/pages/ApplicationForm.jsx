import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ApplicationForm = () => {
  const { id } = useParams();
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    if (e.target.name === "resume") {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("cv", resume);
    formData.append("cover_letter", coverLetter);

    try {
      const response = await axios.post(
        `https://jobify-web-api.onrender.com/api/v1/jobs/apply/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response.data.message || "An error occurred.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl mt-20">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Apply for Job
      </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="cover_letter"
          >
            Cover Letter (optional):
          </label>
          <textarea
            id="cover_letter"
            name="cover_letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="5"
            placeholder="Write your cover letter here..."
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="resume"
          >
            Resume (required):
          </label>
          <div className="relative">
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
