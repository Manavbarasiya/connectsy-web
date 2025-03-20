import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || 18);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender || "other");
  const [error, setError] = useState("");
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

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
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex justify-center my-10 mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title flex justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset py-3">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-3">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-3">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-3">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-3">
                  <legend className="fieldset-legend">Gender</legend>
                  <select
                    className="select select-bordered w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </fieldset>
                <fieldset className="fieldset py-3">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows="3"
                  />
                </fieldset>
              </div>

              <p className="text-red-600">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-secondary" onClick={saveProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, age, about, gender, photoURL }} />
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
