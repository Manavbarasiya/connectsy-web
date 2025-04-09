import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const { darkMode } = useOutletContext();
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.pendingRequests));
    } catch (err) {
      console.error("Error in requests " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const requestReceived = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log("Error in requestReceived part: " + err.message);
    }
  };

  // Show loader while fetching requests
  if (isLoading) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-[80vh] text-center px-4 transition-all duration-300 ${
          darkMode ? "bg-gray-800 text-white" : ""
        }`}
      >
        <img
          src="https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif"
          alt="Loading requests..."
          className="w-24 h-24 mb-6"
        />
        <h2 className="text-2xl font-semibold animate-pulse">
          Checking for requests...
        </h2>
      </div>
    );
  }

  // Show message if no requests
  if (!requests || requests.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-[75vh] text-center px-4 transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-white" : ""
        }`}
      >
        <img
          src="https://cdn.pixabay.com/photo/2025/03/19/19/04/man-9481358_1280.jpg"
          alt="No requests"
          className="w-64 h-64 mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">You're All Caught Up!</h1>
        <p
          className={`max-w-md mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-500"
          }`}
        >
          No connection requests at the moment. Come back later or explore new
          users to connect with.
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

  // Show all requests
  return (
    <div
      className={`text-center my-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "text-black"
      }`}
    >
      <h1 className={`font-bold text-2xl mb-6 ${darkMode ? "text-white" : ""}`}>
        Connection Requests
      </h1>
      {requests.map((request) => {
        const {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoURL,
          skills = [],
          _id,
        } = request.fromUserId;

        return (
          <div
            key={_id}
            className={`flex items-center justify-between m-4 p-4 rounded-lg w-2/3 mx-auto shadow-lg transition-colors duration-300 ${
              darkMode ? "bg-slate-700 text-white" : "bg-gray-100 text-black"
            }`}
          >
            <div className="flex items-center ">
              <img
                src={photoURL || "https://via.placeholder.com/100"}
                alt="profile"
                onClick={() => {
                  navigate("/user/" + _id);
                  window.scrollTo(0, 0);
                }}
                className="w-20 cursor-pointer h-20 rounded-full object-cover border border-gray-300"
              />
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-500">{age + ", " + gender}</p>
                )}
                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {about?.split(" ").length > 15
                  ? `${about.split(" ").slice(0, 15).join(" ")}... `
                  : about}
                {about?.split(" ").length > 15 && (
                  <span
                    className="text-blue-500 cursor-pointer hover:underline ml-1"
                    onClick={() => {
                      navigate("/user/" + _id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    know more
                  </span>
                )}
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

            <div className="flex gap-3">
              <button
                className={`px-4 py-2 btn transition ${
                  darkMode ? "btn-success" : "btn-primary"
                }`}
                onClick={() => requestReceived("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className={`px-4 py-2 btn transition ${
                  darkMode ? "btn-info" : "btn-secondary"
                }`}
                onClick={() => requestReceived("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
