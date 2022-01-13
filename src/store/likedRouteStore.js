import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

export const LikedRouteContext = createContext();

export const useLikedRouteStore = () => useContext(LikedRouteContext);

export const LikedRouteContextProvider = ({ children }) => {
  const [likedRouteData, setLikedRouteData] = useState(null);
  // const setLikedRouteData = (d) => _setLikedRouteData([...likedRouteData, ...d]);

  useEffect(() => {
    if (likedRouteData) {
      localStorage.setItem("likedRouteDataStore", JSON.stringify(likedRouteData));
      console.log('LikedRouteContextProvider 3', likedRouteData)
    }
  }, [likedRouteData]);

  useEffect(() => {
    const likedRouteValue = JSON.parse(localStorage.getItem("likedRouteDataStore"))
    if (likedRouteValue) {
      console.log('LikedRouteContextProvider 1', likedRouteValue)
      setLikedRouteData(likedRouteValue)
    }else{
      console.log('LikedRouteContextProvider 2')
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
