import { ctgData } from '@/Data/CategoriesData';
import React from 'react'

const Electronics = () => {
  return (
     <div >
             
        
              {/* Right Side Grid */}
              <div className="w-3/4 pl-4 grid grid-cols-3 gap-4">
                {ctgData[7].items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center group "
                  >
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-full  group-hover:scale-105  transition-all duration-300 "
                    />
                    <p className="mt-2 text-sm text-gray-700 font-medium">
                      {item.name}
                    </p>
                  </div>
                ))}
            </div>
            </div>
  )
}

export default Electronics