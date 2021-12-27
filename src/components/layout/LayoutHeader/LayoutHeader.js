import React from 'react';
import { Layout } from 'antd';
import './style.scss';
import get from 'lodash/get';
import { useMyContext } from '../../../utility/contextProvider/myContext';

const { Header } = Layout;

const LayoutHeader = () => {
  const { userData } = useMyContext();
  return (
    <Header className="main-header">
      <div className="header-title">Find Your Bank</div>
      <div>Logged in as: {get(userData, 'details.email')}</div>
    </Header>
  );
};

export default LayoutHeader;
