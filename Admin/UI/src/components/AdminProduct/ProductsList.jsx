import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useProductQuery from "../../../hooks/useProduct/useProductQuery";
import useProductMutation from "../../../hooks/useProduct/useProductMutation";

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useProductQuery();

  const { mutate } = useProductMutation({
    action: "DELETE",
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = data?.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.poster.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function getCategoryName(category) {
    switch (category) {
      case "6680ea09e3bc7aff81782c33":
        return "Thể thao";
      case "6680ea16e3bc7aff81782c39":
        return "Giải trí";
      case "6680ea1ee3bc7aff81782c3f":
        return "Xã hội";
      case "6680ea2ee3bc7aff81782c46":
        return "Pháp luật";
      case "6680ea4ee3bc7aff81782c57":
        return "Bóng đá";
      // case "6687eaf5ca78d813ed821cbc":
      //   return "Học tiếng anh";
      // case "6687eafbca78d813ed821cc3":
      //   return "Giáo dục 4.0";
      default:
        return "Đang cập nhật";
    }
  }
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Lỗi rồi</div>;
  return (
    <div className="">
      <div className="flex mt-3 justify-between">
        <h1 className=" font-semibold text-2xl">List Product</h1>
        <NavLink
          className="px-4 py-2 border rounded text-white bg-blue-600 border-solid hover:bg-blue-700"
          to={"/admin/product/add"}
        >
          <strong>+ Add Product</strong>
        </NavLink>
      </div>
      <div className="w-[300px]">
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="mt-3 block rounded-md border border-gray-200 px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div className="overflow-x-auto mt-3">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Poster
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Category
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Description
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredProducts?.map((product, index) => {
              return (
                <>
                  <tr key={index}>
                    <td className="px-4 py-2 font-medium text-gray-900">
                      {product.title}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {product.poster}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {getCategoryName(product.category)}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      <img
                        className="w-[110px] h-[50px]"
                        src={product.image}
                        alt=""
                        width={150}
                      />
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {product.description}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      <Link to={`/admin/product/update/${product._id}`}>
                        <button
                          type="button"
                          className="mr-3 text-[15px] bg-blue-500 hover:bg-blue-700 text-white py-1 px-[17px] rounded 
                   focus:outline-none focus:shadow-outline"
                        >
                          {" "}
                          Edit{" "}
                        </button>
                      </Link>

                      <button
                        type="button"
                        className="btn_delete text-[15px] bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded 
               focus:outline-none focus:shadow-outline"
                        onClick={() => {
                          mutate(product);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          className="text-white px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-md m-4"
          type="button"
        >
          Prev page
        </button>
        <button
          className="text-white px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-md my-4"
          type="button"
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default AdminProducts;
