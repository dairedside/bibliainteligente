
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-parchment-50 p-6 sm:p-8 rounded-xl shadow-2xl shadow-black/30 border border-gold-600/20 text-stone-800 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
