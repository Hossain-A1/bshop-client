"use client";
import ColorUi from "@/helpers/ColorUi";
import Image from "next/image";
import React, { useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const BagDetailsPage = () => {
  const sideImg = [
    {
      _id: 1,
      src: "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      _id: 2,
      src: "https://t4.ftcdn.net/jpg/01/98/00/03/240_F_198000337_TJUXP0zNcGAZlwNaVofAhEELUMf4jkK3.jpg",
    },
    {
      _id: 3,
      src: "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      _id: 4,
      src: "https://t4.ftcdn.net/jpg/01/98/00/03/240_F_198000337_TJUXP0zNcGAZlwNaVofAhEELUMf4jkK3.jpg",
    },
  ];

  const [viewPicture, setViewPicture] = useState(sideImg[0]?.src || "");
  return (
    <div className='lg:flex  lg:h-[80vh] h-full w-full gap-4 mt-2'>
      {/* --------------left side---------------- */}

      <div className=' flex max-sm:flex-col-reverse flex-  gap-3 lg:w-1/2 w-full h-full '>
        <div className='flex  gap-1 sm:flex-col'>
          {sideImg.map((img) => (
            <figure
              onMouseEnter={() => setViewPicture(img.src)}
              key={img._id}
              className={`w-24 h-20 lg:h-28  overflow-hidden p-1 border ${
                viewPicture && "hover:border-black"
              }`}
            >
              <Image
                height={100}
                width={100}
                className='h-full w-full object-cover overflow-hidden'
                src={img.src}
                alt='pp'
              />
            </figure>
          ))}
        </div>

          <figure className='lg:h-full h-80 w-full  overflow-hidden'>
            <Image
              height={700}
              width={1080}
              alt='desc-pic'
              className='h-full w-full object-cover'
              src={viewPicture}
            />
          </figure>
      </div>

      {/* -------------right side--------------------- */}

      <div className='lg:w-1/2 w-full'>
        <div className='space-y-2'>
          <p className='text-[16px] font-light  '>
            <span className='text-[#0A8800] flex gap-1 items-center font-medium'>
              <FaCarSide /> Fastest delivery: 4 Business day
            </span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea
            perferendis ab aliquam soluta aspernatur itaque? Ea voluptatum,
            itaque praesentium provident aliquid ab, quo molestiae at porro
            rerum eligendi quas impedit?
          </p>
          <p>sold 7k</p>

          <div className='flex items-center gap-2'>
            <p className='text-3xl font-semibold text-black'>
              <span className='font-medium text-xl'>TK</span>58
            </p>
            <del className='text-sm text-gray-500'>TK70</del>
            <p className='bg-bg_org text-white px-1  rounded uppercase font-medium max-w-28 text-sm'>
              Only 7 left
            </p>
          </div>

          <div className='p-2 rounded bg-orange-100 flex justify-between items-center'>
            <p className='font-medium flex items-center'>
              <TiTick className='text-[#0A8800] text-xl' /> Free shipping
              special for you
            </p>
            <small>limited-time offer</small>
          </div>
        </div>

        {/* ------------color &  size------------ */}

        <ColorUi setViewPicture={setViewPicture} />

        <div className='my-4'>
          <button className='px-6  py-3 rounded-full bg-[] w-full text-white font-medium text-center bg-orange-500'>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BagDetailsPage;
