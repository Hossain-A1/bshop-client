"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LiaCartPlusSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import { slugify } from "@/utils";
import { useMemo } from "react";

const RelatedProducts = ({ category, openCtg, setOpenCtg }) => {
  const navigate = useRouter();
  const { products, loading, error } = useSelector((state) => state.product);

  const handleNavigate = (category, slug) => {
    if (openCtg) {
      setOpenCtg(false);
    }
    if (category && slug) {
      navigate.push(`/product/${slugify(category)}/${slug}`);
    } else {
      console.log("category and slug not found");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => item.category === category);
  }, [products, category]);

  return (
    <div>
      {loading && <Loading isLoading={loading} />}
      {error && <Error error={error} />}

      <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 items-center gap-3 mt-4'>
        {filteredProducts.length > 0 &&
          filteredProducts.map((item) => (
            <div
              key={item._id}
              className='cursor-pointer bg-slate-100'
              onClick={() => handleNavigate(item.category, item.slug)}
              tabIndex={0}
              role='button'
              onKeyPress={(e) =>
                e.key === "Enter" && handleNavigate(item.category, item.slug)
              }
            >
              <div className={` ${openCtg?"h-32":"lg:h-80 overflow-hidden h-40"} w-full `}>
                {item.images[0] ? (
                  <Image
                    height={720}
                    width={1080}
                    priority
                    src={item.images[0]}
                    alt='bag'
                    className='h-full w-full object-fill'
                  />
                ) : (
                  <div className='h-full w-full bg-gray-200 flex items-center justify-center'>
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <div className='p-1'>
                {!openCtg && (
                  <p className='text-sm'>{item.title.slice(0, 40)}...</p>
                )}

                <div className='flex items-center justify-between '>
                  <div className='flex gap-1'>
                    <span className='text-[#FB7701] text-sm lg:text-xl font-bold flex items-center'>
                      <p className='text-[#FB7701] text-xs md:text-sm font-medium mt-1'>
                        TK
                      </p>
                      {item.price}
                    </span>
                  {!openCtg&&(  <del className='text-xs md:text-sm'>
                      TK{(item.price * 3) / 2}
                    </del>)}
                  </div>
                  <span className=' py-0.5 px-2 md:px-1 border-2 border-blue-700 hover:bg-black hover:text-white duration-300 rounded-full'>
                    <LiaCartPlusSolid className={`${openCtg?"text-xs":"text-xl lg:text-2xl font-bold"} `} />
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
