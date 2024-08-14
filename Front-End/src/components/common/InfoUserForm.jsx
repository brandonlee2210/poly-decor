import React from "react";

const InfoUserForm = (props) => {
  console.log("props", props.provinces  );
  const display = props.type === "checkout" ? "none" : "flex";
  const backgroup = props.type === "checkout" ? "bg-[#FFF]" : "bg-[#DDB671]";
  const minHeight = props.type === "checkout" ? "" : "min-h-[750px]";
  const tittle =
    props.type === "checkout" ? (
      ""
    ) : (
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 my-4 md:text-2xl ">
        Cập nhật thông tin người dùng
      </h1>
    );
  const btnConfirm = props.type === "checkout" ? "" : (
    <div className="mt-6 text-center">
          <button className="bg-brown-strong text-white px-8 py-4 font-bold rounded-lg shadow-md hover:bg-brown-dark transition-colors duration-300">
            Xác nhận
          </button>
        </div>
  )
  return (
    <div className={`${minHeight} ${display} items-center justify-center `}>
      <form
        className={`max-w-3xl w-full ${backgroup} p-10 rounded-lg shadow-lg border border-gray-300 bg-cover`}
        style={{ backgroundImage: "url('/path-to-your-furniture-bg.jpg')" }}
      >
        {tittle}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Họ tên"
              className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
            />
            <span className="text-red-500 text-sm hidden">
              Vui lòng nhập họ tên
            </span>
          </div>
          <div>
            <input
              type="text"
              placeholder="Số điện thoại"
              className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
            />
            <span className="text-red-500 text-sm hidden">
              Vui lòng nhập số điện thoại
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <select
              name="province"
              onChange={props.handleGetDistricts}
              className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
            >
              <option value="">Tỉnh/Thành phố</option>
            </select>
            <span className="text-red-500 text-sm hidden">
              Vui lòng chọn tỉnh/thành phố
            </span>
          </div>
          <div>
            <select
              name="district"
              onChange={props.handleGetWards}
              className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
            >
              <option value="">Quận/Huyện</option>
            </select>
            <span className="text-red-500 text-sm hidden">
              Vui lòng chọn quận/huyện
            </span>
          </div>
        </div>
        <div className="mt-4">
          <select
            onChange={props.handleGetWardCode}
            className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
          >
            <option value="">Phường/Xã</option>
          </select>
          <span className="text-red-500 text-sm hidden">
            Vui lòng chọn phường/xã
          </span>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Địa chỉ"
            className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
          />
          <span className="text-red-500 text-sm hidden">
            Vui lòng nhập địa chỉ
          </span>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Email"
            className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
          />
          <span className="text-red-500 text-sm hidden">
            Vui lòng nhập email
          </span>
        </div>
        {btnConfirm}
      </form>
    </div>
  );
};

export default InfoUserForm;
