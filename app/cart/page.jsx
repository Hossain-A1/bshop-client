import React from "react";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import ProductItem from "@/components/ProductItem/ProductItem";

const CartPage = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="flex max-sm:flex-col gap-3 sm:gap-4 justify-between w-full relative">
        {/* Left: Product List */}
        <div className="p-4 space-y-4 lg:w-3/4 w-full overflow-y-scroll hidden-scroll max-h-[calc(100vh-4rem)] pr-4">
          {/* Header */}
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Cart</h2>
            <span className="text-green-600 text-sm">
              Free shipping special for you
            </span>
          </div>

          {/* Item 1 */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center">
              <Image
                src="/path-to-image.jpg"
                alt="Product"
                width={80}
                height={80}
                className="object-cover rounded-md"
              />
              <div className="ml-4">
                <p className="text-sm font-medium">
                  1pc Large Capacity Travel Backpack
                </p>
                <p className="text-gray-600 text-xs">Blue</p>
                <p className="text-orange-500 text-sm font-semibold">
                  SAR26.68{" "}
                  <span className="line-through text-gray-400">60.49</span> -55%
                </p>
                <p className="text-red-500 text-xs">ALMOST SOLD OUT</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select className="border rounded-md p-1">
                <option value="1">Qty 1</option>
                <option value="2">Qty 2</option>
              </select>
              <button className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center">
              <Image
                src="/path-to-image.jpg"
                alt="Product"
                width={80}
                height={80}
                className="object-cover rounded-md"
              />
              <div className="ml-4">
                <p className="text-sm font-medium">
                  3pcs Enamel Home Kitchen Soup Pot
                </p>
                <p className="text-gray-600 text-xs">
                  16/18/20 Blue Hemp Dot Set Pot
                </p>
                <p className="text-orange-500 text-sm font-semibold">
                  SAR132.79{" "}
                  <span className="line-through text-gray-400">187.79</span>{" "}
                  -29%
                </p>
                <p className="text-red-500 text-xs">May sell out tomorrow</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select className="border rounded-md p-1">
                <option value="1">Qty 1</option>
                <option value="2">Qty 2</option>
              </select>
              <button className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          </div>

          {/* Explore Section */}
          <div className="hidden lg:block py-2 overflow-hidden">
            <h2 className="font-medium text-lg sm:text-xl">Explore B.shop picks</h2>
            <ProductItem />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="p-4  lg:w-1/4 w-full lg:sticky top-0">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Item(s) total:</span>
            <span>SAR464.77</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Item(s) discount:</span>
            <span className="text-red-500">-SAR198.85</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>SAR265.92</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            4 interest-free installments of SAR66.48 with{" "}
            <span className="text-blue-500">Tabby</span> or{" "}
            <span className="text-blue-500">Tamara</span>
          </p>

          {/* Buttons */}
          <div className="mt-4">
            <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 mb-2">
              3 almost sold out - Checkout (3)
            </button>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2">
              <span>Express checkout with</span>
              <Image
                src="/paypal-logo.png"
                alt="PayPal"
                width={50}
                height={20}
              />
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            You will not be charged until you review this order on the next page
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
