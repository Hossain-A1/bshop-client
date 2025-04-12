"use client";
import { useState, useRef, useMemo } from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { slugify } from "@/utils";

const Features = () => {
  const { products } = useSelector((state) => state.product);
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainer = useRef(null); // Ref to the scrollable container
  const navigate = useRouter();
  // Scroll Left
  const handleScrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: -200, // Adjust the scroll distance
        behavior: "smooth",
      });
    }
  };

  // Scroll Right
  const handleScrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: 200, // Adjust the scroll distance
        behavior: "smooth",
      });
    }
  };

   // Get the first product for each category
   const filteredProducts = useMemo(() => {
    const uniqueCategories = {};
    return products.filter((item) => {
      if (!uniqueCategories[item.category]) {
        uniqueCategories[item.category] = true;
        return true;
      }
      return false;
    });
  }, [products]);

  return (
    <div className='py-5 lg:py-10'>
      <h1 className='text-xl md:text-2xl text-center font-semibold tracking-widest mb-4'>
        EXPLORE YOUR INTERESTS
      </h1>

      {/* Categories with Arrow Buttons */}
      <div className='relative flex items-center'>
        {/* Left Arrow */}
        <button
          onClick={handleScrollLeft}
          className='absolute left-0  p-2 bg-white shadow-md rounded-full  hover:bg-gray-300'
        >
          <MdOutlineKeyboardArrowLeft />
        </button>

        {/* Scrollable Categories */}
        <div
          ref={scrollContainer}
          className='flex items-center gap-4 overflow-x-scroll hidden-scroll px-10'
        >
          {filteredProducts &&
            filteredProducts.map((item, i) => (
              <span
                onClick={() =>
                  navigate.push(`/category/${slugify(item.category)}`)
                }
                key={i}
                className={`mb-3 cursor-pointer lg:px-8 px-4 font-medium lg:text-sm text-xs whitespace-nowrap lg:py-4 
                 py-2 rounded-full shadow-sm border hover:shadow-md ${
                   activeCategory === item.category ? "bg-gray-300" : ""
                 }`}
              >
                {item.category}
              </span>
            ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleScrollRight}
          className='absolute right-0  p-2 bg-white shadow-md rounded-full  hover:bg-gray-300'
        >
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>

      {/* Active Category Content */}
     
    </div>
  );
};

export default Features;
