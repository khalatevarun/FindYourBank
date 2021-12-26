import { message } from 'antd';
import React, { createContext, useState, useEffect, useContext } from 'react';
import filter from 'lodash/filter';
import get from 'lodash/get';
import { myLocalStorage } from '../localStorageWrapper';
import {
  addDoc,
  collection,
  doc,
  arrayUnion,
  setDoc,
  updateDoc,
  arrayRemove,
} from '@firebase/firestore';
import { db } from '../../firebase';

export const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState({
    details: {},
    favorites: [],
  });

  const [banksData, setBanksData] = useState({
    initialData: [],
    filteredData: [],
  });

  const addToFavorites = (bankObj) => {
    let favoriteBanks = [...get(userData, 'favorites'), bankObj];
    setUserData({ ...userData, favorites: favoriteBanks });
    myLocalStorage.setItem(
      'favoriteBanks',
      JSON.stringify(favoriteBanks),
      12000000
    );
    message.success('Bank added to favorites.');
    const docRef = doc(db, 'users', get(userData, 'details.uid'));
    setDoc(docRef, { favorites: JSON.stringify(favoriteBanks) });
  };

  const removeFromFavorites = (ifsc) => {
    let newData = filter(
      get(userData, 'favorites'),
      (data) => data.ifsc !== ifsc
    );
    setUserData({ ...userData, favorites: newData });
    myLocalStorage.setItem('favoriteBanks', JSON.stringify(newData), 12000000);
    message.success('Bank removed from favorites.');
    const docRef = doc(db, 'users', get(userData, 'details.uid'));
    setDoc(docRef, { favorites: JSON.stringify(newData) });
  };

  useEffect(() => {
    let favoritesFromLocalStorage = myLocalStorage.getItem('favoriteBanks');
    if (favoritesFromLocalStorage) {
      setUserData({
        ...userData,
        favorites: JSON.parse(favoritesFromLocalStorage),
      });
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        isLoggedin,
        setIsLoggedIn,
        userData,
        setUserData,
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
