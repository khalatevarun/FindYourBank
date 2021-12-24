import 'antd/dist/antd.css';
import { Button, Layout } from 'antd';
import './App.css';
import LayoutHeader from './components/layout/LayoutHeader/LayoutHeader';
import LayoutSider from './components/layout/LayoutSider/LayoutSider';

const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <LayoutSider />
        <Layout>
          <LayoutHeader />
          <Content className="main-content">
            <div>Hello World</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
