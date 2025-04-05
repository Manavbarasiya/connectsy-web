import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const navigate = useNavigate();
  const { darkMode } = useOutletContext();  // Get dark mode status from context

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error in connection " + err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-[75vh] text-center px-4 transition-colors duration-300 ${
          darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <img
          src="https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_1280.png" // Transparent SVG
          alt="No activity"
          className="w-64 h-64 mb-6 drop-shadow-xl transition-transform duration-500 hover:scale-105"
        />
        <h1 className="text-3xl font-bold mb-3">
          Nothing Here Yet!!
        </h1>
        <p className={`text-gray-500 max-w-md mb-6 ${darkMode ? "text-gray-300" : ""}`}>
          You haven’t made any connections yet. Go find like-minded people and
          start building your circle!
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
        >
          🚀 Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className={`text-center my-10 transition-colors duration-300`}>
      <h1 className={`font-bold text-2xl mb-6 ${darkMode?"text-white":""}`}>Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoURL } = connection;
        return (
          <div
            key={_id}
            className={`flex m-4 p-4 rounded-lg w-1/2 mx-auto shadow-md transition-colors duration-300 ${
              darkMode ? "bg-slate-700 text-white" : "bg-base-300 text-black"
            }`}
          >
            <div>
              <img
                src={photoURL}
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p className="text-gray-500">{age + ", " + gender}</p>}
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
