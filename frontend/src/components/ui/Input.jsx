import React from 'react';

export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-[#9c19f7] focus:border-[#9c19f7] transition-all duration-200 ${className}`}
      {...props}
    />
  );
};
