"use client";
import Image from "next/image";
import React, { useState } from "react";

const ProductUI = ({ setViewPicture }) => {
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [selectedSize, setSelectedSize] = useState("X");
  const [quantity, setQuantity] = useState(1);

  const colors = [
    {
      id: 1,
      name: "Red",
      value: "Red",
      image:
        "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "Blue",
      value: "Blue",
      image:
        "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Black",
      value: "Black",
      image:
        "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      name: "Grey",
      value: "Grey",
      image:
        "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      name: "Dark",
      value: "Dark",
      image:
        "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 6,
      name: "Dark",
      value: "Dark",
      image:
        "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 7,
      name: "Dark",
      value: "Dark",
      image:
        "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const sizes = [
    { _id: 1, size: "M" },
    { _id: 2, size: "L" },
    { _id: 3, size: "XL" },
    { _id: 4, size: "XXL" },
    { _id: 5, size: "XXXL" },
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className='  border-2 border-gray-700   rounded-lg shadow-md'>
      {/* Sale Banner */}
      <div className='bg-bg_org text-white  rounded-t-lg flex justify-between items-center'>
        <span className='px-3 font-bold'>Big Sale</span>
        <div className='flex items-center gap-2 px-3'>
          <span>Ends in</span>
          <span className='font-mono text-lg'>7 days</span>
        </div>
      </div>

      {/* Product Colors */}
      <div className='p-2  mt-2'>
        <h3 className='text-lg font-semibold mb-3'>Color: {selectedColor}</h3>
        <div className='overflow-x-scroll hidden-scroll flex  items-center  sm:gap-4 gap-1 '>
          {colors.map((color) => (
            <div
              key={color.id}
              className={`border-2 lg:h-36 w-full flex flex-col justify-between p-1   sm:p-2 rounded-lg cursor-pointer   ${
                selectedColor === color.value
                  ? "border-black"
                  : "border-gray-300"
              }`}
              onClick={() => {
                handleColorSelect(color.value), setViewPicture(color.image);
              }}
            >
        <figure className="w-24 h-20 lg:h-28  overflow-hidden">
        <Image
                className='rounded-md  h-20 sm:h-40  object-cover'
                src={color.image}
                alt={color.name}
                width={280}
                height={280}
              />
        </figure>
              <p
                className={`text-center text-sm h-4  mt-1 ${
                  selectedColor === color.value
                    ? "font-bold text-[#0A8800]"
                    : ""
                }`}
              >
                {color.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* --Size--- */}
      <div className='space-y-2 px-3 '>
        <b>Size:</b>
        <div className='flex items-center gap-3 overflow-x-scroll hidden-scroll'>
          {sizes.map((size) => (
            <span
              key={size._id}
              onClick={() => setSelectedSize(size.size)}
              className={`rounded-full border-2 font-semibold cursor-pointer border-gray-500 px-3 py-1 ${
                selectedSize === size.size ? "border-org" : ""
              }
                 `}
            >
              {size.size}
            </span>
          ))}
        </div>
      </div>

      {/* Quantity and Add Button */}
      <div className='p-2 flex items-center justify-between mt-2'>
        <div className='flex items-center gap-2 px-3'>
          <label htmlFor='quantity' className='text-sm font-medium'>
            Qty
          </label>
          <select
            id='quantity'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border  rounded-md p-1'
          >
            {[...Array(100)].map((_, index) => (
              <option
                className='font-semibold'
                key={index + 1}
                value={index + 1}
              >
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button className='bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600'>
          Added
        </button>
      </div>
    </div>
  );
};

export default ProductUI;
