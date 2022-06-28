import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

export const LanguageContext = createContext();

export const useLanguageStore = () => useContext(LanguageContext);

export const LanguageContextProvider = ({ children }) => {
  const [isZhTw, setIsZhTw] = useState(null);

  useEffect(() => {
    const tempIsZhTw = (navigator.language || navigator.browserLanguage).toLowerCase() === 'zh-tw';
    setIsZhTw(tempIsZhTw)
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        isZhTw
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;

LanguageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
