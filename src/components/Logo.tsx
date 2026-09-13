import React from 'react';
import logoUrl from '../assets/images/el_pana_burger_logo_transparent.png';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'hero' | 'mega';
  className?: string;
  showBorder?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32 sm:w-36 sm:h-36',
    '3xl': 'w-40 h-40 sm:w-44 sm:h-44',
    '4xl': 'w-48 h-48 sm:w-52 sm:h-52',
    hero: 'w-52 h-52 sm:w-60 sm:h-60',
    mega: 'w-60 h-60 sm:w-72 sm:h-72',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
    >
      <img
        src={logoUrl}
        alt="El Pana Burger"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)] drop-shadow-[0_0_15px_rgba(247,182,63,0.25)]"
      />
    </div>
  );
};

