import axios from "axios";
import React, { useEffect, useState } from "react";
import vnpay from "../assets/images/VNPAY.webp";
import InfoUserForm from "../components/common/InfoUserForm";

const Checkout = () => {
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);
	const [province, setProvince] = useState("");
	const [district, setDistrict] = useState("");
	const [ward, setWard] = useState("");
	const [deliveryFee, setDeliveryFee] = useState("Chưa xác định");

	const formatCurrencyVND = (amount) => {
		let formattedAmount = amount
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		return `${formattedAmount} ₫`;
	};

	const caculateDeliveryFee = async () => {
		try {
			const { data } = await axios.post(
				"https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
				{
					service_id: 53321,
					insurance_value: 100000,
					coupon: null,
					from_district_id: 1482,
					to_district_id: parseInt(district),
					to_ward_code: ward,
					height: 10,
					length: 10,
					weight: 1000,
					width: 10,
				},
				{
					headers: {
						token: "b10e4bc9-3789-11ef-8f55-4ee3d82283af",
					},
				}
			);

			setDeliveryFee(formatCurrencyVND(data.data.total));
		} catch (error) {
			console.log(error);
		}
	};

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

	useEffect(() => {
		if (ward) {
			caculateDeliveryFee();
		}
	}, [ward]);

	return (
		<div className="mt-14 container2">
			<form action="" className="grid grid-cols-[6fr_6fr_4fr] gap-5">
				<div>
					<h2 className="text-2xl font-semibold text-brown-strong mb-3">
						Thông tin giao hàng
					</h2>
					<InfoUserForm
						handleGetDistricts={handleGetDistricts}
						provinces={provinces}
						handleGetWards={handleGetWards}
						districts={districts}
						handleGetWardCode={handleGetWardCode}
						wards={wards}
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
								Mọi giao dịch đều được bảo mật và mã hóa. Thông
								tin thẻ tín dụng sẽ không bao giờ được lưu lại.
							</div>
							<div className="flex items-center gap-2 mt-2">
								<input
									type="radio"
									className="relative before:absolute before:top-[-2px] before:left-[-2px] before:w-4 before:h-4 before:rounded-full before:border-2 before:border-brown-light before:bg-white checked:before:bg-brown-light"
									name="payment"
									id="vnpay"
								/>
								<label
									htmlFor="vnpay"
									className="flex items-center gap-2"
								>
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
								/>
								<label htmlFor="atHome">
									Thanh toán khi nhận hàng{" "}
								</label>
							</div>
						</div>
					</div>
				</div>
				<div className="text-brown-strong">
					<h2 className="text-2xl font-bold ">Tổng tiền giỏ hàng</h2>
					<div className="flex items-center justify-between mt-4">
						<span>Tổng sản phẩm</span>
						<span>10</span>
					</div>

					<div className="flex items-center justify-between mt-4">
						<span>Tổng tiền hàng</span>
						<span className="font-semibold">100.000.000 ₫</span>
					</div>

					<div className="flex items-center justify-between mt-4">
						<span>Phí vận chuyển</span>
						<span className="font-semibold">{deliveryFee}</span>
					</div>

					<div className="flex items-center justify-between mt-4">
						<span>Thành tiền</span>
						<span className="font-semibold">100.000.000 ₫</span>
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
