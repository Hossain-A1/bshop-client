"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { LiaCartPlusSolid } from "react-icons/lia";

const ProductItem = () => {
  const navigate = useRouter();
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4   items-center gap-3 mt-4'>
      <div
        className='cursor-pointer'
        onClick={() => navigate.push("/bags/:id")}
      >
        <div className='h-40 w-full lg:w-80 lg:h-80 overflow-hidden'>
          <Image
            height={720}
            width={1080}
            src='https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt='bag'
            className='h-full w-full object-cover'
          />
        </div>
        <div>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisici...
          </p>

          <div className='flex items-center justify-between '>
            <div className='flex gap-1'>
              <span className='text-[#FB7701] text-lg lg:text-xl font-bold flex items-center'>
                <p className='text-[#FB7701] text-sm font-medium mt-1'>TK</p>400
              </span>
              <del>tk780</del>
              <p>sold 55</p>
            </div>
            <p className=' py-0.5 px-3 border rounded-full    '>
              <LiaCartPlusSolid className='text-3xl font-bold  ' />
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className='h-40 w-full lg:w-80 lg:h-80 overflow-hidden'>
          <Image
            height={720}
            width={1080}
            src='https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt='bag'
            className='h-full w-full object-cover'
          />
        </div>
        <div>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisici...
          </p>

          <div className='flex items-center justify-between '>
            <div className='flex gap-1'>
              <span className='text-[#FB7701] text-lg lg:text-xl font-bold flex items-center'>
                <p className='text-[#FB7701] text-sm font-medium mt-1'>TK</p>400
              </span>
              <del>tk780</del>
              <p>sold 55</p>
            </div>
            <p className=' py-0.5 px-3 border rounded-full    '>
              <LiaCartPlusSolid className='text-3xl font-bold  ' />
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className='h-40 w-full lg:w-80 lg:h-80 overflow-hidden'>
          <Image
            height={720}
            width={1080}
            src='https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt='bag'
            className='h-full w-full object-cover'
          />
        </div>
        <div>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisici...
          </p>

          <div className='flex items-center justify-between '>
            <div className='flex gap-1'>
              <span className='text-[#FB7701] text-lg lg:text-xl font-bold flex items-center'>
                <p className='text-[#FB7701] text-sm font-medium mt-1'>TK</p>400
              </span>
              <del>tk780</del>
              <p>sold 55</p>
            </div>
            <p className=' py-0.5 px-3 border rounded-full    '>
              <LiaCartPlusSolid className='text-3xl font-bold  ' />
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className='h-40 w-full lg:w-80 lg:h-80 overflow-hidden'>
          <Image
            height={720}
            width={1080}
            src='https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt='bag'
            className='h-full w-full object-cover'
          />
        </div>
        <div>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisici...
          </p>

          <div className='flex items-center justify-between '>
            <div className='flex gap-1'>
              <span className='text-[#FB7701] text-lg lg:text-xl font-bold flex items-center'>
                <p className='text-[#FB7701] text-sm font-medium mt-1'>TK</p>400
              </span>
              <del>tk780</del>
              <p>sold 55</p>
            </div>
            <p className=' py-0.5 px-3 border rounded-full    '>
              <LiaCartPlusSolid className='text-3xl font-bold  ' />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
