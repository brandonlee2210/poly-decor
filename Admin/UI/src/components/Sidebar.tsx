import { Flex, Menu } from "antd";
import type { MenuProps } from "antd";
import React from "react";

import { FaLeaf } from "react-icons/fa";

const items: MenuProps["items"] = [
  {
    key: 1,
    label: "Trang chủ",
  }, {
    key: 2,
    label: "Sản phẩm"
  }
];

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
        items={items}
        style={{ height: "100%", borderRight: 0 }}
        className="menu"
      />
    </>
  );
};

export default Sidebar;
