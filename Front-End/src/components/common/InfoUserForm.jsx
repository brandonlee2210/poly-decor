import axios from "axios";
import React, { useEffect, useState } from "react";

const InfoUserForm = (props) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Vui lòng nhập họ tên.";
    if (!formData.phone) tempErrors.phone = "Vui lòng nhập số điện thoại.";
    else if (!/^\d{10}$/.test(formData.phone))
      tempErrors.phone = "Số điện thoại không hợp lệ.";
    if (!province) tempErrors.province = "Vui lòng chọn Tỉnh/Thành phố.";
    if (!district) tempErrors.district = "Vui lòng chọn Quận/Huyện.";
    if (!ward) tempErrors.ward = "Vui lòng chọn Phường/Xã.";
    if (!formData.address) tempErrors.address = "Vui lòng nhập địa chỉ.";
    if (!formData.email) tempErrors.email = "Vui lòng nhập email.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email không hợp lệ.";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const userData = {
        ...formData,
        province,
        district,
        ward,
      };
      console.log("User Data:", userData);
    } else {
      console.log("Validation failed. Please check the input fields.");
    }
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
        <button
          type="submit"
          className="bg-brown-strong text-white px-8 py-4 font-bold rounded-lg shadow-md hover:bg-brown-dark transition-colors duration-300"
        >
          Xác nhận
        </button>
      </div>
    );

  return (
    <div className={`${minHeight} ${display} items-center justify-center `}>
      <form
        onSubmit={handleSubmit}
        className={`max-w-3xl w-full ${backgroud} p-10 rounded-lg shadow-lg border border-gray-300 bg-cover`}
        style={{ backgroundImage: "url('/path-to-your-furniture-bg.jpg')" }}
      >
        {tittle}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Họ tên"
              value={formData.name}
              onChange={handleInputChange}
              className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleInputChange}
              className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
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
            {errors.province && (
              <span className="text-red-500 text-sm">{errors.province}</span>
            )}
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
            {errors.district && (
              <span className="text-red-500 text-sm">{errors.district}</span>
            )}
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
          {errors.ward && (
            <span className="text-red-500 text-sm">{errors.ward}</span>
          )}
        </div>
        <div className="mt-4">
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={formData.address}
            onChange={handleInputChange}
            className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
        </div>
        <div className="mt-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="outline-none border border-gray-300 rounded-lg px-4 py-3 w-full placeholder:text-gray-600 text-gray-800 focus:ring-2 focus:ring-brown-strong bg-opacity-75 shadow-sm transition-all duration-300"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>
        {btnConfirm}
      </form>
    </div>
  );
};

export default InfoUserForm;
