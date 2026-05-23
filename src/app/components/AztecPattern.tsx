import React from 'react';

export function AztecPattern() {
  return (
    <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="aztec-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Stepped pyramid motif */}
            <rect x="10" y="50" width="10" height="10" fill="currentColor" />
            <rect x="15" y="45" width="10" height="5" fill="currentColor" />
            <rect x="20" y="40" width="10" height="5" fill="currentColor" />
            <rect x="25" y="35" width="10" height="5" fill="currentColor" />
            
            {/* Geometric patterns */}
            <path d="M60,10 L70,10 L75,20 L70,30 L60,30 L55,20 Z" fill="currentColor" />
            <circle cx="85" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="85" cy="20" r="2" fill="currentColor" />
            
            {/* Diagonal lines */}
            <line x1="10" y1="70" x2="20" y2="80" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="70" x2="30" y2="80" stroke="currentColor" strokeWidth="2" />
            
            {/* Small decorative elements */}
            <rect x="70" y="70" width="8" height="8" fill="currentColor" />
            <rect x="72" y="72" width="4" height="4" fill="white" fillOpacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#aztec-pattern)" />
      </svg>
    </div>
  );
}

export function AztecBorder() {
  return (
    <svg width="100%" height="8" viewBox="0 0 200 8" preserveAspectRatio="none" className="text-amber-700">
      <pattern id="border-pattern" x="0" y="0" width="20" height="8" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="8" height="8" fill="currentColor" />
        <rect x="10" y="0" width="8" height="8" fill="currentColor" />
        <rect x="2" y="2" width="4" height="4" fill="white" fillOpacity="0.3" />
        <rect x="12" y="2" width="4" height="4" fill="white" fillOpacity="0.3" />
      </pattern>
      <rect width="200" height="8" fill="url(#border-pattern)" />
    </svg>
  );
}
