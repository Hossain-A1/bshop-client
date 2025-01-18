"use client";
import { ctgData } from "@/Data/CategoriesData";
import HomeAndKitchen from "./HomeAndKitchen";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import LeatherProducts from "./LeatherProducts";
import { useState } from "react";
import FoodAndGrocery from "./FoodAndGrocery";
import MenClothing from "./MenClothing";
import MenShoes from "./MenShoes";
import WomenClothing from "./WomenClothing";
import WomenShoes from "./WomenShoes";
import KidsFashion from "./KidsFashion";
import Electronics from "./Electronics";
import ToolsAndHomeUse from "./ToolsAndHomeUse";
import { useRouter } from "next/navigation";

const CategoriesModal = ({ setOpenCtg }) => {
  const [activeCategory, setActiveCategory] = useState("Leather Products");
  const navigate = useRouter();

  // Map category text to components
  const categoryComponents = {
    "Leather Products": <LeatherProducts />,
    "Home & Kitchen": <HomeAndKitchen />,
    "Food & Grocery": <FoodAndGrocery />,
    "Men's Clothing": <MenClothing />,
    "Men's Shoes": <MenShoes />,
    "Women's Clothing": <WomenClothing />,
    "Women's Shoes": <WomenShoes />,
    "Kids Fashion": <KidsFashion />,
    "Electronics": <Electronics />,
    "Tools & Home Use": <ToolsAndHomeUse />,
  };

  // Dynamic route mapping for categories
   const categoryRoutes = {
    "Leather Products": "/leather-items",
    "Home & Kitchen": "/best-sellers",
    "Food & Grocery": "/health",
    "Men's Clothing": "/clothes",
    "Men's Shoes": "/men",
    "Women's Clothing": "/clothes",
    "Women's Shoes": "/women",
    "Kids Fashion": "/kids",
    "Electronics": "/all",
    "Tools & Home Use": "/beauty",
  };

  return (
    <div className='absolute z-20 h-full w-full md:w-[60vw] md:h-96  left-1/2 max-sm:top-[64px] top-[65px] -translate-x-1/2 bg-white shadow-lg rounded'>
      <div className='flex items-center   h-full w-full'>
        {/* Left Menu */}
        <div className='w-auto lg:w-1/3 border-r pl-4  h-full overflow-y-scroll custom-scrollbar'>
          <ul className='space-y-2 '>
            {ctgData.map((category, index) => (
              <li
                key={index}
                className={`flex justify-between items-center  cursor-pointer text-xs md:text-sm lg:text-lg font-medium ${
                  activeCategory === category.text ? "text-blue-500" : ""
                }`}
                onClick={() => {
                  navigate.push(categoryRoutes[category.text]),
                    setOpenCtg(false);
                }}
                onMouseEnter={() => setActiveCategory(category.text)} // Update active category on hover
              >
                {category.text}
                <p>
                  {" "}
                  <MdOutlineKeyboardArrowRight className='md:h-6 lg:text-xl text-sm mt-1' />
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className=' w-full pl-2 md:pl-4 h-full overflow-y-scroll custom-scrollbar'>
          {categoryComponents[activeCategory]}
        </div>
      </div>
    
    </div>
  );
};

export default CategoriesModal;
