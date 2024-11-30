import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navMenu } from "../constant/NavItems";
import { capitalizeWords } from "../utility/util";
import { FiMenu, FiX } from "react-icons/fi";

function MobileNavComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("jobify_user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2">
        <div>
          <p className="font-agdasima text-2xl text-blue-600">Jobify</p>
        </div>
        <div>
          <button
            className="text-3xl text-blue-600 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed top-0 right-0 w-screen h-full bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}>
          <nav
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              {user ? (
                <div
                  className="flex flex-col gap-5 cursor-pointer"
                  onClick={() => navigate("/profile")}>
                  <img
                    src={user.profilePicture || "/default-avatar.png"}
                    alt={`${user.name}'s profile`}
                    className="w-20 h-20 p-4 rounded-full bg-gray-600 overflow-hidden"
                  />
                  <span className="text-lg w-full font-semibold text-gray-700">
                    {capitalizeWords(user.name)}
                  </span>
                </div>
              ) : null}
            </div>

            <ul className="w-full space-y-6 p-6">
              {navMenu.map((nav) => (
                <li key={nav.name} className="w-full text-left group">
                  <Link
                    to={nav.path}
                    className="relative  text-xl text-gray-800 font-medium transition-all duration-300 ease-in-out
           px-2 py-1 rounded-lg  group-hover:scale-105"
                    onClick={() => setIsMenuOpen(false)}>
                    <span className="relative z-10 w-full ">
                      {capitalizeWords(nav.name)}
                    </span>
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto mb-8 w-full flex flex-col items-center space-y-4">
              {user ? null : (
                <div className="space-y-4">
                  <button
                    className="bg-blue-600 text-white text-lg font-semibold py-2 px-6 transition duration-300"
                    onClick={() => navigate("/login")}>
                    Log in
                  </button>
                  <button
                    className="text-blue-600 border border-blue-600 text-lg font-semibold py-2 px-6  transition duration-300"
                    onClick={() => {
                      navigate("/signup");
                      setIsMenuOpen(false);
                    }}>
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export default MobileNavComponent;
