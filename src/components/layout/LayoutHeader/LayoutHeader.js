import React from 'react';
import { Layout } from 'antd';
import './style.scss';

const { Header } = Layout;

const LayoutHeader = () => {
  return (
    <Header className="main-header">
      <div className="header-title">Find Your Bank</div>
    </Header>
  );
};

export default LayoutHeader;
