"use client";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/features/cart/cartSlice";
import Link from "next/link";
import { getTotalAmount, getTotalItems } from "@/utils";

const CartPage = () => {
  const { cartItems = [] } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (cartItems) => {
    dispatch(
      removeFromCart({
        _id: cartItems._id,
        selectedSize: cartItems.selectedSize,
        selectedColor: cartItems.selectedColor,
      })
    );
  };

  return (
    <>
    {
      cartItems.length>0 ?<div className='min-h-screen p-1 md:p-4'>
      <div className='flex flex-col lg:flex-row gap-6 lg:gap-10'>
        {/* Left: Product List */}
        <div className='p-1 space-y-4 w-full lg:flex-[2] max-h-[75vh] overflow-y-auto hidden-scroll'>
          {/* Header */}
          <div className='border-b pb-3 flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Cart</h2>
            <span className='text-green-600 text-sm'>
              Free shipping special for you
            </span>
          </div>

          {/* Cart Items */}
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <div
                key={`${item._id}-${item.selectedSize}-${item.selectedColor.name}`}
                className='flex flex-col sm:flex-row items justify-between border-b pb-4 gap-4'
              >
                <div className='flex items-start  gap-4 '>
                  <figure className='overflow-hidden h-20 w-20'>
                    <Image
                      src={item.images}
                      alt={item.title}
                      width={80}
                      height={80}
                      className='object-cover h-full w-full rounded-md'
                    />
                  </figure>
                  <div className=''>
                    <p className='text-sm font-medium'>{item.title}</p>
                    <p className='text-gray-600 text-xs'>
                      Color: {item.selectedColor?.name}
                    </p>
                    {item.selectedSize && (
                      <p className='text-gray-600 text-xs'>
                        Size: {item.selectedSize}
                      </p>
                    )}
                    <p className='text-orange-500 text-sm font-semibold'>
                      ${item.price}
                    </p>
                  </div>
                </div>
                <div className='flex  items-center  gap-4'>
                  <span className='text-sm'>Qty: {item.quantity}</span>
                  <button
                    className='text-red-500  hover:text-red-700'
                    onClick={() => removeFromCartHandler(item)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Right: Order Summary */}
        <div className='flex flex-col w-full lg:flex-[1]'>
          <div className='p-4 w-full border rounded-md shadow-md sticky top-4 bg-white'>
            <div className='w-full'>
              <h2 className='font-semibold text-lg mb-4'>Order Summary</h2>
              <div className='flex justify-between mb-2'>
                <span className='text-gray-600'>Total Items:</span>
                <span>{getTotalItems(cartItems)}</span>
              </div>
              <div className='flex justify-between font-semibold text-lg'>
                <span>Total:</span>
                <span>${cartItems && getTotalAmount(cartItems)}</span>
              </div>
              <Link
                href='/place-order'
                className='w-full block text-center bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 mt-4'
              >
                Checkout
              </Link>
            </div>
          </div>

          {/* WhatsApp & Payment Info */}
          <div className='w-full mt-4'>
            <Link
              className='block w-full text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600'
              href='https://wa.me/966501747626'
              target='_blank'
              rel='noopener noreferrer'
            >
              Chat on WhatsApp
            </Link>

            <div className='mt-4 p-2 border rounded-md bg-gray-100'>
              <div className='mb-2'>
                <span className='font-semibold text-2xl'>Bkash:</span>
                <p className='text-2xl sm:text-4xl font-semibold'>
                  01798681123
                </p>
              </div>
              <div>
                <span className='font-semibold text-2xl'>Nagad:</span>
                <p className='font-semibold text-2xl sm:text-4xl'>
                  01798681123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>:<div className="flex flex-col gap-2 justify-center items-center md:mt-20 mt-10">
      <p className=" text-xl md:text-3xl font-medium">Your cart is empty!</p>
      <Link href='/' className="text-sm text-green-500 p-2 border shadow-md rounded">Go to Products Page</Link>
    </div>
    }
    </>
  );
};

export default CartPage;
