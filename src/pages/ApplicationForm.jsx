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
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="cover_letter">
          Cover Letter (optional):
        </label>
        <textarea
          id="cover_letter"
          name="cover_letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="resume">
          Resume (required):
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          accept=".pdf, .doc, .docx"
          onChange={handleFileChange}
          className="border border-gray-300 rounded w-full p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;
