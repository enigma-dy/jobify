import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm({ toggleSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/user/login",
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;

      localStorage.setItem("jobify_user_token", token);
      localStorage.setItem("jobify_user", JSON.stringify(user));

      console.log("Login successful", user);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-600 mt-2 mb-6">
          Please log in to stay connected with us.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 peer"
            />
            <label className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-gray-500 peer-focus:text-blue-500 transition-all">
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 peer"
            />
            <label className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-gray-500 peer-focus:text-blue-500 transition-all">
              Password
            </label>
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Log In
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline focus:outline-none">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
