import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

export const LikedRouteContext = createContext();

export const useLikedRouteStore = () => useContext(LikedRouteContext);

export const LikedRouteContextProvider = ({ children }) => {
  const [likedRouteData, setLikedRouteData] = useState(null);

  useEffect(() => {
    if (likedRouteData) {
      localStorage.setItem(
        "likedRouteDataStore",
        JSON.stringify(likedRouteData)
      );
    }
  }, [likedRouteData]);

  useEffect(() => {
    const likedRouteValue = JSON.parse(
      localStorage.getItem("likedRouteDataStore")
    );
    if (likedRouteValue) {
      setLikedRouteData(likedRouteValue);
    } else {
      setLikedRouteData([]);
    }
  }, []);

  return (
    <LikedRouteContext.Provider
      value={{
        likedRouteData,
        setLikedRouteData,
      }}
    >
      {children}
    </LikedRouteContext.Provider>
  );
};

export default LikedRouteContextProvider;

LikedRouteContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
