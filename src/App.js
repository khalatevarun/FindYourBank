import 'antd/dist/antd.css';
import { Layout } from 'antd';
import './App.scss';
import LayoutHeader from './components/layout/LayoutHeader/LayoutHeader';
import LayoutSider from './components/layout/LayoutSider/LayoutSider';
import AppRouter from './AppRouter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  MyProvider,
  useMyContext,
} from '../src/utility/contextProvider/myContext';
import SigninScreen from './screens/SigninScreen/SigninScreen';
const { Content } = Layout;

function App() {
  const { isLoggedIn } = useMyContext();

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? (
          <Layout>
            <LayoutSider />
            <Layout>
              <LayoutHeader />
              <Content className="main-content">
                <AppRouter />
              </Content>
            </Layout>
          </Layout>
        ) : (
          <Routes>
            <Route path="*" element={<SigninScreen />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
