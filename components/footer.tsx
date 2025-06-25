import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full bg-gradient-to-r from-blue-50 via-white to-blue-100 border-t border-blue-100 py-6 mt-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      <span className="text-blue-700 font-semibold text-lg tracking-wide" style={{ fontFamily: "'Jost', sans-serif" }}>
        Taskify
      </span>
      <span className="text-gray-500 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
        © {new Date().getFullYear()} Taskify. All rights reserved.
      </span>
      <a
        href="https://linkedin.com/in/ehsan-saleem-web3"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline font-medium text-sm"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Developed by Ehsan Saleem
      </a>
    </div>
  </footer>
);

export default Footer;
