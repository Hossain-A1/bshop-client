"use client";
import { add_product } from "@/features/product/productSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddProductPage = () => {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector(
    (state) => state.product
  );

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    sold: 0,
    stock: 0,
    discount: 0,
    category: "",
    brand: "",
    price: 0,
    sizes: [],
    color: [],
    images: [],
    colorImages: [],
  });

  const [imagePaths, setImagePaths] = useState([]); // To store image paths for display
  const [colorImagePaths, setColorImagePaths] = useState([]); // To store color image paths for display

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const newFiles = Array.from(e.target.files); // Get newly selected files

    // Append new files to existing files
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ...newFiles],
    }));

    // Update file paths for display
    const filePaths = newFiles.map((file) => file.name);
    if (field === "images") {
      setImagePaths((prev) => [...prev, ...filePaths]);
    } else if (field === "colorImages") {
      setColorImagePaths((prev) => [...prev, ...filePaths]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = dispatch(add_product(formData)).unwrap();
    if (result.success) {
      setFormData({
        title: "",
        desc: "",
        sold: 0,
        stock: 0,
        discount: 0,
        category: "",
        brand: "",
        price: 0,
        sizes: [],
        color: [],
        images: [],
        colorImages: [],
      });
      setImagePaths([]); // Clear image paths
      setColorImagePaths([]); // Clear color image paths
    }
  };

  return (
    <div className='min-h-screen  w-full '>
      <div className='w-full bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center mb-8'>Add New Product</h1>

        {/* Backend Response Messages */}
        {successMessage && (
          <p className='text-green-700 text-center mb-6'>{successMessage}</p>
        )}
        {error && (
          <p className='text-red-700 text-center mb-6'>{error}</p>
        )}

        {/* Product Form */}
        <form onSubmit={handleSubmit} className='w-full'>
          <div className='w-full flex flex-col md:flex-row gap-3 items-center'>
            <div className='lg:spacy-6 space-y-3 w-full'>
              {/* Title */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {/* Description */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <textarea
                  name='desc'
                  value={formData.desc}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {/* Stock */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Stock
                </label>
                <input
                  type='number'
                  name='stock'
                  value={formData.stock}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              {/* Sold */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Sold
                </label>
                <input
                  type='number'
                  name='sold'
                  value={formData.sold}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {/* Price */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Price
                </label>
                <input
                  type='number'
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {/* Discount */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Discount
                </label>
                <input
                  type='number'
                  name='discount'
                  value={formData.discount}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            <div className='lg:spacy-6 space-y-3 w-full'>
              {/* Category */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Category
                </label>
                <input
                  type='text'
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {/* Brand */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Brand
                </label>
                <input
                  type='text'
                  name='brand'
                  value={formData.brand}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {/* Sizes */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Sizes (comma-separated)
                </label>
                <input
                  type='text'
                  name='sizes'
                  value={formData.sizes.join(",")}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sizes: e.target.value.split(","),
                    }))
                  }
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {/* Colors */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Colors (comma-separated)
                </label>
                <input
                  type='text'
                  name='color'
                  value={formData.color.join(",")}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      color: e.target.value.split(","),
                    }))
                  }
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {/* Images Upload */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Product Images
                </label>
                <input
                  type='file'
                  name='images'
                  onChange={(e) => handleFileChange(e, "images")}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                  multiple
                />
                {/* Display selected image paths */}
                {imagePaths.length > 0 && (
                  <p className='mt-2 text-sm text-gray-600'>
                    Selected Images: {imagePaths.join(", ")}
                  </p>
                )}
              </div>

              {/* Color Images Upload */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Color Images
                </label>
                <input
                  type='file'
                  name='colorImages'
                  onChange={(e) => handleFileChange(e, "colorImages")}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                  multiple
                />
                {/* Display selected color image paths */}
                {colorImagePaths.length > 0 && (
                  <div className='mt-2 text-sm text-gray-600'>
                    Selected Color Images: {colorImagePaths.join(", ")}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className='mt-3 md:mt-6'>
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
