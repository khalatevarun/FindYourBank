import * as ROUTES from '../src/constants/routes';
import { Route, Routes } from 'react-router-dom';
import AllBanksScreen from './screens/AllBanksScreen/AllBanksScreen';
import FavoritesScreen from './screens/FavoritesScreen/FavoritesScreen';
import BankDetailsScreen from './screens/BankDetailsScreen/BankDetailsScreen';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AllBanksScreen />} />
      <Route path={ROUTES.ALL_BANKS} element={<AllBanksScreen />} />
      <Route path={ROUTES.FAVORITES} element={<FavoritesScreen />} />
      <Route path={ROUTES.BANK_DETAILS} element={<BankDetailsScreen />} />
    </Routes>
  );
};

export default AppRouter;
