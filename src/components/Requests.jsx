import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.pendingRequests));
    } catch (err) {
      console.error("Error in requests " + err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <p className="text-center mt-10 text-lg">No connection requests found</p>;
  }
  const requestReceived=async(status,_id)=>{
    try{
        const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
        dispatch(removeRequest(_id));
    }catch(err){
        console.log("Error in requestReceived part: "+err.message);
    }
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl mb-6">Connection Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, age, gender, about, photoURL, _id } = request.fromUserId;

        return (
          <div key={_id} className="flex items-center justify-between m-4 p-4 rounded-lg bg-gray-100 w-2/3 mx-auto shadow-lg">

            <div className="flex items-center">
              <img
                src={photoURL || "https://via.placeholder.com/100"}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                {age && gender && <p className="text-gray-600">{age + ", " + gender}</p>}
                <p className="text-gray-700">{about || "No bio available"}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 btn btn-primary transition" onClick={()=>{requestReceived("accepted",request._id)}}>
                Accept
              </button>
              <button className="px-4 py-2 btn btn-secondary transition" onClick={()=>{requestReceived("rejected",request._id)}} >
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
