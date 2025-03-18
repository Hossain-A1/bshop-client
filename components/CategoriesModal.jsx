"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux"; // Assuming you're using Redux for state management
import ProductList from "./ProductList"; // Ensure this is the correct import
import RelatedProducts from "./RelatedProducts";

const CategoriesModal = ({ openCtg,setOpenCtg }) => {
  const { products } = useSelector((state) => state.product); // Get products from Redux store
  const [activeCategory, setActiveCategory] = useState("bag & wallet"); // Default category

  // Extract unique categories from products
  const categories =
    products.length > 0
      ? [...new Set(products.map((product) => product.category))]
      : [];
  // Disable body scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="absolute no-scroll overscroll-y-none z-20 h-full bottom-0 w-full md:w-[60vw] md:h-96 left-1/2 max-sm:top-[64px] top-[65px] -translate-x-1/2 bg-white shadow-lg rounded transition-all duration-500">
      <div className="flex items-center h-full w-full">
        {/* Left Menu */}
        <div className="w-auto lg:w-1/3 border-r pl-4 h-full overflow-y-scroll custom-scrollbar">
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`flex justify-between items-center cursor-pointer text-xs md:text-[1.10rem] ${
                  activeCategory === category ? "text-blue-500" : ""
                }`}
                onMouseEnter={() => setActiveCategory(category)}
              >
                {category}
                <p>
                  <MdOutlineKeyboardArrowRight className="md:h-6 lg:text-xl text-sm mt-1" />
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className="w-full pl-2 md:pl-4 h-full overflow-y-scroll custom-scrollbar">
          {/* Dynamically render ProductList with activeCategory */}
          <ProductList activeCategory={activeCategory} setOpenCtg={setOpenCtg} products={products} />
          <div className="md:hidden md:overflow-hidden">

          <RelatedProducts category={activeCategory} openCtg={openCtg} setOpenCtg={setOpenCtg}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;