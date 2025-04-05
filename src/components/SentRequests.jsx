import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequested, removeRequested } from "../utils/requestedSlice";
import { useOutletContext } from "react-router-dom";

const SentRequests = () => {
  const dispatch = useDispatch();
  const { darkMode } = useOutletContext();
  const requested = useSelector((store) => store.requested);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequestedConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/requested", {
        withCredentials: true,
      });
      dispatch(addRequested(res.data.sentRequest));
    } catch (err) {
      console.log("Error in fetchRequestedConnections " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsendRequest = async (requestId) => {
    try {
      await axios.delete(`${BASE_URL}/request/cancel/${requestId}`, {
        withCredentials: true,
      });
      dispatch(removeRequested(requestId));
    } catch (err) {
      console.error("Error unsending request: " + err.message);
    }
  };

  useEffect(() => {
    fetchRequestedConnections();
  }, []);

  if (isLoading) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-[80vh] text-center px-4 transition-all duration-300 ${
          darkMode ? "bg-slate-900 text-white" : ""
        }`}
      >
        <img
          src="https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif"
          alt="Loading requests..."
          className="w-24 h-24 mb-6"
        />
        <h2 className="text-2xl font-semibold animate-pulse">
          Loading sent requests...
        </h2>
      </div>
    );
  }

  if (!requested || requested.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-[75vh] text-center px-4 transition-colors duration-300 ${
          darkMode ? "bg-slate-800 text-white" : ""
        }`}
      >
        <img
          src="https://cdn.pixabay.com/photo/2024/02/29/19/16/ai-generated-8602544_1280.jpg"
          alt="No requests"
          className="w-64 h-64 mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">No Requests Sent Yet</h1>
        <p
          className={`max-w-md mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Looks like you haven't sent any connection requests yet. Start
          exploring users to connect with.
        </p>
        <a
          href="/"
          className="btn btn-primary px-6 py-2 rounded-full text-white shadow-md transition hover:scale-105"
        >
          🔍 Explore Users
        </a>
      </div>
    );
  }

  return (
    <div
      className={`text-center my-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "text-black"
      }`}
    >
      <h1 className={`font-bold text-2xl mb-6 ${darkMode ? "text-white" : ""}`}>
        Sent Connection Requests
      </h1>
      {requested.map((request) => {
        const {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoURL,
          skills = [],
          _id,
        } = request.toUserId;

        return (
          <div
            key={_id}
            className={`flex items-center justify-between m-4 p-4 rounded-lg w-2/3 mx-auto shadow-lg transition-colors duration-300 ${
              darkMode ? "bg-slate-700 text-white" : "bg-gray-100 text-black"
            }`}
          >
            <div className="flex items-center">
              <img
                src={photoURL || "https://via.placeholder.com/100"}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-500">{age + ", " + gender}</p>
                )}
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {about || "No bio available"}
                </p>

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-white text-blue-600 border border-blue-300"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <button
                className={`px-4 py-2 text-sm rounded-md shadow transition hover:scale-105 ${
                  darkMode
                    ? "btn btn-primary"
                    : "btn btn-secondary"
                }`}
                onClick={() => handleUnsendRequest(request._id)}
              >
                Unsend
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SentRequests;
