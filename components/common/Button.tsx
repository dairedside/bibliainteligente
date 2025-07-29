
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 font-bold rounded-lg shadow-lg focus:outline-none focus:ring-4 transition-all duration-300 transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none';
  
  const variantClasses = {
    primary: 'bg-gradient-to-br from-gold-400 to-gold-600 text-celestial-900 hover:shadow-gold-500/40 hover:from-gold-300 hover:to-gold-500 focus:ring-gold-400/50',
    secondary: 'bg-parchment-100 text-gold-700 border border-gold-600/20 hover:bg-gold-50 hover:border-gold-600/50 focus:ring-gold-500/30',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
