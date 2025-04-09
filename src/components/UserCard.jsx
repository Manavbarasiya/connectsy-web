import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";

const UserCard = ({ user }) => {
  const { darkMode } = useOutletContext();
  const {
    _id,
    firstName,
    lastName,
    about,
    age,
    gender,
    photoURL,
    photos,
    skills = [],
  } = user;

  const dispatch = useDispatch();

  const allPhotos = Array.isArray(photos) && photos.length > 0 ? photos : [photoURL];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0); // Reset index whenever the user changes
  }, [_id]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const sendStatus = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/interested/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
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
          : "bg-pink-100 text-black"
      }`}
    >
      {/* Conditional Image Rendering */}
      {allPhotos.length === 1 ? (
        <div className="relative">
          <img
            src={allPhotos[0]}
            alt="Profile"
            loading="lazy"
            className="rounded-xl w-full h-[400px] object-cover object-center shadow-lg transition-all duration-500"
            style={{ imageRendering: "auto" }}
          />
        </div>
      ) : (
        <div className="relative" {...swipeHandlers}>
          <img
            src={allPhotos[currentIndex]}
            alt="Profile"
            loading="lazy"
            className="rounded-xl w-full h-96 object-cover object-center shadow-lg transition-all duration-500"
            style={{ imageRendering: "auto" }}
          />
          {currentIndex > 0 && (
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 dark:bg-gray-800 p-1 rounded-full"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {currentIndex < allPhotos.length - 1 && (
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 dark:bg-gray-800 p-1 rounded-full"
              onClick={handleNext}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p className="text-sm">{age + ", " + gender}</p>}
        <p className="text-sm mt-1">{about}</p>

        {skills.length > 0 && (
          <div className="mt-3 w-full">
            <div className="flex flex-wrap justify-center gap-2">
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
          </div>
        )}

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
