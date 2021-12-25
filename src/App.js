import 'antd/dist/antd.css';
import { Layout } from 'antd';
import './App.css';
import LayoutHeader from './components/layout/LayoutHeader/LayoutHeader';
import LayoutSider from './components/layout/LayoutSider/LayoutSider';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';

const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <LayoutSider />
          <Layout>
            <LayoutHeader />
            <Content className="main-content">
              <AppRouter />
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
