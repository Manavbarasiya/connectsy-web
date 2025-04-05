import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const UserCard = ({ user }) => {
  const { darkMode } = useOutletContext();
  const { _id, firstName, lastName, about, age, gender, photoURL } = user;
  const dispatch = useDispatch();

  const sendStatus = async (status, userId) => {
    try {
      await axios.post(`${BASE_URL}/request/send/interested/${userId}`, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error in Feed : " + err.message);
    }
  };

  return (
    <div
      className={`card w-96 border rounded-xl transition-all duration-500 transform hover:scale-[1.02] ${
        darkMode
          ? "bg-slate-700 border-gray-600 text-white shadow-md"
          : ' bg-pink-100'
      }`}
    >
      <figure className="px-6 pt-6">
        <img
          src={photoURL}
          alt="Profile"
          className="rounded-xl w-full h-64 object-cover shadow-lg"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p className="text-sm">{age + ", " + gender}</p>}
        <p className="text-sm mt-1">{about}</p>
        <div className="card-actions mt-4 flex gap-3">
          <button
            className={`btn ${darkMode ? "btn-info" : "btn-primary"}`}
            onClick={() => sendStatus("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className={`btn ${darkMode ? "btn-success" : "btn-secondary"}`}
            onClick={() => sendStatus("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
