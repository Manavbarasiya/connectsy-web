import axios from "axios";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { clearFeed } from "../utils/feedSlice";
import { removeUser } from "../utils/userSlice";

const Navbar = ({ darkMode, setDarkMode }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`navbar transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-100' 
        : 'bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-white'
    } shadow-md`}>
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-2xl font-bold tracking-wider">
          👨‍💻 Connectsy
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <button 
          onClick={toggleTheme} 
          className={`btn btn-sm btn-outline ${
            darkMode 
              ? 'text-gray-100 border-gray-100 hover:bg-gray-100 hover:text-gray-900' 
              : 'text-white border-white hover:bg-white hover:text-black'
          }`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {user && (
          <div className="relative dropdown dropdown-end mx-2 flex items-center">
            <p className="px-4 text-sm font-semibold animate-pulse">Welcome! {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar transition-transform hover:scale-110"
            >
              <div className="w-10 rounded-full ring ring-white ring-offset-2">
                <img alt="user photo" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content absolute mt-40 z-[1] p-2 shadow rounded-box w-52 ${
                darkMode 
                  ? 'bg-gray-900 text-gray-100' 
                  : 'bg-white text-black'
              }`}
            >
              <li>
                <Link 
                  to={"/profile"} 
                  className={`justify-between ${
                    darkMode 
                      ? 'hover:text-pink-300' 
                      : 'hover:text-purple-600'
                  }`}
                >
                  Profile <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link 
                  to={"/connections"} 
                  className={darkMode ? 'hover:text-pink-300' : 'hover:text-purple-600'}
                >
                  My Connections
                </Link>
              </li>
              <li>
                <Link 
                  to={"/requests"} 
                  className={darkMode ? 'hover:text-pink-300' : 'hover:text-purple-600'}
                >
                  Connections Requests
                </Link>
              </li>
              <li>
                <Link 
                  to={"/requested"} 
                  className={darkMode ? 'hover:text-pink-300' : 'hover:text-purple-600'}
                >
                  Requested
                </Link>
              </li>
              <li>
                <a 
                  onClick={handleLogout} 
                  className={darkMode ? 'hover:text-red-400' : 'hover:text-red-500'}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;