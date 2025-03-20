import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user }) => {
  const { _id,firstName, lastName, about, age, gender } = user;
  const dispatch=useDispatch();
  const sendStatus = async (status,userId) => {
    try {
      console.log('CAAAALLL');
      const res=await axios.post(BASE_URL+"/request/send/interested/"+userId,{},{withCredentials:true});
      dispatch(removeUserFromFeed(userId));

    } catch (err) {
      console.error("Error in Feed : " + err.message);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm my-10 ">
      <figure className="px-10 pt-10">
        <img src={user.photoURL} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={()=>{sendStatus("ignored",_id)}}>Ignore</button>
          <button className="btn btn-secondary" onClick={()=>{sendStatus("interested",_id)}}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
