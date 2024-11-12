import React, { useState } from "react";

import { Login } from "../auth/Login";

const LoginFormComponent = ({ setUser, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await Login(email, password);
      localStorage.setItem("jobify_user", JSON.stringify(data));
      setUser(data);
      setLoginSuccess(true);
      setTimeout(onClose, 2000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Incorrect email or password. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-11/12 max-w-md mx-auto p-6 bg-gray-700 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {loginSuccess && (
            <p className="text-green-500 text-center">Login successful!</p>
          )}
          <div className="flex items-center space-x-2">
            <label htmlFor="email" className="p-4 bg-gray-600 rounded-l">
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg">
                <use xlinkHref="#icon-user" />
              </svg>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-600 text-white rounded-r outline-none focus:bg-gray-700"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="password" className="p-4 bg-gray-600 rounded-l">
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg">
                <use xlinkHref="#icon-lock" />
              </svg>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-600 rounded-r outline-none focus:bg-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-bold tracking-wide text-gray-200 uppercase bg-pink-600 rounded hover:bg-pink-700">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-gray-300">
          Not a member?{" "}
          <a href="#" className="text-pink-600 hover:underline">
            Sign up now
          </a>
          <svg className="inline w-4 h-4 fill-current">
            <use xlinkHref="#icon-arrow-right" />
          </svg>
        </p>
      </div>
    </div>
  );
};

export default LoginFormComponent;
