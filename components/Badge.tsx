import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  type: 'gold' | 'silver' | 'bronze';
  name: string;
  isNew?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ type, name, isNew = false }) => {
  const colors = {
    gold: 'bg-yellow-400',
    silver: 'bg-gray-300',
    bronze: 'bg-orange-600',
  };

  return (
    <motion.div
      initial={isNew ? { scale: 0 } : { scale: 1 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className={`${colors[type]} rounded-full p-2 w-12 h-12 flex items-center justify-center text-white font-bold shadow-lg`}
    >
      {name[0].toUpperCase()}
    </motion.div>
  );
};