import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import categoryImage1 from "../assets/images/category-1.1.jpg";
import rightProductDetail from "../assets/images/right-product-detail.jpg";
import ProductComment from "../components/common/Comment";
import ProductItem from "../components/common/ProductItem";
import {
  getProductById,
  getCommentByProductId,
  getAllVariantsProduct,
} from "../api/api";
import { Button, message } from "antd";
import moment from "moment";

const colors = [
  { name: "Màu nâu", id: "bg-brown-strong", value: "Nâu" },
  { name: "Màu vàng", id: "bg-yellow-main", value: "Vàng" },
  { name: "Màu trắng", id: "bg-white", value: "Trắng" },
];

const materials = ["Gỗ sồi", "Gỗ thông"];

const ProductDetail = () => {
  const { carts, addCart, removeCart, addWhistlist } = useContext(CartContext);
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [variant, setVariant] = useState({});
  const [variants, setVariants] = useState([]);
  const [activeColor, setActiveColor] = useState("");
  const [material, setMaterial] = useState(materials[0]);
  const [color, setColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1); // Thêm state cho số lượng

  const [colorsArr, setColors] = useState([]);
  const [materialsArr, setMaterials] = useState([]);

  useEffect(() => {
    getAllVariantsProduct().then((data) => {
      let res = data.data;

      const colors = res
        ?.filter((v) => v.variantProductType === "color")
        .map((x) => {
          return { name: x.variantProductName, value: x.variantProductName };
        });

      const materials = res
        ?.filter((v) => v.variantProductType === "material")
        .map((x) => x.variantProductName);

      setColors(colors);
      setActiveColor(colors[0].value);
      setMaterials(materials);
    });
  }, []);

  useEffect(() => {
    getProductById(id).then((res) => {
      setProduct(res);
      setVariants(res.variants);
      setVariant(res.variants[0]);
    });
  }, [id]);

  // get comments from product id
  // useEffect(() => {
  //   getCommentByProductId(id).then((res) => {
  //     console.log("Comments: ", res);
  //   });
  // }, [id]);

  const handleVariantChange = (color, material) => {
    console.log(color, material);
    setActiveColor(color);

    if (!material) {
      let variantHasColor = variants.find((variant) => variant.color === color);

      console.log(variantHasColor, "hasColor");

      if (variantHasColor) {
        setVariant(variantHasColor);
        setMaterial(variantHasColor.material);
        return;
      }
    }

    // const selectedColor = colors.find((x) => x.id === color);
    // if (!selectedColor) {
    //   console.error(`Color with id ${} not found`);
    //   return;
    // }

    const newVariant = variants.find(
      (variant) => variant.color === color && variant.material === material
    );

    if (!newVariant) {
      console.error(
        `Variant with color ${color} and material ${material} not found`
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
    addCart(cartData);
    message.success(`Thêm thành công ${product.name} vào giỏ hàng`);
  };

  const addToWhistlist = () => {
    addWhistlist(product);
    message.success(`Thêm thành công ${product.name} vào danh sách yêu thích`);
  };

  const availableColors = colorsArr.filter((color) =>
    variants.some((variant) => variant.color === color.value)
  );

  console.log("color", activeColor);

  const availableMaterials = variants
    .filter((variant) => variant.color === activeColor)
    .map((variant) => variant.material);

  return (
    <div className="container mt-[80px]">
      <div className="flex justify-between gap-[30px]">
        <div>
          <img
            src={`${product.image}`}
            alt="product image"
            style={{ width: 900 }}
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
          <div className="mt-3 mr-3 text-lg text-brown-light font-semibold">
            Số lượng: {variant?.quantity}
          </div>
          <div className="mt-3 text-lg text-brown-light line-through font-semibold">
            Giá gốc: {variant?.price} ₫
          </div>
          <div className="mt-3 text-3xl font-bold text-red-600">
            Giá: {variant?.price} ₫
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
          {availableColors.length > 0 && (
            <div className="mt-5">
              <label
                htmlFor="material"
                className="text-lg font-semibold text-brown-strong"
              >
                Màu sắc:{" "}
              </label>
              <select
                id="color"
                className="border border-brown-strong outline-none py-1 px-2 rounded-lg"
                value={variant.color}
                onChange={(e) => handleVariantChange(e.target.value, null)}
              >
                {availableColors.map((color, index) => (
                  <option key={color.name} value={color.name}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
          )}
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
          <div className="mt-5 ">
            <label
              htmlFor="quantity"
              className="text-lg mr-2 font-semibold text-brown-strong"
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
            <div
              onClick={addToWhistlist}
              className="bg-brown-light text-brown-strong flex items-center justify-center gap-1 py-4 rounded-lg text-xl font-bold duration-200 border-2 hover:bg-white hover:border-brown-strong hover:border-2"
            >
              <i className="fa-solid fa-heart text-xl mr-1 hover:text-red-600 duration-200"></i>{" "}
              Thêm vào danh sách yêu thích
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
        </div>
      </div>
      <ProductComment id={id} />
    </div>
  );
};

export default ProductDetail;
