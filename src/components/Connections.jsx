import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error in connection " + err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) {
    console.log("here");
    return;
  }
  if (connections.length === 0) {
    return <p>No connection found</p>;
  }
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, age, gender, about, photoURL } =
          connection;
        console.log(photoURL);
        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                src={photoURL}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age+", "+gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
