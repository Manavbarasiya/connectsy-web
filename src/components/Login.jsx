import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("Frank@gmail.com");
  const [password, setPassword] = useState("Frank@1234");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleClick = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/login",
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true } // ✅ Allows cookies (important if you're using JWT in cookies)
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <div>
            <fieldset className="fieldset py-3">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                placeholder=""
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset py-3">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleClick();
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
