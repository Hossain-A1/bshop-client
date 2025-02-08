"use client";
import Image from "next/image";
import React, { useState } from "react";

const ProductUI = ({
  setViewPicture,
  colors = [],
  sizes = [],
  colorImages = [],
}) => {
  // Initialize state safely with fallback values
  const [selectedColor, setSelectedColor] = useState(colorImages.length >0? colors[0] : "");
  const [selectedSize, setSelectedSize] = useState(
    sizes.length > 0 ? sizes[0] : ""
  );
  const [quantity, setQuantity] = useState(1);

  // Handle Color Selection
  const handleColorSelect = (color, index) => {
    setSelectedColor(color);
    // Update main image preview if colorImages exist
    if (colorImages.length > index) {
      setViewPicture(colorImages[index]);
    }
  };

  return (
    <div className='border-2 border-org rounded-lg shadow-md '>
      {/* Sale Banner */}
      <div className='bg-bg_org text-white flex justify-between items-center px-3 py-2'>
        <span className='font-bold'>Big Sale</span>
        <div className='flex items-center gap-2'>
          <span>Ends in</span>
          <span className='font-mono text-lg'>7 days</span>
        </div>
      </div>

      <div className='p-3'>
        {/* Product Colors */}
        {colors.length > 0 && (
          <div className=''>
            <h3 className='text-lg font-semibold mb-3'>
              Color: ({selectedColor})
            </h3>
            <div className='overflow-x-scroll hidden-scroll flex items-center gap-2 sm:gap-4'>
              {colors.map((color, i) => (
                <div
                  key={i}
                  className={`border-2 lg:h-36 flex flex-col justify-between rounded-md cursor-pointer ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => handleColorSelect(color, i)}
                >
                  <figure className='w-16 h-16 sm:w-24 sm:h-20 lg:h-28 overflow-hidden'>
                    <Image
                      className='rounded-tl-md rounded-tr-md h-full w-full object-cover'
                      src={colorImages[i]}
                      alt={color}
                      width={280}
                      height={280}
                    />
                  </figure>
                  <p
                    className={`text-center text-sm mb-1 mt-1 ${
                      selectedColor === color ? "font-bold text-[#0A8800]" : ""
                    }`}
                  >
                    {color}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className='space-y-2  mt-4'>
            <b>Sizes:</b>
            <div className='flex items-center gap-3 overflow-x-scroll hidden-scroll'>
              {sizes.map((size, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-full border-2 font-semibold cursor-pointer px-3 py-1 ${
                    selectedSize === size ? "border-org" : "border-gray-500"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className='p-2 flex gap-2 items-center mt-4'>
          <label htmlFor='quantity' className='text-sm font-medium'>
            Qty
          </label>
          <select
            id='quantity'
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className='border rounded-md px-4 py-1'
          >
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductUI;
