
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-8" aria-label="Loading content">
      <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-gold-400">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g className="animate-spin origin-center" style={{ animationDuration: '2s' }}>
            <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
            <path d="M12,2 L12,5 M22,12 L19,12 M12,22 L12,19 M2,12 L5,12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            <path d="M19.07,4.93 L17,7 M4.93,19.07 L7,17 M19.07,19.07 L17,17 M4.93,4.93 L7,7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </g>
        <circle cx="12" cy="12" r="2" fill="currentColor" filter="url(#glow)"/>
      </svg>
      <span className="text-gold-300 mt-4 font-serif">Carregando revelação...</span>
    </div>
  );
};

export default Spinner;
