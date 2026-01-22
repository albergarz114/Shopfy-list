import React, { createContext, useState, useContext } from 'react';

// Create the Tower
const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isGerman, setIsGerman] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  
  const theme = {
    // This is your "Impressive" Purple to Blue blend
    vibrantGradient: ['#6A11CB', '#2575FC'], 
    colors: isDarkMode ? {
      background: '#000000',
      card: 'rgba(255, 255, 255, 0.1)', // Translucent glass look
      text: '#FFFFFF',
    } : {
      background: '#F2F2F7',
      card: 'rgba(255, 255, 255, 0.8)',
      text: '#000000',
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setIsGerman(!isGerman);
  const toggleSound = () => setIsSoundOn(!isSoundOn);
  

  return (
    <SettingsContext.Provider value={{ isDarkMode, isGerman, isSoundOn, toggleTheme, toggleLanguage, toggleSound, theme }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the settings easily
export const useSettings = () => useContext(SettingsContext);