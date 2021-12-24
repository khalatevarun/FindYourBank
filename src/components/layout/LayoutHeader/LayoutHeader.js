import React from 'react';
import { Layout } from 'antd';
import './style.scss';

const { Header } = Layout;

const LayoutHeader = () => {
  return (
    <Header className="main-header">
      <div>Welcome to Groww!</div>
      <div>
        Find the banks which best suit your requirments within few clicks :)
      </div>
    </Header>
  );
};

export default LayoutHeader;
