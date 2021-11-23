import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const useUserStore = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [userData, _setUserData] = useState({});
  const setUserData = (d) => _setUserData({ ...userData, ...d });
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};