import React from 'react';
import logoUrl from '../assets/images/el_pana_burger_logo_transparent.png';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
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
    '2xl': 'w-28 h-28 sm:w-32 sm:h-32',
    '3xl': 'w-36 h-36',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
    >
      <img
        src={logoUrl}
        alt="El Pana Burger"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
      />
    </div>
  );
};

