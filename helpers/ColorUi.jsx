"use client";
import { addToCart } from "@/features/cart/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ProductUI = ({
  product = {},
  setViewPicture,
  colors = [],
  sizes = [],
  colorImages = [],
  stock = 0,
}) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleColorSelect = (color, index) => {
    setSelectedColor({ name: color, index }); // Store both name and index
    setError("");
    setViewPicture(colorImages[index]);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setError(""); // Clear error on valid selection
  };

  const handleAddToCart = () => {

    
    if (!selectedColor || (sizes.length > 0 && !selectedSize)) {
      setError(`Please select color ${sizes.length > 0 ?"and size" : ""}.`);
      return;
    }

    const cartData = {
      _id: product._id,
      title: product.title,
      price: product.price,
      images: colorImages[selectedColor.index],
      selectedColor,
      selectedSize,
      quantity,
    };

    // ✅ Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ✅ Check if the item already exists
    const existingItemIndex = cart.findIndex(
      (item) =>
        item._id === cartData._id &&
        item.selectedSize === cartData.selectedSize &&
        item.selectedColor.name === cartData.selectedColor.name
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity; // Increment quantity
    } else {
      cart.push(cartData);
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Store updated cart

    dispatch(addToCart(cartData)); // ✅ Dispatch to Redux

    router.push("/cart"); // ✅ Redirect to cart page
  };

  return (
    <div>
      <div className='border-2 border-org rounded-lg shadow-md'>
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
            <div>
              <h3 className='text-lg font-semibold mb-3'>
                Color:{" "}
                {selectedColor?.name
                  ? `(${selectedColor?.name})`
                  : "(Please Select)"}
              </h3>
              <div className='overflow-x-scroll hidden-scroll flex items-center gap-2 sm:gap-4'>
                {colors.map((color, i) => (
                  <div
                    key={i}
                    className={`border-2 lg:h-36 flex flex-col justify-between rounded-md cursor-pointer ${
                      selectedColor?.name === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleColorSelect(color, i)}
                  >
                    <figure className='w-16 h-16 sm:w-24 sm:h-20 lg:h-28 overflow-hidden'>
                      <Image
                        className='rounded-tl-md rounded-tr-md h-full w-full object-fill'
                        priority
                        src={colorImages[i]}
                        alt={color}
                        width={280}
                        height={280}
                      />
                    </figure>
                    <p
                      className={`text-center text-sm mb-1 mt-1 ${
                        selectedColor === color
                          ? "font-bold text-[#0A8800]"
                          : ""
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
            <div className='space-y-2 mt-4'>
              <b>
                Sizes: {selectedSize ? `(${selectedSize})` : "(Please Select)"}
              </b>
              <div className='flex items-center gap-3 overflow-x-scroll hidden-scroll'>
                {sizes.map((size, i) => (
                  <span
                    key={i}
                    onClick={() => handleSizeSelect(size)}
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

          {/* Error Message */}
          {error && <p className='text-red-500 mt-2 animate-bounce'>{error}</p>}
        </div>
      </div>

      <div className='my-4'>
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`px-6 py-3 rounded-full w-full text-white font-medium text-center ${
            stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductUI;
