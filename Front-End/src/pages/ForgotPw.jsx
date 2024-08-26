import axios from "axios";
import React, { useEffect, useState, useContext, useCallback } from "react";
import vnpay from "../assets/images/VNPAY.webp";
import InfoUserForm from "../components/common/InfoUserForm";
import { CartContext } from "../CartContext";
import { LoginContext } from "../LoginContext";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const Checkout = () => {
  const { carts, addCart, removeCart, removeAll } = useContext(CartContext);
  const { isLoggedIn, login, logout, userInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState("atHome");
  const [dataAddress, setDataAddress] = useState({}); // state hứng dữ liệu từ InfoUserForm gửi lên

  const totalQuantity = carts.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const totalPrice = carts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  // console.log(totalPrice + deliveryFee);

  const finalPrice = totalPrice;

  const caculateDeliveryFee = async () => {
    try {
      const sampleData = {
        service_id: 53321,
        insurance_value: finalPrice,
        coupon: null,
        from_district_id: 1542,
        to_district_id: 1444,
        to_ward_code: "20314",
        height: 15,
        length: 15,
        weight: 1000,
        width: 15,
      };
      console.log("sampleData", sampleData);

      //   const { data } = await axios.post(
      //     "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      //     sampleData,
      //     {
      //       headers: {
      //         token: "b10e4bc9-3789-11ef-8f55-4ee3d82283af",
      //       },
      //     }
      //   );
      //  console.log(data);

      // setDeliveryFee(35000);
    } catch (error) {
      console.log(error);
    }
  };
  console.log();

  useEffect(() => {
    const fetchShippingFee = async () => {
      try {
        if (dataAddress) {
          const sampleData = {
            service_type_id: 2,
            insurance_value: finalPrice,
            coupon: null,
            from_district_id: 1542,
            to_district_id: parseInt(dataAddress.district),
            to_ward_code: dataAddress.ward.toString(),
            height: 100,
            length: 200,
            weight: 3000,
            width: 100,
          };
          const { data } = await axios.post(
            "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
            sampleData,
            {
              headers: {
                token: "b10e4bc9-3789-11ef-8f55-4ee3d82283af",
              },
            }
          );
          console.log("data", data.data.total);

          setDeliveryFee(data.data.total);
        }
      } catch (error) {
        if (error.response) {
          console.log("Lỗi từ server:", error.response.data);
        } else {
          console.log("Lỗi không xác định:", error);
        }
      }
    };

    fetchShippingFee();
  }, [dataAddress]);

  useEffect(() => {
    const getProvinces = async () => {
      const { data } = await axios.get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            token: "b10e4bc9-3789-11ef-8f55-4ee3d82283af",
          },
        }
      );
      // console.log(data.data);
      setProvinces(data.data);
    };

    getProvinces();
  }, []);

  const handleGetDistricts = async (e) => {
    setProvince(e.target.value);
    const { data } = await axios.get(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
      {
        params: { province_id: e.target.value },
        headers: {
          token: "b10e4bc9-3789-11ef-8f55-4ee3d82283af",
        },
      }
    );
    setDistricts(data.data);
  };

  const handleGetWards = async (e) => {
    setDistrict(e.target.value);
    const { data } = await axios.get(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
      {
        params: { district_id: e.target.value },
        headers: {
          token: "b10e4bc9-3789-11ef-8f55-4ee3d82283af",
        },
      }
    );
    setWards(data.data);
  };

  const handleGetWardCode = (e) => {
    setWard(e.target.value);
  };
  console.log("dataAddress", dataAddress);

  const sendEmail = async (address) => {
    console.log(address);
    console.log(carts);
    console.log(dataAddress.name);

    // use axios
    try {
      const res = await axios.post("http://localhost:8000/api/v1/send-email", {
        // your data
        total: totalPrice,
        address,
        phone: dataAddress.phone,
        email: dataAddress.email,
        fullname: dataAddress.name,
        status: 1,
        date: new Date(),
        products: carts,
      });
      console.log(res);
      if (res) {
        return true;
      } else {
        return false;
      }
      // navigate("/thank-you");
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (ward) {
      caculateDeliveryFee();
    }
  }, [ward]);
  const handleDataChange = useCallback((data) => {
    setDataAddress(data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let address = `Tỉnh ${
    //   provinces.find((x) => x.ProvinceID == province)?.ProvinceName
    // }, ${districts.find((x) => x.DistrictID == district)?.DistrictName}, ${
    //   wards.find((x) => x.WardCode == ward)?.WardName
    // }`;
    if (
      !dataAddress.address ||
      !dataAddress.name ||
      !dataAddress.email ||
      !dataAddress.phone
    ) {
      notification.error({
        message: "Thất bại",
        description: "Vui lòng cập nhật đầy đủ thông tin trước khi đặt hàng",
      });
      return;
    }
    let orderDetailsData = carts.map((x) => {
      return {
        ...x,
        variantID: x._id,
      };
    });

    orderDetailsData.forEach((x) => {
      delete x._id;
    });

    let orderDataSave = {
      orderData: {
        address: dataAddress.address,
        total: totalPrice + deliveryFee,
        email: dataAddress.email,
        userID: userInfo._id,
        fullname: dataAddress.name,
        paymentMethod: payment,
        status: 1,
        date: new Date(),
        orderDetailsData,
      },
      orderDetailsData,
    };

    if (payment == "vnpay") {
      // Your code here to submit the form
      // Navigate to the payment page
      let res = await axios.post(
        "http://localhost:8000/api/v1/create_payment_url",
        {
          amount: totalPrice,
          orderDataSave,
        }
      );

      if (res.data) {
        window.location.href = res.data.data;
      } else {
        window.location.href = "/";
      }
    } else {
      let res = await axios.post(
        "http://localhost:8000/api/v1/orders/save-order",
        orderDataSave
      );

      let emailResutl = await sendEmail(dataAddress.address);

      // console.log(res);

      if (emailResutl) {
        navigate("/result-checkout");
      }
    }

    // Your code here to submit the form
  };
  // console.log("Tổng giá trị", finalPrice + deliveryFee);

  return (
    <div className="mt-14 container2">
      <form
        action=""
        className="grid grid-cols-[6fr_6fr_4fr] gap-5"
        onSubmit={handleSubmit}
      >
        <div>
          <h2
            className="text-2xl font-semibold text-brown-strong mb-3"
            onClick={sendEmail}
          >
            Thông tin giao hàng
          </h2>
          <InfoUserForm
            // handleGetDistricts={handleGetDistricts}
            // provinces={provinces}
            // handleGetWards={handleGetWards}
            // districts={districts}
            // handleGetWardCode={handleGetWardCode}
            // wards={wards}
            // email={email}
            type="checkout"
            onDataChange={handleDataChange}
          />
        </div>
        <div>
          <div>
            <h2 className="text-2xl font-semibold text-brown-strong mb-3">
              Đơn vị vận chuyển
            </h2>
            <div className="flex items-center gap-2 border border-brown-light rounded-lg p-5">
              <input
                type="radio"
                className="relative before:absolute before:top-[-2px] before:left-[-2px] before:w-4 before:h-4 before:rounded-full before:border-2 before:border-brown-light before:bg-white checked:before:bg-brown-light"
                checked
                name=""
                id="delivery"
              />

              <label htmlFor="delivery">Giao hàng nhanh</label>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-brown-strong mb-3 mt-5">
              Phương thức thanh toán
            </h2>
            <div className=" border border-brown-light rounded-lg px-5 py-3">
              <div className="text-sm text-gray-600">
                Mọi giao dịch đều được bảo mật và mã hóa. Thông tin thẻ tín dụng
                sẽ không bao giờ được lưu lại.
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  className="relative before:absolute before:top-[-2px] before:left-[-2px] before:w-4 before:h-4 before:rounded-full before:border-2 before:border-brown-light before:bg-white checked:before:bg-brown-light"
                  name="payment"
                  id="vnpay"
                  checked={payment === "vnpay"}
                  onChange={(e) => setPayment(e.target.id)}
                />
                <label htmlFor="vnpay" className="flex items-center gap-2">
                  Thanh toán qua ví VNPAY{" "}
                  <img src={vnpay} alt="vnpay" width={80} />
                </label>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  className="relative before:absolute before:top-[-2px] before:left-[-2px] before:w-4 before:h-4 before:rounded-full before:border-2 before:border-brown-light before:bg-white checked:before:bg-brown-light"
                  name="payment"
                  id="atHome"
                  checked={payment === "atHome"}
                  onChange={(e) => setPayment(e.target.id)}
                />
                <label htmlFor="atHome">Thanh toán khi nhận hàng </label>
              </div>
            </div>
          </div>
        </div>
        <div className="text-brown-strong">
          <h2 className="text-2xl font-bold ">Tổng tiền đơn hàng</h2>
          <div className="flex items-center justify-between mt-4">
            <span>Tổng sản phẩm</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span>Tổng tiền hàng</span>
            <span className="font-semibold">
              {finalPrice.toLocaleString()} ₫
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span>Phí vận chuyển</span>
            <span className="font-semibold">
              {deliveryFee.toLocaleString()} ₫
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span>Thành tiền</span>
            <span className="font-semibold">
              {(finalPrice + deliveryFee).toLocaleString()} ₫
            </span>
          </div>

          <button
            type="submit"
            className="block w-full mt-5 text-center py-3 text-lg font-semibold uppercase rounded-lg bg-brown-light text-white border-2 border-brown-light duration-200 hover:text-brown-light hover:border-brown-light hover:bg-white"
          >
            Đặt hàng
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;