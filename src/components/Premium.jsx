import axios from "axios";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const { darkMode } = useOutletContext();

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );
      const { amount, currency, notes, keyId, orderId } = order.data;
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Connectsy",
        description: "Connecting with users",
        order_id: orderId,
        handler: async function (response) {
          try {
            await axios.post(
              BASE_URL + "/payment/verify",
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );
            alert("Payment successful! 🎉");
          } catch (error) {
            console.error("Verification failed", error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: "manav@1234gmail.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
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
      title: "Become a Verified user",
      type: "silver",
      duration: "3 Months",
      price: "$9.99",
      perks: ["Chat with other people", "100 requests per day", "Blue tick"],
      style:
        "bg-gray-100 text-gray-800 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600",
    },
    
  ];

  return (
    <div
      className={"min-h-screen py-10 px-4 flex flex-col items-center transition-all duration-300"}
    >
      <h1
        className={`text-3xl font-semibold mb-10 text-center ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Become a Verified User
      </h1>

      <div
        className={`rounded-2xl shadow-lg p-6 w-full max-w-md backdrop-blur-md bg-opacity-80 transition-transform transform hover:scale-105 ${
          darkMode
            ? "bg-gray-700 text-white border border-gray-600"
            : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900 border border-purple-200"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-2">Verified Membership</h2>
        <p className="text-sm font-medium mb-4">Lifetime Access</p>
        <ul className="mb-4 space-y-2 list-disc list-inside text-base">
          <li>Verified Blue Tick on your profile</li>
          <li>Stand out in search results</li>
          <li>Increased trust and visibility</li>
        </ul>
        <div className="text-xl font-bold mb-4">$9.99</div>
        <div className="flex justify-center">
          <button
            onClick={() => handleBuyClick("silver")}
            className={`cursor-pointer px-6 py-2 rounded-full text-white btn font-semibold ${
              darkMode ? "btn-primary" : "btn-secondary"
            }`}
          >
            Get Verified
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
