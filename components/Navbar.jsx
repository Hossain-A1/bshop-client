"use client";
import { FaListUl } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { BiCart } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaUndo,
  FaSignOutAlt,
} from "react-icons/fa"; // Icons for dropdown
import Link from "next/link";
import { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Login from "./ui/Login";
import CategoriesModal from "./CategoriesModal";
import LoginOverlay from "./LoginOverlay";
import { handleGetUser } from "@/libs";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [openCtg, setOpenCtg] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  const pcNavList = [
    { label: "Leather items", href: "/leather-items" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "New Arrivals", href: "/new-arrivals" },
  ];

  const handleNavigate = () => {
    if (cartItems.length <= 0 && !token) {
      setOpenModal(true);
    } else {
      router.push("/cart");
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        setToken(token);

        if (token) {
          const user = await handleGetUser(token);
          setUser(user?.email);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <nav>
      <div className='flex items-center justify-between border-b py-3 sm:gap-3 gap-2'>
        <Link
          onClick={() => setOpenCtg(false)}
          href='/'
          className='sm:text-3xl text-lg font-semibold uppercase'
        >
          B.Shop
        </Link>

        <div className='sm:max-w-4xl 2xl:w-full lg:flex items-center gap-3 2xl:gap-10'>
          {pcNavList.map((list, i) => (
            <Link
              onClick={() => setOpenCtg(false)}
              key={i}
              className='max-lg:hidden sm:w-auto whitespace-nowrap font-medium text-[1rem]'
              href={list.href}
            >
              {list.label}
            </Link>
          ))}
          <div
            onMouseEnter={() => setOpenCtg(true)}
            className='flex items-center'
          >
            <p className='max-lg:hidden sm:w-auto font-medium text-[1rem] cursor-pointer'>
              Categories
            </p>
            <p>
              <MdOutlineKeyboardArrowDown
                className={`max-lg:hidden h-6 text-xl mt-1 ${
                  openCtg && "rotate-180 duration-500"
                }`}
              />
            </p>
          </div>
        </div>

        <div className='flex justify-between items-center sm:gap-5 gap-3 w-full'>
          <span className='w-full 2xl:w-[60rem] flex items-center gap-1 sm:p-2 p-1 border-2 focus:border-black rounded-full'>
            <CiSearch className='text-gray-500 font-semibold text-lg' />
            <input
              className='outline-none border-none sm:text-sm text-xs w-full'
              type='search'
              placeholder='Search here'
            />
          </span>

          <span>
            <FaListUl
              onClick={() => setOpenCtg(true)}
              className='lg:hidden text-xl cursor-pointer'
            />
            {openCtg && (
              <CategoriesModal openCtg={openCtg} setOpenCtg={setOpenCtg} />
            )}
          </span>

          {token ? (
            <span className='flex flex-col items-center cursor-pointer relative group'>
              <p className='hidden lg:block text-sm text-org'>{user}</p>
              <p className='text-sm font-medium hover:text-green-800 duration-300'>
                Orders & Account
              </p>

              {/* Dropdown Menu */}

              <div className='absolute hidden group-hover:block top-full mt-2 w-48 bg-white shadow-lg border border-gray-200 z-50 rounded'>
                {/* Pointer (Arrow) Above the Dropdown */}
                <div className='absolute -top-2 right-1/2 translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200'></div>

                <ul className='py-2'>
                  <li className='px-4 py-2 hover:bg-gray-100 flex items-center gap-2'>
                    <FaUser className='text-gray-600' />
                    Manage My Account
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 flex items-center gap-2'>
                    <FaShoppingBag className='text-gray-600' />
                    My Orders
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 flex items-center gap-2'>
                    <FaHeart className='text-gray-600' />
                    My Wishlist & Followed Stores
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 flex items-center gap-2'>
                    <FaStar className='text-gray-600' />
                    My Reviews
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 flex items-center gap-2'>
                    <FaUndo className='text-gray-600' />
                    My Returns & Cancellations
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 flex items-center gap-2'>
                    <FaSignOutAlt className='text-gray-600' />
                    Logout
                  </li>
                </ul>
              </div>
            </span>
          ) : (
            <span onClick={handleOpenModal}>
              <FaRegUser className='text-xl' />
            </span>
          )}

          <div onClick={handleNavigate} className='relative'>
            <p className='absolute -top-4 right-4 font-bold text-red-600 sm:text-sm text-xs bg-gray-200 py-0.5 px-1 rounded-full'>
              {cartItems.length}
            </p>
            <BiCart className='text-xl' />
          </div>
        </div>
      </div>

      <section>
        {openCtg && <Overlay setOpenCtg={setOpenCtg} />}
        {openModal && (
          <>
            <LoginOverlay setOpenModal={setOpenModal} />
            <Login
              setOpenModal={setOpenModal}
              setToken={setToken}
              setUser={setUser}
            />
          </>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
