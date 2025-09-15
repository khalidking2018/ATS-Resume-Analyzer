import { useState, useEffect } from 'react';
import { Theme } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        // Handle legacy format where theme was stored as just a string
        if (typeof parsed === 'string') {
          return { mode: parsed as 'light' | 'dark' };
        }
        // Handle proper object format
        if (parsed && typeof parsed === 'object' && parsed.mode) {
          return parsed;
        }
      } catch (error) {
        console.warn('Invalid theme data in localStorage, resetting to light mode');
      }
    }
    return { mode: 'light' };
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => ({
      mode: prev.mode === 'light' ? 'dark' : 'light'
    }));
  };

  return { theme, toggleTheme };
};