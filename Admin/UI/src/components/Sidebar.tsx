import { Flex, Menu } from "antd";
import type { MenuProps } from "antd";

import { FaLeaf } from "react-icons/fa";

const items: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

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
