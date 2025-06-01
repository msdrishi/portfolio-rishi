import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme} 
      aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
    >
      {isDarkTheme ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;