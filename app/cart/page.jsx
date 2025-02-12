"use client";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/features/cart/cartSlice";

const CartPage = () => {
  const { cartItems = [] } = useSelector((state) => state.cart);
  console.log(cartItems);
  const dispatch = useDispatch();

  const removeFromCartHandler = (cartItems) => {
    dispatch(removeFromCart({
      _id: cartItems._id,
      selectedSize: cartItems.selectedSize,
      selectedColor: cartItems.selectedColor
    }));
  };
  

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left: Product List */}
        <div className="p-4 space-y-4 lg:w-3/4 w-full max-h-[75vh] overflow-y-auto hidden-scroll">
          {/* Header */}
          <div className="border-b pb-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Cart</h2>
            <span className="text-green-600 text-sm">Free shipping special for you</span>
          </div>

          {/* Cart Items */}
          {cartItems.length>0 && cartItems.map((item) => (
            <div
            key={`${item._id}-${item.selectedSize}-${item.selectedColor.name}`}
              className="flex flex-col sm:flex-row items-center sm:justify-between border-b pb-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.images}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="object-cover rounded-md"
                />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-gray-600 text-xs">Color: {item.selectedColor?.name}</p>
                  <p className="text-gray-600 text-xs">Size: {item.selectedSize}</p>
                  <p className="text-orange-500 text-sm font-semibold">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">Qty: {item.quantity}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCartHandler(item)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="p-4 lg:w-1/4 w-full border rounded-md shadow-md sticky top-4 bg-white">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Items:</span>
            <span>{cartItems&& cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>
              $
              {cartItems&& cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </span>
          </div>
          <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 mt-4">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
