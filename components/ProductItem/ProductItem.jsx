"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LiaCartPlusSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
import { slugify } from "@/utils";

const ProductItem = () => {
  const navigate = useRouter();
  const { products, loading, error } = useSelector((state) => state.product);



  return (
    <div>
      {loading && <Loading isLoading={loading} />}
      {error && <Error error={error} />}

      <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4   items-center gap-3 mt-4'>
        {products.length > 0 &&
          products.map((item) => (
            <div
              key={item._id}
              className='cursor-pointer'
              onClick={() =>
                navigate.push(`/product/${slugify(item.category)}/${item.slug}`)
              }
            >
              <div className='h-40 w-full lg:h-80 overflow-hidden'>
                <Image
                  height={720}
                  width={1080}
                  priority
                  src={item.images[0]}
                  alt={item.title}
                  className='h-full w-full object-fill'
                />
              </div>
              <div className='p-1'>
                <p className='text-xs lg:text-sm text-slate-500 h-7 mb-1 sm:h-4 '>
                  {item.title.slice(0, 40)}...
                </p>

                <div className='flex items-center justify-between '>
                  <div className='flex gap-1'>
                    <span className='text-[#FB7701] text-sm lg:text-xl font-bold flex items-center'>
                      <p className='text-[#FB7701] text-xs md:text-sm font-medium mt-1'>
                        TK
                      </p>
                      {item.price}
                    </span>
                    <del className='text-xs md:text-sm'>
                      TK{(item.price * 3) / 2}
                    </del>
                  </div>
                  <p className=' py-0.5 px-2 md:px-2 border-2 border-blue-700 hover:bg-black hover:text-white duration-300 rounded-full    '>
                    <LiaCartPlusSolid className='text-xl lg:text-2xl font-bold  ' />
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductItem;
