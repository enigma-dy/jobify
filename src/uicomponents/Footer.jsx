import React from "react";
import { about } from "../constant/AboutItems";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-10 px-5 md:px-20">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="w-full md:w-[400px]">
          <h1 className="text-2xl font-semibold mb-2">Jobify</h1>
          <p className="text-gray-400">
            Great platform for jobseekers who are passionate about startups.
            Find your dream job more easily.
          </p>
        </div>
        <div className="flex gap-8">
          <ul className="space-y-2">
            {about.slice(0, 3).map((content, index) => (
              <li key={index} className="hover:text-gray-300 cursor-pointer">
                {content}
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {about.slice(3).map((content, index) => (
              <li key={index} className="hover:text-gray-300 cursor-pointer">
                {content}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col w-full md:w-[300px]">
          <h1 className="text-xl font-semibold mb-2">Get Job Notification</h1>
          <p className="text-gray-400 mb-4">
            The latest job news and articles, sent to your inbox weekly.
          </p>
          <div className="flex">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="px-4 py-2 rounded-l-md bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none"
            />
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
