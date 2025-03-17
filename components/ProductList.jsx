"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductList = ({ activeCategory, setOpenCtg, products }) => {
  const navigate = useRouter();
  // ✅ Slugify function
  const slugify = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/[\s&']+/g, "-") // Convert spaces, "&", and apostrophes to "-"
      .replace(/[^a-z0-9-]/g, ""); // Remove special characters
  };
  // Filter products based on the active category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <div className='w-full md:pl-4 grid lg:grid-cols-4 xl:grid-cols-5 mt-2 grid-cols-3 gap-2.5 lg:gap-4'>
      {filteredProducts.map((product, index) => (
        <div
          onClick={() => {
            navigate.push(`/category/${slugify(product.category)}`),
              setOpenCtg(false);
          }}
          key={index}
          className='flex flex-col items-center group'
        >
          <Image
            src={product.images[0]} // Use the first image from the product's images array
            alt={product.title}
            width={200
            
            }
            height={200}
            priority
            className='sm:w-20 sm:h-20 w-14 h-14 object-cover rounded-full group-hover:scale-105 transition-all duration-300'
          />
          <p className='mt-2 text-xs md:text-sm text-center text-gray-700 font-medium'>
            {product.title.slice(0, 10)}
          </p>
        </div>
      ))}
    </div>

  );
};

export default ProductList;
