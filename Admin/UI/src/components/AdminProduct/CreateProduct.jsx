import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProductCreate } from "../../../services/product";
import useCategoryQuery from "../../../hooks/useCategory/useCategoryQuery";
import MDEditor from "@uiw/react-md-editor";
import { uploadFile } from "../../../lib/utils";

const CreateProduct = () => {
  const [post, setPost] = useState("");
  const queryClient = useQueryClient();
  const { data } = useCategoryQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [gallery, setGallery] = useState([]);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (product) => {
      const form = await ProductCreate(product);
      return form;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PRODUCT_KEY"],
      });
    },
    onError: (error) => {
      console.error("Failed to add product:", error);
    },
  });
  const onSubmit = async (product) => {
    mutate({ ...product, gallery, image, description: post });
    navigate("/admin/products");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        id="add-form"
      >
        <div className="min-h-screen p-6 z-40 flex items-center justify-center ml-12">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Create Product</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="email">Title</label>
                        <input
                          type="text"
                          {...register("title")}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="email">Poster</label>
                        <input
                          type="text"
                          {...register("poster")}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="email">GALLERY</label>
                        <input
                          type="file"
                          multiple
                          {...register("gallery", { required: true })}
                          id="productGallery"
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-[15px]"
                          onChange={async (e) => {
                            const files = Array.from(e.target.files);

                            const result = await Promise.all(
                              files.map((file) => uploadFile(file))
                            );

                            setGallery(result.map((item) => item?.url));
                          }}
                        />
                        <div>
                          {gallery.map((item, index) => (
                            <img
                              key={index}
                              src={item}
                              alt={item}
                              width={100}
                              height={100}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="email">Image</label>
                        <input
                          type="file"
                          {...register("image", { required: true })}
                          id="productImage"
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-[15px]"
                          onChange={async (e) => {
                            const files = Array.from(e.target.files);
                            const result = await Promise.all(
                              files.map((file) => uploadFile(file))
                            );

                            console.log(result);
                            setImage(result[0]?.url);
                          }}
                        />
                        <img src={image} alt={image} width={100} height={100} />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="email">CATEGORY</label>
                        <select id="cars" {...register("category")}>
                          {data?.map((item, index) => (
                            <option value={item._id} key={index}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="email">Description</label>
                        <textarea
                          value={post}
                          {...register("description", {
                            onChange: (e) => setPost(e.target.value),
                          })}
                          className="h-28 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-5" data-color-mode="light">
                        <MDEditor
                          value={post}
                          onChange={(value) => setPost(value)}
                        />
                        <MDEditor.Markdown
                          source={post}
                          style={{ whiteSpace: "pre-wrap" }}
                        />
                      </div>
                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;