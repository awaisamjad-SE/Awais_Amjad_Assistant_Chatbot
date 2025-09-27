import React from 'react';

export const Button = ({ children, className = '', type = 'button', ...props }) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#9c19f7] to-[#7c3aed] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#9c19f7] transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
