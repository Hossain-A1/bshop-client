"use client";
import { FaListUl } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { BiCart } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
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
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Login from "./ui/Login";
import CategoriesModal from "./CategoriesModal";
import LoginOverlay from "./LoginOverlay";
import { logout } from "@/features/auth/authSlice";
import {
  fetchAllProducts,
  resetSearchResults,
  setSearchQuery,
} from "@/features/product/productSlice";

const Navbar = ({ children }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { auth, token } = useSelector((state) => state.auth);
  const { searchQuery } = useSelector((state) => state.product);
  const [openCtg, setOpenCtg] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const path = usePathname();
  const blockList = [
    "/admin",
    "/admin/orders",
    "/admin/add",
    "/admin/dashboard",
  ];
  console.log(token);
  const match = blockList.includes(path);

  if (match) return <div>{children}</div>;

  const pcNavList = [
    { label: "Leather items", href: "/leather-items" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "New Arrivals", href: "/new-arrivals" },
  ];

  const handleNavigate = () => {
    if (cartItems.length <= 0 && !auth) {
      setOpenModal(true);
    } else {
      router.push("/cart");
      setOpenCtg(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(fetchAllProducts({ search: searchQuery }));
      router.push("/products");
    }
    if (openCtg) {
      setOpenCtg(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.refresh();
  };

  useEffect(() => {
    // Clear search query when leaving /products page
    if (path !== "/products") {
      dispatch(fetchAllProducts({ search: "" }));
      dispatch(resetSearchResults());
      dispatch(setSearchQuery(""));
    }
  }, [path]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <nav>
      <div className='flex items-center justify-between border-b py-3 sm:gap-3 gap-1'>
        <Link
          onClick={() => setOpenCtg(false)}
          href='/'
          className='sm:text-3xl text-lg font-semibold uppercase'
        >
          E/U
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

        <div className='flex justify-between items-center sm:gap-5 gap-1.5 w-full'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className='relative h-full w-full 2xl:w-[60rem] flex items-center gap-1 sm:p-2.5 p-1 border-2 rounded-full focus-within:border-org/70'
          >
            <input
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className='outline-none border-none sm:text-sm text-xs w-full mr-4 md:mr-7'
              type='search'
              placeholder='Search here..'
            />
            <button
              type='submit'
              className='absolute flex justify-center items-center cursor-pointer border-none rounded-r-full p-1 md:p-2 h-full bg-org/50 hover:bg-org/70 transition-all right-0'
            >
              <BsSearch className='font-bold text-sm sm:text-xl text-gray-700' />
            </button>
          </form>

          <span>
            <FaListUl
              onClick={() => setOpenCtg(true)}
              className='lg:hidden text-xl cursor-pointer'
            />
            {openCtg && (
              <CategoriesModal openCtg={openCtg} setOpenCtg={setOpenCtg} />
            )}
          </span>

          {auth ? (
            <span className='flex flex-col items-center cursor-pointer relative group'>
              <p className='hidden lg:block text-sm text-org'>{auth?.email}</p>
              <p className='text-xs sm:text-sm font-medium hover:text-green-800 duration-300'>
                Orders & Account
              </p>

              {/* Dropdown Menu */}

              <div className='absolute hidden group-hover:block top-full mt-2 w-48 bg-white shadow-lg border border-gray-200 z-50 rounded'>
                {/* Pointer (Arrow) Above the Dropdown */}
                <div className='absolute -top-2 right-1/2 translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200'></div>

                <ul className='py-2'>
                  <li
                    onClick={() => router.push("/profile")}
                    className='px-4 py-2 hover:bg-gray-100 flex items-center gap-2'
                  >
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
                  <li
                    onClick={handleLogout}
                    className='px-4 py-2 hover:bg-gray-100 flex items-center gap-2'
                  >
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

          <div onClick={handleNavigate} className='relative cursor-pointer'>
            <p className='absolute w-4 h-4 flex justify-center items-center text-center -top-3 right-3 font-medium text-red-600 sm:text-sm text-xs bg-gray-200   rounded-full'>
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
            <Login setOpenModal={setOpenModal} />
          </>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
