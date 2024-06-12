import { useState } from "react";
import React from "react";
import { Layout } from "antd";
import { Breadcrumb, Menu, theme } from 'antd';
const { Sider, Header, Content } = Layout;
import "./App.css";
import Sidebar from "./components/Sidebar";


function App() {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorPrimary, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="sider"
        style={{ minWidth : "128px" }}
      >
        <Sidebar></Sidebar>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: colorPrimary }} ></Header>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        <Content>
          
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
