"use client";
import React, { useState, useRef } from "react";
import LeatherProducts from "./LeatherProducts";
import HomeAndKitchen from "./HomeAndKitchen";
import FoodAndGrocery from "./FoodAndGrocery";
import MenClothing from "./MenClothing";
import MenShoes from "./MenShoes";
import WomenClothing from "./WomenClothing";
import WomenShoes from "./WomenShoes";
import KidsFashion from "./KidsFashion";
import Electronics from "./Electronics";
import ToolsAndHomeUse from "./ToolsAndHomeUse";
import { ctgData } from "@/data/CategoriesData";
import ProductItem from "./ProductItem/ProductItem";

import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

const Features = () => {
  const [activeCategory, setActiveCategory] = useState("Leather Products");
  const scrollContainer = useRef(null); // Ref to the scrollable container

  const categoryComponents = {
    "Leather Products": <LeatherProducts />,
    "Home & Kitchen": <ProductItem />,
    "Food & Grocery": <FoodAndGrocery />,
    "Men's Clothing": <MenClothing />,
    "Men's Shoes": <MenShoes />,
    "Women's Clothing": <WomenClothing />,
    "Women's Shoes": <WomenShoes />,
    "Kids Fashion": <KidsFashion />,
    Electronics: <Electronics />,
    "Tools & Home Use": <ToolsAndHomeUse />,
  };

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
          {ctgData.map((item, i) => (
            <p
              className={`cursor-pointer lg:px-8 px-4 font-medium lg:text-sm text-xs whitespace-nowrap lg:py-4 
                 py-2 rounded-full shadow-sm border hover:shadow-md ${
                   activeCategory === item.text ? "bg-gray-300" : ""
                 }`}
              onClick={() => setActiveCategory(item.text)}
              key={i}
            >
              {item.text}
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
      <div className='mt-6'>{categoryComponents[activeCategory]}</div>
    </div>
  );
};

export default Features;
