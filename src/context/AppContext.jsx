import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState('India'); // Default to India
  const [mode, setMode] = useState('Beginner'); // 'Beginner' or 'Advanced'

  return (
    <AppContext.Provider value={{ selectedCountry, setSelectedCountry, mode, setMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
