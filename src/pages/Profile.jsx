import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    role: "",
    savedJob: "",
    notification: "",
    preference: "",
    document: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jobify_user_token");
        if (!token) {
          throw new Error("User not Authenticated");
        }

        const response = await axios.get(
          "http://127.0.0.1:5000/api/v1/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      await axios.patch("/api/users/me/updateProfile", userData);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8  border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
        <p className="text-gray-600">
          A comprehensive overview of your account details
        </p>
      </div>

      <div className="space-y-6">
        {[
          { label: "Name", field: "name" },
          { label: "Email", field: "email" },
          { label: "Username", field: "username" },
          { label: "Role", field: "role" },
          { label: "Saved Job", field: "savedJob" },
          { label: "Notification", field: "notification" },
          { label: "Preference", field: "preference" },
          { label: "Document", field: "document" },
        ].map(({ label, field }) => (
          <div
            key={field}
            className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-md">
            <label className="w-1/3 font-semibold text-gray-700">
              {label}:
            </label>
            <input
              type="text"
              name={field}
              value={userData[field] || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-2/3 px-3 py-1 text-gray-900 rounded-md border ${
                isEditing
                  ? "border-gray-300"
                  : "border-transparent bg-transparent"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8 space-x-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditToggle}
            className="px-5 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
