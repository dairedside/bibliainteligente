
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="w-full px-4 py-3 bg-celestial-800 border border-celestial-900/50 rounded-lg shadow-inner text-light-100 placeholder-light-200 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors duration-200"
      {...props}
    />
  );
};

export default Input;
