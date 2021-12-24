import React from 'react';
import { Layout } from 'antd';
import './style.scss';

const { Header } = Layout;

const LayoutHeader = () => {
  return (
    <Header className="main-header">
      <div>This is header</div>
    </Header>
  );
};

export default LayoutHeader;
