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
    <div className=' md:pl-4 py-2'>
      <div className=' overflow-x-scroll flex justify-between items-center gap-8 hidden-scroll '>
        {filteredProducts.map((item) => (
          <div
            onClick={() => navigate.push(`/category/${slugify(item.category)}`)}
            key={item._id}
            className='inline-flex flex-col items-center group cursor-pointer'
          >
            <figure className='w-20 h-20  object-cover overflow-hidden rounded-full group-hover:scale-105 transition-all duration-300'>
              <Image
                height={400}
                width={400}
                priority
                src={item.images[0] || "/default.jpg"}
                alt={item.title}
                className='h-full w-full object-fill'
              />
            </figure>
            <p className='mt-2 whitespace-pre-wrap text-xs md:text-sm text-center text-gray-700 font-medium'>
              {item.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
