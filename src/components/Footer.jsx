import React from "react";
import logo from "../assets/logo.png";

export const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`w-full mt-auto px-6 py-10 transition-colors duration-300
        ${
          darkMode
            ? "bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 border-t border-gray-700"
            : "bg-gradient-to-r from-purple-100 to-pink-200 text-gray-800 border-t border-purple-300"
        }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 items-start ">
        {/* Column 1: Logo and Name */}
        {/* Column 1: Logo, Name, and Description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Connectsy Logo"
              className="w-12 h-12 rounded-xl shadow-md"
            />
            <span className="text-2xl font-bold tracking-wide">Connectsy</span>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            Connectsy is a modern platform to discover, connect, and collaborate
            with like-minded individuals. Whether you're here to make friends,
            find teammates, or just network — we've got you covered.
          </p>
        </div>
        
        {/* Column 2: Contact Info */}
        <div className="text-sm space-y-2 ml-40 leading-relaxed">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:manavbarasiya1234@gmail.com"
              className={`underline hover:opacity-80 ${
                darkMode ? "text-pink-300" : "text-purple-700"
              }`}
            >
              manavbarasiya1234@gmail.com
            </a>
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            <a
              href="tel:+918320054465"
              className={`underline hover:opacity-80 ${
                darkMode ? "text-pink-300" : "text-purple-700"
              }`}
            >
              +91 83200 54465
            </a>
          </p>
          <p className="pt-2 text-xs opacity-80">
            © {new Date().getFullYear()} Connectsy. All rights reserved.
          </p>
        </div>

        {/* Column 3: Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 sm:text-right">
            Follow Us On
          </h3>
          <div className="flex sm:justify-end gap-6">
            <a
              href="https://github.com/Manavbarasiya"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-transform transform hover:scale-110 ${
                darkMode ? "hover:text-pink-300" : "hover:text-purple-700"
              }`}
              title="GitHub"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.6.6 1.4.9.7.2 1.4.1 2.2.1.6-.5 1-.9 1.4-1.5-2.6-.3-5.3-1.3-5.3-6a4.7 4.7 0 011.3-3.3 4.3 4.3 0 01.1-3.3s1-.3 3.3 1.3c1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.3 3.3-1.3.5 1 .3 2.1.1 3.3a4.6 4.6 0 011.3 3.3c0 4.7-2.7 5.7-5.3 6 .4.4.7 1 .7 2v3c0 .4.3.7.8.6A10.7 10.7 0 0023.5 12C23.5 5.7 18.3.5 12 .5z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/manav-barasiya-92a602271/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-transform transform hover:scale-110 ${
                darkMode ? "hover:text-pink-300" : "hover:text-purple-700"
              }`}
              title="LinkedIn"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19 0h-14C2.2 0 1 1.2 1 2.7v18.6C1 22.8 2.2 24 3.7 24h14.6c1.5 0 2.7-1.2 2.7-2.7V2.7C22 1.2 20.8 0 19.3 0zM7 20.5H4.5v-11H7v11zm-1.3-12.5c-.8 0-1.4-.7-1.4-1.5 0-.8.6-1.5 1.4-1.5.8 0 1.4.7 1.4 1.5s-.6 1.5-1.4 1.5zm15.3 12.5h-2.5v-5.5c0-1.3-.5-2.1-1.5-2.1-.8 0-1.3.5-1.5 1-.1.2-.1.6-.1.9v5.7h-2.5s.1-9.2 0-10.2h2.5v1.4c.3-.5 1-1.2 2.3-1.2 1.7 0 3 1.1 3 3.5v6.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
