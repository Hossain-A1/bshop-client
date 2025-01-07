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
    Electronics: <Electronics />,
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
    Electronics: "/all",
    "Tools & Home Use": "/beauty",
  };

  return (
    <div className='absolute w-[60vw] h-96  left-1/2 top-16 -translate-x-1/2 bg-white shadow-lg rounded-md'>
      <div className='flex items-center h-full w-full'>
        {/* Left Menu */}
        <div className='w-1/4 border-r pl-4  h-full overflow-y-scroll custom-scrollbar'>
          <ul className='space-y-2 '>
            {ctgData.map((category, index) => (
              <li
                key={index}
                className={`flex justify-between items-center cursor-pointer font-medium ${
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
                  <MdOutlineKeyboardArrowRight className='h-6 text-xl mt-1' />
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className='w-3/4 pl-4 h-full overflow-y-scroll custom-scrollbar'>
          {categoryComponents[activeCategory]}
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;
