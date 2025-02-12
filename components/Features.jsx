"use client";
import { useState, useRef } from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import FeatureProducts from "./FeatureProducts";
import { ctgText } from "@/data/CategoriesData";

const Features = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainer = useRef(null); // Ref to the scrollable container

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

  return (
    <div className='py-10'>
      <h1 className='text-2xl text-center font-bold tracking-widest mb-4'>
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
          {ctgText.map((item,i) => (
              <p
                key={i}
                className={`cursor-pointer lg:px-8 px-4 font-medium lg:text-sm text-xs whitespace-nowrap lg:py-4 
                 py-2 rounded-full shadow-sm border hover:shadow-md ${
                   activeCategory === item.category ? "bg-gray-300" : ""
                 }`}
                onClick={() => setActiveCategory(item.category)}
              >
                {item.category}
              </p>
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
      <div className='mt-6'>
        <FeatureProducts />
      </div>
    </div>
  );
};

export default Features;
