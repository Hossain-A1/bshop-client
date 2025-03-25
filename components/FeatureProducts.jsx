"use client";
import { slugify } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const FeatureProducts = () => {
  const { products } = useSelector((state) => state.product);
  const navigate = useRouter();
  // Get the first product for each category
  const uniqueCategories = {};
  const filteredProducts = products.filter((item) => {
    if (!uniqueCategories[item.category]) {
      uniqueCategories[item.category] = true;
      return true;
    }
    return false;
  });

  return (
    <div className=' overflow-x-scroll whitespace-nowrap hidden-scroll md:pl-4 flex items-center'>
      {filteredProducts.map((item) => (
        <div
          onClick={() => navigate.push(`/category/${slugify(item.category)}`)}
          key={item._id}
          className='flex flex-col items-center group w-full '
        >
          <Image
            height={400}
            width={400}
            priority
            src={item.images[0] || "/default.jpg"} // Ensure a fallback image
            alt={item.title}
            className='sm:w-20 sm:h-20 w-14 h-14 object-cover rounded-full group-hover:scale-105 transition-all duration-300'
          />
          <p className='mt-2 whitespace-pre-wrap text-xs md:text-sm text-center text-gray-700 font-medium'>
            {item.category}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeatureProducts;
