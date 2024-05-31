import type { MenuProps } from "antd";

export const SidebarItems : MenuProps  = [
  {
    key: 1,
    label: "Trang chủ",
  }, {
    key: 2,
    label: "Sản phẩm",
    children: [
      { key: '5', label: 'Thêm sản phẩm' },
      { key: '6', label: 'Chi tiết sản phẩm' },
    ]
  }
]
  

