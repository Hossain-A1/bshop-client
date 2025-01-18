"use client";
import React, { useState } from "react";
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

const Features = () => {
  const [activeCategory, setActiveCategory] = useState("Leather Products");
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
  return (
    <div className="py-10">
      <h1 className="text-2xl text-center font-bold tracking-widest mb-4">EXPLORE YOUR INTERESTS</h1>
     <div className="flex items-center gap-4 hidden-scroll overflow-x-scroll">
     {ctgData.map((item, i) => (
        <p
          className='cursor-pointer px-8 font-medium text-sm whitespace-nowrap w-full py-4  rounded-full shadow-sm border hover:shadow-md '
          onClick={() => setActiveCategory(item.text)}
          key={i}
        >
          {item.text}
        </p>
      ))}
     </div>

      {categoryComponents[activeCategory]}
    </div>
  ); 
};

export default Features;
