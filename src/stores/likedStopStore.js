import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

export const LikedStopContext = createContext();

export const useLikedStopStore = () => useContext(LikedStopContext);

export const LikedStopContextProvider = ({ children }) => {
  const [likedStopData, setLikedStopData] = useState(null);

  useEffect(() => {
    if (likedStopData) {
      localStorage.setItem("likedStopDataStore", JSON.stringify(likedStopData));
    }
  }, [likedStopData]);

  useEffect(() => {
    const likedStopValue = JSON.parse(
      localStorage.getItem("likedStopDataStore")
    );
    if (likedStopValue) {
      setLikedStopData(likedStopValue);
    } else {
      setLikedStopData([]);
    }
  }, []);

  return (
    <LikedStopContext.Provider
      value={{
        likedStopData,
        setLikedStopData,
      }}
    >
      {children}
    </LikedStopContext.Provider>
  );
};

export default LikedStopContextProvider;

LikedStopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
