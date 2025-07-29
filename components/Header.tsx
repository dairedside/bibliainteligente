
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-celestial-800 text-white py-6 sm:py-8 text-center shadow-lg relative z-20 border-b-2 border-gold-600/20">
        <div className="relative z-10">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gold-200 to-gold-400 tracking-wider"
                style={{ textShadow: '0px 2px 10px rgba(251, 191, 36, 0.3)' }}
            >
                Bíblia Gênesis
            </h1>
            <p className="text-light-100 mt-2 font-sans text-base sm:text-lg tracking-wide">
                Revelação, Estudo e Transformação
            </p>
        </div>
    </header>
  );
};

export default Header;
