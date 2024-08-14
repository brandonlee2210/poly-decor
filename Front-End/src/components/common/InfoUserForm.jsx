import React from "react";

const InfoUserForm = (props) => {
  console.log("props", props);
  
  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
  <form className="max-w-xl w-full bg-white p-10 rounded-lg shadow-lg border border-gray-300 bg-cover" style={{ backgroundImage: "url('/path-to-your-furniture-bg.jpg')" }}>
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
    
    <div className="mt-6 text-right">
      <button className="bg-brown-strong text-white px-5 py-3 rounded-lg shadow-md hover:bg-brown-dark transition-colors duration-300">
        Xác nhận
      </button>
    </div>
  </form>
</div>






  );
};

export default InfoUserForm;
