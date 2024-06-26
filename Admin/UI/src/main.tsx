import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from 'antd';
import App from "./App.tsx";
import { theme } from "./enums/theme.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
