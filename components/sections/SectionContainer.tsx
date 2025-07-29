
import React from 'react';

interface SectionContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ title, subtitle, children }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="font-serif text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-700 to-amber-800">{title}</h2>
        <p className="text-stone-500 mt-2 text-lg">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default SectionContainer;
