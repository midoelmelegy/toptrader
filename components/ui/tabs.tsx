import React, { useState } from 'react';

export function Tabs({ defaultValue, className, children, ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className} {...props}>
      {React.Children.map(children, (child) =>
        child ? React.cloneElement(child, { activeTab, setActiveTab }) : null // Ensure child is not null
      )}
    </div>
  );
}

export function TabsList({ className, children, activeTab, setActiveTab, ...props }) {
  return (
    <div className={`flex ${className}`} {...props}>
      {React.Children.map(children, (child) =>
        child ? React.cloneElement(child, { activeTab, setActiveTab }) : null // Ensure child is not null
      )}
    </div>
  );
}

export function TabsTrigger({ value, className, children, activeTab, setActiveTab, ...props }) {
  const isActive = activeTab === value;

  return (
    <button
      className={`${className} ${isActive ? 'bg-white text-black' : 'text-white'}`}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children, activeTab, ...props }) {
  if (activeTab !== value) return null;

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
