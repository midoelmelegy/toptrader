import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const colors = {
    success: 'bg-neonGreen',
    error: 'bg-red-500',
    info: 'bg-neonBlue',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${colors[type]} text-white font-gaming`}
          style={{ boxShadow: `0 0 10px ${colors[type]}` }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};