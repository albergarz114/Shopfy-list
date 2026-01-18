import React, { createContext, useState, useContext } from 'react';

// Create the Tower
const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isGerman, setIsGerman] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setIsGerman(!isGerman);
  const toggleSound = () => setIsSoundOn(!isSoundOn);

  return (
    <SettingsContext.Provider value={{ isDarkMode, isGerman, isSoundOn, toggleTheme, toggleLanguage, toggleSound }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the settings easily
export const useSettings = () => useContext(SettingsContext);