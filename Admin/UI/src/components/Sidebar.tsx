import { Flex, Menu } from "antd";
import React from "react";
import { SidebarItems } from "../enums/main";
import { FaLeaf } from "react-icons/fa";

const Sidebar = () => {
  return (
    <>
      <Flex>
        <div className="header-logo">
          <FaLeaf />
        </div>
      </Flex>

      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={SidebarItems}
        style={{ height: "100%", borderRight: 0, padding: "0 6px" }}
        className="menu"
      />
    </>
  );
};

export default Sidebar;
