import { ctgData } from "@/Data/CategoriesData";
import React from "react";

const KidsFashion = () => {
  return (
    <div className='w-full md:pl-4 grid lg:grid-cols-4 xl:grid-cols-5 mt-2 grid-cols-3 gap-2.5 lg:gap-4'>
         {ctgData[4].items.map((item, index) => (
           <div key={index} className='flex flex-col items-center group '>
             <img
               src={item.photo}
               alt={item.name}
               className='sm:w-20 sm:h-20 w-14 h-14 object-cover rounded-full  group-hover:scale-105  transition-all duration-300 '
             />
             <p className='mt-2 text-xs md:text-sm text-center text-gray-700 font-medium'>
               {item.name}
             </p>
           </div>
         ))}
       </div>
  );
};

export default KidsFashion;
