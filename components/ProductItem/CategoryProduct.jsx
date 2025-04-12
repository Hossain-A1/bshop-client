"use client";
import { slugify } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LiaCartPlusSolid } from "react-icons/lia";
import { useSelector } from "react-redux";

const CategoryProduct = ({category}) => {
  const navigate = useRouter();
  const { products } = useSelector((state) => state.product);
  

  // ✅ Compare slugified values to match correctly
  const filteredProducts = products?.filter(
    (item) => slugify(item.category) === category // Compare slugified database category with URL parameter
  );

  if (!filteredProducts || filteredProducts.length === 0) {
    return <p className="text-gray-500 mt-4">No products found in this category.</p>;
  }


  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
    {filteredProducts.map((product) => (
      <div
      key={product._id}
      className='cursor-pointer bg-slate-100'
      onClick={() =>
        navigate.push(`/product/${slugify(product.category)}/${product.slug}`)
      }
      >
      <div className='h-40 w-full lg:h-80 overflow-hidden'>
        <Image
          height={720}
          width={1080}
          src={product.images[0]}
          alt={product.title}
          className='h-full w-full object-fill'
          priority
        />
      </div>
      <div className='p-1'>
        <p className='text-sm'>{product.desc.slice(0, 40)}...</p>
        <div className='flex items-center justify-between '>
          <div className='flex gap-1'>
            <span className='text-[#FB7701] text-lg lg:text-xl font-bold flex items-center'>
              <p className='text-[#FB7701] text-xs md:text-sm font-medium mt-1'>
                TK
              </p>
              {product.price}
            </span>
            <del className='text-xs md:text-sm'>
              TK{(product.price * 3) / 2}
            </del>
          </div>
          <p className='py-0.5 px-2 md:px-3 border-2 border-blue-700 hover:bg-black hover:text-white duration-300 rounded-full'>
            <LiaCartPlusSolid className='text-2xl lg:text-3xl font-bold' />
          </p>
        </div>
      </div>
      </div>
    ))}
  </div>
  );
};

export default CategoryProduct;
