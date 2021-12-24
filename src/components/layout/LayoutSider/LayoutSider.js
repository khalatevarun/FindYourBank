import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import logo from '../../../assets/groww_logo.png';
import MenuKeys from '../../../constants/menu';
import map from 'lodash/map';
import get from 'lodash/get';
import './style.scss';

const { Sider } = Layout;

const LayoutSider = () => {
  return (
    <Sider>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Menu mode="inline" defaultSelectedKeys={['1']}>
        {map(MenuKeys, (m, i) => {
          return (
            <Menu.Item key={`${i}`}>
              <Link to={get(m, 'route')}>{get(m, 'name')}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default LayoutSider;
