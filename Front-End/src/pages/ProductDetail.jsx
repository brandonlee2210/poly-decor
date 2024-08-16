import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import categoryImage1 from "../assets/images/category-1.1.jpg";
import rightProductDetail from "../assets/images/right-product-detail.jpg";
import ProductItem from "../components/common/ProductItem";
import { getProductById, getProducts } from "../api/api";
import { Button, message } from "antd";
import { formatCurrency } from "../utils";

const colors = [
  { name: "Màu nâu", id: "bg-brown-strong", value: "Nâu" },
  { name: "Màu vàng", id: "bg-yellow-main", value: "Vàng" },
  { name: "Màu trắng", id: "bg-white", value: "Trắng" },
];

const materials = ["Gỗ sồi", "Gỗ thông"];

const ProductDetail = () => {
  const { carts, addCart, removeCart } = useContext(CartContext);
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [variant, setVariant] = useState({});
  const [variants, setVariants] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeColor, setActiveColor] = useState(colors[0].id);
  const [material, setMaterial] = useState(materials[0]);
  const [quantity, setQuantity] = useState(1); // Thêm state cho số lượng

  useEffect(() => {
    getProductById(id).then((res) => {
      setProduct(res);
      setVariants(res.variants);
      setVariant(res.variants[0]);
    });
  }, [id]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data.data));
  }, []);

  const handleVariantChange = (colorId, material) => {
    setActiveColor(colorId);

    if (!material) {
      let variantHasColor = variants.find(
        (variant) =>
          variant.color === colors.find((c) => c.id === colorId).value
      );

      if (variantHasColor) {
        setVariant(variantHasColor);
        setMaterial(variantHasColor.material);
        return;
      }
    }

    const selectedColor = colors.find((x) => x.id === colorId);
    if (!selectedColor) {
      console.error(`Color with id ${colorId} not found`);
      return;
    }

    const newVariant = variants.find(
      (variant) =>
        variant.color === selectedColor.value && variant.material === material
    );

    if (!newVariant) {
      console.error(
        `Variant with color ${selectedColor.value} and material ${material} not found`
      );
      return;
    }

    setVariant(newVariant);
  };

  const addToCart = () => {
    let cartData = {
      ...product,
      material,
      color: colors.find((c) => c.id === activeColor).value,
      price: variant.price,
      quantity, // Thêm số lượng vào dữ liệu giỏ hàng
    };
    console.log(cartData);
    addCart(cartData);
    message.success(`Thêm thành công ${product.name} vào giỏ hàng`);
  };

  const availableColors = colors.filter((color) =>
    variants.some((variant) => variant.color === color.value)
  );

  const availableMaterials = variants
    .filter(
      (variant) =>
        variant.color === colors.find((c) => c.id === activeColor).value
    )
    .map((variant) => variant.material);

  return (
    <div className="container mt-[80px]">
      <div className="grid grid-cols-[3fr_1fr] gap-[30px]">
        <div>
          <img
            // src={`/src/assets/images/${product.image}`}
            src={product.image}
            alt="product image"
          />
          <h2 className="text-3xl font-bold text-brown-strong mt-5">
            {product.name}
          </h2>
          <div className="mt-[25px]">
            <span className="text-brown-light mr-1">Danh mục:</span>
            {product.categoryName}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-regular fa-star text-yellow-500"></i>
            </div>
            |<div className="text-gray-500">1000 lượt mua</div>
          </div>
          <div className="mt-3 text-lg text-brown-light font-semibold">
            Số lượng: {variant?.stock}
          </div>
          <div className="mt-3 text-lg text-brown-light line-through font-semibold">
            Giá gốc: {variant?.price && formatCurrency(variant?.price * 1.05)}
          </div>
          <div className="mt-3 text-3xl font-bold text-red-600">
            Giá: {variant?.price && formatCurrency(variant?.price)}
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-lg font-semibold text-brown-strong">
              Màu sắc:{" "}
            </span>
            <div className="flex items-center gap-5">
              {availableColors.map((color) => (
                <span
                  key={color.id}
                  className={`w-7 h-7 duration-300 cursor-pointer hover:scale-125 shadow-[0_0_6px_rgba(0,0,0,0.5)] ${
                    color.id
                  } ${activeColor === color.id ? "scale-125" : ""}`}
                  onClick={() => handleVariantChange(color.id, null)}
                ></span>
              ))}
            </div>
          </div>
          {availableMaterials.length > 0 && (
            <div className="mt-5">
              <label
                htmlFor="material"
                className="text-lg font-semibold text-brown-strong"
              >
                Chất liệu:{" "}
              </label>
              <select
                id="material"
                className="border border-brown-strong outline-none py-1 px-2 rounded-lg"
                value={material}
                onChange={(e) => handleVariantChange(null, e.target.value)}
              >
                {availableMaterials.map((material, index) => (
                  <option key={index} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mt-5">
            <label
              htmlFor="quantity"
              className="text-lg font-semibold text-brown-strong"
            >
              Số lượng
            </label>
            <input
              id="quantity"
              type="number"
              className="border border-brown-strong outline-none py-1 px-2 rounded-lg"
              value={quantity}
              min="1"
              max={variant.quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-6 mt-10">
            <div className="bg-brown-light text-brown-strong flex items-center justify-center gap-1 py-4 rounded-lg text-xl font-bold duration-200 border-2 hover:bg-white hover:border-brown-strong hover:border-2">
              <i className="fa-regular fa-credit-card"></i> Mua ngay
            </div>
            <div
              onClick={addToCart}
              className="bg-brown-light text-brown-strong flex items-center justify-center gap-1 py-4 rounded-lg text-xl font-bold duration-200 border-2 hover:bg-white hover:border-brown-strong hover:border-2"
            >
              <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
            </div>
          </div>
        </div>
        <div>
          <img src={rightProductDetail} alt="right image" />

          <h3 className="text-xl text-brown-strong font-bold mt-6 before:border-l-4 before:border-brown-strong before:mr-4">
            Chính sách bảo hành
          </h3>

          <div className="mt-6 border border-brown-light rounded-lg py-5 px-3">
            <div className="before:w-5 before:h-5 before:rounded-full before:bg-brown-light before:inline-block before:mr-2 flex items-center">
              Bảo hành 2 năm
            </div>

            <div className="mt-6 before:w-5 before:h-5 before:rounded-full before:bg-brown-light before:inline-block before:mr-2 flex items-center">
              Bảo trì trọn đời
            </div>

            <div className="mt-6 before:w-5 before:h-5 before:rounded-full before:bg-brown-light before:inline-block before:mr-2 flex items-center">
              Giao hàng miễn phí
            </div>

            <div className="mt-6 before:w-5 before:h-5 before:rounded-full before:bg-brown-light before:inline-block before:mr-2 flex items-center">
              Lắp đặt miễn phí
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="border border-[#eaeaea] p-3">Tên sản phẩm</td>
              <td className="border border-[#eaeaea] p-3">{product.name}</td>
            </tr>
            <tr className="bg-[#f9f9f9]">
              <td className="border border-[#eaeaea] p-3">Chất liệu</td>
              <td className="border border-[#eaeaea] p-3">
                Khung gỗ Sồi OAK tự nhiên , Toàn bộ bề mặt tiếp xúc là da bò tự
                nhiên, bề mặt không tiếp xúc là da nhân tạo cao cấp.
              </td>
            </tr>
            <tr>
              <td className="border border-[#eaeaea] p-3">Kích thước</td>
              <td className="border border-[#eaeaea] p-3">
                Băng 1 : L1200*W1000*H1340MM, Băng 2 : L1880*W1000*H1370mm, Băng
                3: L2430*W1000*H1380mm
              </td>
            </tr>
            <tr className="bg-[#f9f9f9]">
              <td className="border border-[#eaeaea] p-3">Màu sắc</td>
              <td className="border border-[#eaeaea] p-3">Nâu cà phê</td>
            </tr>
            <tr>
              <td className="border border-[#eaeaea] p-3">Phong cách</td>
              <td className="border border-[#eaeaea] p-3">
                Neoclassical French
              </td>
            </tr>
            <tr className="bg-[#f9f9f9]">
              <td className="border border-[#eaeaea] p-3">Xuất xứ</td>
              <td className="border border-[#eaeaea] p-3">Nhập khẩu.</td>
            </tr>
            <tr>
              <td className="border border-[#eaeaea] p-3">Bảo hành</td>
              <td className="border border-[#eaeaea] p-3">2 năm</td>
            </tr>
            <tr className="bg-[#f9f9f9]">
              <td className="border border-[#eaeaea] p-3">Bảo trì</td>
              <td className="border border-[#eaeaea] p-3">Trọn đời sản phẩm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-[60px]">
        <h2 className="text-3xl font-bold text-brown-strong uppercase">
          Sản phẩm cùng loại
        </h2>
        <div className="mt-5">
          <Swiper
            slidesPerView={4}
            loop={true}
            spaceBetween={16}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={1000}
            modules={[Autoplay]}
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
