import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import logo from '../../../assets/groww_logo.png';
import MenuKeys from '../../../constants/menu';
import map from 'lodash/map';
import get from 'lodash/get';
import './style.scss';
import { getLeftPanelKey } from '../../../constants/routes';
import { useMyContext } from '../../../utility/contextProvider/myContext';
import { getAuth, signOut } from 'firebase/auth';

const { Sider } = Layout;

const LayoutSider = () => {
  const location = useLocation();

  const { setIsLoggedIn } = useMyContext();
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        alert.error('Something went wrong');
      });
  };

  return (
    <Sider>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[getLeftPanelKey(get(location, 'pathname'))]}
      >
        {map(MenuKeys, (m, i) => {
          return (
            <Menu.Item key={`${i}`}>
              <Link to={get(m, 'route')}>{get(m, 'name')}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
    </Sider>
  );
};

export default LayoutSider;
