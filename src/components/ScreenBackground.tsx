import React from 'react';
import bgImage from '../assets/images/app_background.jpg';

export const ScreenBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`min-h-screen bg-[#060606] text-white flex justify-center selection:bg-[#F7B63F] selection:text-black relative overflow-x-hidden ${className}`}
    >
      {/* Outer ambient full-page wallpaper for wide desktop screens */}
      <div
        className="fixed inset-0 pointer-events-none opacity-45 hidden md:block bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="fixed inset-0 pointer-events-none bg-radial from-transparent via-[#060606]/60 to-[#060606] hidden md:block" />

      {/* App Mobile-Optimized Canvas */}
      <div className="w-full max-w-md min-h-screen flex flex-col border-x border-[#1e1e1e] shadow-2xl relative z-10 overflow-hidden bg-[#060606]">
        {/* Main background image with red fire on bottom & smoke on top */}
        <div
          className="fixed inset-0 max-w-md mx-auto pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        {/* Soft atmospheric overlay that leaves the upper smoke and bottom fire clear and vivid while ensuring readable cards */}
        <div className="fixed inset-0 max-w-md mx-auto pointer-events-none z-0 bg-gradient-to-b from-black/15 via-black/45 to-black/25" />

        {/* Dynamic bottom ember glow */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-48 bg-gradient-to-t from-[#E53935]/25 via-[#E53935]/10 to-transparent pointer-events-none blur-2xl z-0" />

        {/* Screen Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

