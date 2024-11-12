import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../modals/Modal";
import LoginFormComponent from "../modals/LoginForm";
import { capitalizeWords } from "../utility/util";
import { navMenu } from "../constant/NavItems";
import { Link } from "react-router-dom";
function DesktopNavComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("jobify_user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <div className="font-agdasima text-xl flex items-center justify-between relative p-4">
      <nav className="my-3">
        <ul className="flex space-x-8">
          {navMenu.map((nav) => (
            <Link to={nav.path} key={nav.name} className="relative group">
              <span className="relative inline-block text-lg transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500">
                {capitalizeWords(nav.name)}
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 transition-all duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left" />
              </span>
            </Link>
          ))}
        </ul>
      </nav>
      <div className="flex gap-3 items-center">
        {user ? (
          <div className="flex items-center space-x-2">
            <span
              className="text-black font-semibold cursor-pointer"
              onClick={() => navigate("/profile")}
              role="button"
              aria-label="Go to Profile">
              {user.name}
            </span>
            <img
              src={user.profilePicture ? "" : "/default-avatar.png"}
              alt={`${user.name}'s profile`}
              className="w-10 h-10 p-4 rounded-full overflow-hidden bg-gray-600"
            />
          </div>
        ) : (
          <>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full  transition duration-300 ease-in-out transform hover:scale-105"
              onClick={toggleModal}>
              Log in
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full  transition duration-300 ease-in-out transform hover:scale-105">
              Sign Up
            </button>
          </>
        )}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <LoginFormComponent onClose={toggleModal} setUser={setUser} />
        </Modal>
      )}
    </div>
  );
}

export default DesktopNavComponent;
