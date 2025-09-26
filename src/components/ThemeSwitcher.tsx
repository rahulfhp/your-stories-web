"use client";

import React from 'react';
import { useThemeStore } from '@/stores/theme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-12 h-6 rounded-full
        transition-all duration-300 ease-in-out
        backdrop-blur-xl border
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${theme === 'dark' 
          ? 'bg-gray-800/60 border-white/20 hover:bg-gray-700/70 focus:ring-white/30' 
          : 'bg-white/40 border-gray-300/30 hover:bg-white/60 focus:ring-blue-500/30'
        }
        ${className}
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {/* Toggle indicator */}
      <div
        className={`
          absolute w-5 h-5 rounded-full
          transition-all duration-300 ease-in-out
          backdrop-blur-sm border
          flex items-center justify-center
          ${theme === 'dark'
            ? 'translate-x-3 bg-gray-100/90 border-gray-200/50 shadow-lg'
            : '-translate-x-3 bg-gray-800/90 border-gray-700/50 shadow-lg'
          }
        `}
      >
        {theme === 'dark' ? (
          <SunIcon className="w-3 h-3 text-yellow-600" />
        ) : (
          <MoonIcon className="w-3 h-3 text-blue-200" />
        )}
      </div>
      
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1">
        <MoonIcon 
          className={`w-3 h-3 transition-opacity duration-300 ${
            theme === 'dark' ? 'opacity-60 text-blue-300' : 'opacity-30 text-gray-600'
          }`} 
        />
        <SunIcon 
          className={`w-3 h-3 transition-opacity duration-300 ${
            theme === 'dark' ? 'opacity-30 text-gray-400' : 'opacity-60 text-yellow-500'
          }`} 
        />
      </div>
    </button>
  );
};

export default ThemeSwitcher;