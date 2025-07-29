
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select
      className="w-full px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 transition bg-white"
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
