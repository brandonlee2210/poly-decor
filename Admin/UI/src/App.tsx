import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";

const { Sider, Header, Content } = Layout;
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="sider"
      >
        <Sidebar></Sidebar>
      </Sider>
      <Layout>
        <Header theme="light"></Header>
        <Content></Content>
      </Layout>
    </Layout>
  );
}

export default App;
