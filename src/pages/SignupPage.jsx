import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://jobify-web-api.onrender.com/api/v1/user/register",
        formData
      );

      toast.success(response.data.message || "Signup successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Signup failed, please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 my-20">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg my-10">
        <h2 className="mb-6 text-2xl font-bold text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {!loading ? "Sign Up" : "Signing Up..."}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Log in
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignupPage;
