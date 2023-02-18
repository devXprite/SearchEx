"use client";

import {createContext, useContext, useState, useEffect} from "react"

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem('color-mode');
  const hasPersistedPreference = typeof persistedColorPreference === 'string';

    return persistedColorPreference || 'dark'
}

export const ThemeContext =  createContext();

export const ThemeProvider = ({ children }) => {
    const [colorMode, rawSetColorMode] = useState(getInitialColorMode);

    const setColorMode = (value) => {
      rawSetColorMode(value);
      window.localStorage.setItem('color-mode', value);
    };
    
    return (
      <ThemeContext.Provider value={{ colorMode, setColorMode }}>
        {children}
      </ThemeContext.Provider>
    );
  };