import React from 'react';

export function Buttonlogin({ className, children, ...props }) {
  return (
    <button
      className={`px-4 py-2 font-medium transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
