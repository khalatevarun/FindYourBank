import * as ROUTES from '../src/constants/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import AllBanksScreen from './screens/AllBanksScreen/AllBanksScreen';
import FavoritesScreen from './screens/FavoritesScreen/FavoritesScreen';
import BankDetailsScreen from './screens/BankDetailsScreen/BankDetailsScreen';
import { useMyContext } from './utility/contextProvider/myContext';
import SigninScreen from './screens/SigninScreen/SigninScreen';

const AppRouter = () => {
  const { isLoggedin } = useMyContext();
  return (
    <>
      {isLoggedin ? (
        <Routes>
          <Route path="/" element={<AllBanksScreen />} />
          <Route path={ROUTES.ALL_BANKS} element={<AllBanksScreen />} />
          <Route path={ROUTES.FAVORITES} element={<FavoritesScreen />} />
          <Route path={ROUTES.BANK_DETAILS} element={<BankDetailsScreen />} />
          <Route path="*" element={<Navigate to="/all-banks" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<SigninScreen />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
