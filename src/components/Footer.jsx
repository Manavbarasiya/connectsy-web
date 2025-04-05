import React from "react";

export const Footer = ({ darkMode }) => {
  return (
    <footer className={`footer sm:footer-horizontal items-center p-4 border-t-2 mt-auto w-full transition-colors duration-300 ${
      darkMode
        ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 border-gray-600'
        : 'bg-gradient-to-r from-gray-300 to-purple-400 text-gray-700 border-purple-300'
    }`}>
      <aside className="grid-flow-col items-center gap-4">
        <svg 
          width="36" 
          height="36" 
          viewBox="0 0 24 24" 
          className={`animate-spin-slow ${
            darkMode ? 'fill-current text-pink-400' : 'fill-current text-purple-600'
          }`}
        >
          <path d="M22.672 15.226l-2.432.811..." />
        </svg>
        <p className="text-sm">© {new Date().getFullYear()} DevTinder. All rights reserved.</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a className={`transition-all duration-200 ${
          darkMode ? 'hover:text-pink-300' : 'hover:text-purple-600'
        }`}>
          <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M24 4.557..." />
          </svg>
        </a>
        <a className={`transition-all duration-200 ${
          darkMode ? 'hover:text-pink-300' : 'hover:text-purple-600'
        }`}>
          <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M19.615 3.184..." />
          </svg>
        </a>
        <a className={`transition-all duration-200 ${
          darkMode ? 'hover:text-pink-300' : 'hover:text-purple-600'
        }`}>
          <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M9 8h-3v4h3v12h5v-12h3.642..." />
          </svg>
        </a>
      </nav>
    </footer>
  );
};