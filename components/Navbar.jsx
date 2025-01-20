"use client";
import { FaListUl } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { BiCart } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Link from "next/link";
import CategoriesModal from "./CategoriesModal";
import { useState } from "react";
import Overlay from "./Overlay";
const Navbar = () => {
  const [openCtg, setOpenCtg] = useState(false);
  const pcNavList = [
    { label: "Leather items", href: "/leather-items" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "New Arrivals", href: "/new-arrivals" },
  ];

  return (
    <nav>
      <div className='flex  items-center justify-between border-b py-3 sm:gap-3 gap-2'>
        {/* <img width={70} src={assets.logo} alt='logo' /> */}
        <Link
          onClick={() => setOpenCtg(false)}
          href='/'
          className='sm:text-3xl text-lg font-semibold uppercase'
        >
          B.Shop
        </Link>

        <div className=' sm:max-w-4xl 2xl:w-full lg:flex items-center  gap-3 2xl:gap-10'>
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
            className='flex items-center '
          >
            <p className='max-lg:hidden sm:w-auto font-medium text-[1rem] cursor-pointer'>
              Categories
            </p>
            <p>
              <MdOutlineKeyboardArrowDown
                className={`max-lg:hidden h-6 text-xl mt-1 ${
                  openCtg && "rotate-180 duration-500"
                } `}
              />
            </p>

            {openCtg && (
              <div>
                <CategoriesModal setOpenCtg={setOpenCtg} />
                <Overlay setOpenCtg={setOpenCtg} />
              </div>
            )}
          </div>
        </div>

        <div className='flex justify-between items-center sm:gap-5 gap-3 w-full'>
          <span
            className=' w-full 2xl:w-[60rem]
         flex items-center gap-1 sm:p-2 p-1 border-2 focus:border-black rounded-full'
          >
            <CiSearch className='text-gray-500 font-semibold text-lg' />
            <input
              className='outline-none border-none  sm:text-sm text-xs w-full '
              type='search'
              placeholder='Search here'
            />
          </span>

          <span>
            <FaListUl
              onClick={() => setOpenCtg(true)}
              className=' lg:hidden text-xl cursor-pointer '
            />
          </span>
          <span>
            <FaRegUser onClick={() => setOpenCtg(false)} className='text-xl' />
          </span>
          <div className='relative'>
            <p className='absolute -top-4 right-4 font-bold text-red-600 sm:text-sm text-xs bg-gray-200 py-0.5 px-1 rounded-full '>
              2
            </p>
            <BiCart onClick={() => setOpenCtg(false)} className='text-xl' />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
