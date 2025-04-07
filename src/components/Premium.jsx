import axios from "axios";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const { darkMode } = useOutletContext();

  const handleBuyClick = async (type) => {
    try {
        console.log(type);
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType:type },
        { withCredentials: true }
      );
      const{amount,currency,notes,keyId,orderId}=order.data;
      const options = {
        key: keyId, 
        amount: amount, 
        currency: currency,
        name: 'Connectsy',
        description: 'Connectiong with users',
        order_id: orderId, 
        prefill: {
          name: notes.firstName+" "+notes.lastName,
          email: "manav@1234gmail.com",
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Error in handleBuyClick: " + err.message);
    }
  };
  const plans = [
    {
      title: "Silver Membership",
      type:"silver",
      duration: "3 Months",
      price: "$9.99",
      perks: ["Chat with other people", "100 requests per day", "Blue tick"],
      style:
        "bg-gray-100 text-gray-800 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600",
    },
    {
      title: "Gold Membership",
      type:"gold",
      duration: "6 Months",
      price: "$19.99",
      perks: [
        "Chat with other people",
        "Unlimited requests per day",
        "Blue tick",
      ],
      style:
        "bg-yellow-100 text-yellow-800 border border-yellow-400 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
    },
  ];

  return (
    <div
      className={`min-h-screen py-10 px-4 flex flex-col items-center transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br bg-gray-800 text-white"
          : "bg-gradient-to-br from-white to-gray-100"
      }`}
    >
      <h1
        className={`text-4xl font-bold mb-10 text-center text-transparent bg-clip-text ${
          darkMode
            ? "bg-gradient-to-r from-pink-500 to-red-200"
            : "bg-gradient-to-r from-purple-500 to-pink-500"
        }`}
      >
        Choose Your Membership Plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-md p-6 transition-transform transform hover:scale-105 ${plan.style}`}
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.title}</h2>
            <p className="text-sm font-medium mb-4">{plan.duration}</p>
            <ul className="mb-4 space-y-2 list-disc list-inside">
              {plan.perks.map((perk, idx) => (
                <li key={idx} className="text-base">
                  {perk}
                </li>
              ))}
            </ul>
            <div className="text-xl font-bold mb-4">{plan.price}</div>
            <button
              onClick={() => handleBuyClick(plan.type)}
              className={`cursor-pointer px-6 py-2 rounded-full  text-white btn font-semibold ${
                darkMode ? "btn-primary" : "btn-secondary"
              }`}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
