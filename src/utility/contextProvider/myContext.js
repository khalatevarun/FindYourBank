import { message } from 'antd';
import React, { createContext, useState, useContext } from 'react';
import filter from 'lodash/filter';
import get from 'lodash/get';

export const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    favorites: [],
  });

  const [banksData, setBanksData] = useState({
    initialData: [],
    filteredData: [],
  });

  const addToFavorites = (bankObj) => {
    setUserData({ favorites: [...get(userData, 'favorites'), bankObj] });
    message.success('Bank added to favorites.');
  };

  const removeFromFavorites = (ifsc) => {
    let newData = filter(
      get(userData, 'favorites'),
      (data) => data.ifsc !== ifsc
    );
    setUserData({
      favorites: newData,
    });
    message.success('Bank removed from favorites.');
  };

  return (
    <MyContext.Provider
      value={{
        userData,
        banksData,
        setBanksData,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
