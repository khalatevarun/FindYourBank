import * as ROUTES from '../src/constants/routes';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import AllBanksScreen from './screens/AllBanksScreen/AllBanksScreen';
import FavoritesScreen from './screens/FavoritesScreen/FavoritesScreen';
import BankDetailsScreen from './screens/BankDetailsScreen/BankDetailsScreen';
import filter from 'lodash/filter';
import get from 'lodash/get';

const AppRouter = () => {
  const [userData, setUserData] = useState({
    favorites: [],
  });

  const addToFavorites = (bankObj) => {
    setUserData({ favorites: [...get(userData, 'favorites'), bankObj] });
  };

  const removeFromFavorites = (ifsc) => {
    let newData = filter(
      get(userData, 'favorites'),
      (data) => data.ifsc !== ifsc
    );
    setUserData({
      favorites: newData,
    });
  };

  return (
    <Routes>
      <Route path="/" element={<AllBanksScreen />} />
      <Route
        path={ROUTES.ALL_BANKS}
        element={
          <AllBanksScreen
            userData={userData}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        }
      />
      <Route
        path={ROUTES.FAVORITES}
        element={
          <FavoritesScreen
            userData={userData}
            removeFromFavorites={removeFromFavorites}
          />
        }
      />
      <Route
        path={ROUTES.BANK_DETAILS}
        element={
          <BankDetailsScreen
            userData={userData}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;
