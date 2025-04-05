import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const { darkMode } = useOutletContext();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || 18);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender || "other");
  const [error, setError] = useState("");
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, gender, photoURL },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center space-x-10 my-10 mx-10">
        {/* Profile Edit Form */}
        <div
          className={`flex-1 card w-96 shadow-lg border transition-colors duration-500 ${
            darkMode
              ? "bg-slate-700 border-gray-600 text-white"
              : "bg-base-300 text-black"
          }`}
        >
          <div className="card-body">
            <h2 className="card-title flex justify-center">Edit Profile</h2>
            <div>
              {[
                { label: "First Name", value: firstName, onChange: setFirstName },
                { label: "Last Name", value: lastName, onChange: setLastName },
                { label: "Photo URL", value: photoURL, onChange: setPhotoURL },
                { label: "Age", value: age, onChange: setAge, type: "number" },
              ].map(({ label, value, onChange, type = "text" }) => (
                <fieldset className="mb-3" key={label}>
                  <legend
                    className="text-sm font-medium mb-1"
                    style={{ marginBottom: "4px" }}
                  >
                    {label}
                  </legend>
                  <input
                    type={type}
                    className={`input input-bordered w-full ${
                      darkMode ? "bg-gray-800 text-white border-gray-600" : ""
                    }`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                </fieldset>
              ))}

              <fieldset className="mb-3">
                <legend className="text-sm font-medium mb-1">Gender</legend>
                <select
                  className={`select select-bordered w-full ${
                    darkMode ? "bg-gray-800 text-white border-gray-600" : ""
                  }`}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>

              <fieldset className="mb-3">
                <legend className="text-sm font-medium mb-1">About</legend>
                <textarea
                  className={`textarea textarea-bordered w-full ${
                    darkMode ? "bg-gray-800 text-white border-gray-600" : ""
                  }`}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows="3"
                />
              </fieldset>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="card-actions justify-center m-2">
              <button className="btn btn-secondary" onClick={saveProfile}>
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="flex-1">
          <UserCard user={{ firstName, lastName, age, about, gender, photoURL }} />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile Saved Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
