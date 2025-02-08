"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LiaCartPlusSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
import { fetchAllProducts } from "@/features/product/productSlice";
import { useEffect } from "react";

const ProductItem = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
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
              onClick={() => navigate.push(`/bags/${item.slug}`)}
            >
              <div className='h-40 w-full lg:w-80 lg:h-80 overflow-hidden'>
                <Image
                  height={720}
                  width={1080}
                  src={item.images[0]}
                  alt='bag'
                  className='h-full w-full object-cover'
                />
              </div>
              <div>
                <p className='text-sm'>{item.desc.slice(0, 50)}...</p>

                <div className='flex items-center justify-between '>
                  <div className='flex gap-1'>
                    <span className='text-[#FB7701] text-lg lg:text-xl font-bold flex items-center'>
                      <p className='text-[#FB7701] text-sm font-medium mt-1'>
                        TK
                      </p>
                      {item.price}
                    </span>
                    <del>TK{(item.price * 3) / 2}</del>
                    <p>sold {item.sold}</p>
                  </div>
                  <p className=' py-0.5 px-3 border rounded-full    '>
                    <LiaCartPlusSolid className='text-3xl font-bold  ' />
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
