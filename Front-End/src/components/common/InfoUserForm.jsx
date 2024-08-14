import axios from "axios";
import React, { useEffect, useState } from "react";

const InfoUserForm = (props) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const { data } = await axios.get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            headers: {
              token: "b10e4bc9-3789-11ef-8f55-4ee3d82283af",
            },
          }
        );
        setProvinces(data.data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    };

    getProvinces();
  }, []);

  const handleGetDistricts = async (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);
    setDistrict(""); // Reset district and ward when province changes
    setWards([]);

    if (selectedProvince) {
      try {
        const { data } = await axios.get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
          {
            params: { province_id: selectedProvince },
            headers: {
              token: "b10e4bc9-3789-11ef-8f55-4ee3d82283af",
            },
          }
        );
        setDistricts(data.data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    }
  };

  const handleGetWards = async (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setWard(""); // Reset ward when district changes

    if (selectedDistrict) {
      try {
        const { data } = await axios.get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
          {
            params: { district_id: selectedDistrict },
            headers: {
              token: "b10e4bc9-3789-11ef-8f55-4ee3d82283af",
            },
          }
        );
        setWards(data.data);
      } catch (error) {
        console.error("Failed to fetch wards:", error);
      }
    }
  };

  const handleGetWardCode = (e) => {
    setWard(e.target.value);
  };

  const display = props.type === "checkout" ? "none" : "flex";
  const backgroud = props.type === "checkout" ? "bg-[#FFF]" : "bg-[#DDB671]";
  const minHeight = props.type === "checkout" ? "" : "min-h-[750px]";

  const tittle =
    props.type === "checkout" ? (
      ""
    ) : (
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 my-4 md:text-2xl ">
        Cập nhật thông tin người dùng
      </h1>
    );

  const btnConfirm =
    props.type === "checkout" ? (
      ""
    ) : (
      <div className="mt-6 text-center">
        <button className="bg-brown-strong text-white px-8 py-4 font-bold rounded-lg shadow-md hover:bg-brown-dark transition-colors duration-300">
          Xác nhận
        </button>
      </div>
    );

  return (
    <div className={`${minHeight} ${display} items-center justify-center `}>
      <form
        className={`max-w-3xl w-full ${backgroud} p-10 rounded-lg shadow-lg border border-gray-300 bg-cover`}
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
              value={province}
              onChange={handleGetDistricts}
              className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
            >
              <option value="">Tỉnh/Thành phố</option>
              {provinces.map((province) => (
                <option key={province.ProvinceID} value={province.ProvinceID}>
                  {province.ProvinceName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="district"
              value={district}
              onChange={handleGetWards}
              className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
              disabled={!province} // Disable if no province is selected
            >
              <option value="">Quận/Huyện</option>
              {districts.map((district) => (
                <option key={district.DistrictID} value={district.DistrictID}>
                  {district.DistrictName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <select
            name="ward"
            value={ward}
            onChange={handleGetWardCode}
            className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
            disabled={!district} // Disable if no district is selected
          >
            <option value="">Phường/Xã</option>
            {wards.map((ward) => (
              <option key={ward.WardCode} value={ward.WardCode}>
                {ward.WardName}
              </option>
            ))}
          </select>
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
