import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

export const BusContext = createContext();

export const useBusStore = () => useContext(BusContext);

export const BusContextProvider = ({ children }) => {
  const [busData, _setBusData] = useState(null);
  const setBusData = (d) => _setBusData({ ...busData, ...d });

  useEffect(() => {
    if (busData) {
      // console.log("----1---BusContextProvider", busData);
      localStorage.setItem("busDataStore", JSON.stringify(busData));
    }
  }, [busData]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("busDataStore"))) {
      setBusData(JSON.parse(localStorage.getItem("busDataStore")));
      // console.log("----BusContextProvider");
    }
  }, []);

  return (
    <BusContext.Provider
      value={{
        busData,
        setBusData,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};

export default BusContextProvider;

BusContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
