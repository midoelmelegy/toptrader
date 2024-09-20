import React from 'react';

export function CardComponent({ className, children, ...props }) {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={`px-6 py-4 border-b ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h2 className={`text-2xl font-semibold ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
