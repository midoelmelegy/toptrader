import React, { useState, ReactNode } from 'react';

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
}

interface TabsContextProps {
  activeTab: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextProps | undefined>(undefined);

export function Tabs({ defaultValue, value, onValueChange, className, children, ...props }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const activeTab = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, onValueChange: handleValueChange }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  className?: string;
  children: ReactNode;
}

export function TabsList({ className, children }: TabsListProps) {
  return <div className={`flex ${className}`}>{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: ReactNode;
}

export function TabsTrigger({ value, className, children }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within a Tabs component');

  const { activeTab, onValueChange } = context;
  const isActive = activeTab === value;

  return (
    <button
      className={`${className} ${!(className?.includes('text')) ? (isActive ? 'bg-white text-black' : 'text-white') : (isActive ? 'bg-white':'')}`}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: ReactNode;
}

export function TabsContent({ value, className, children }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within a Tabs component');

  const { activeTab } = context;
  if (activeTab !== value) return null;

  return <div className={className}>{children}</div>;
}