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
    <div className="lg:flex lg:flex-row flex-col lg:h-[80vh] h-full w-full gap-4 mt-2 ">
      {/* Left side */}
      <div className="flex flex-col-reverse lg:flex-row lg:w-1/2 gap-4">
        {/* Side Images */}
        <div className="flex lg:flex-col flex-row gap-2">
          {sideImg.map((img) => (
            <figure
              onMouseEnter={() => setViewPicture(img.src)}
              key={img._id}
              className={`w-16 h-16 sm:w-24 sm:h-20 lg:h-28 overflow-hidden border ${
                viewPicture === img.src ? "border-black" : "border-gray-200"
              }`}
            >
              <Image
                height={100}
                width={100}
                className="h-full w-full object-cover"
                src={img.src}
                alt="Thumbnail"
              />
            </figure>
          ))}
        </div>

        {/* Main Image */}
        <figure className="lg:h-full h-80 w-full overflow-hidden">
          <Image
            height={700}
            width={1080}
            alt="Bag Picture"
            className="h-full w-full object-cover"
            src={viewPicture}
          />
        </figure>
      </div>

      {/* Right side */}
      <div className="lg:w-1/2 w-full space-y-4">
        <div className="space-y-2">
          <p className="text-[16px] font-light">
            <span className="text-[#0A8800] flex gap-2 items-center font-medium">
              <FaCarSide /> Fastest delivery: 4 Business day
            </span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea
            perferendis ab aliquam soluta aspernatur itaque? Ea voluptatum,
            itaque praesentium provident aliquid ab, quo molestiae at porro
            rerum eligendi quas impedit?
          </p>
          <p>Sold 7k</p>

          <div className="flex items-center gap-2">
            <p className="text-3xl font-semibold text-black">
              <span className="font-medium text-xl">TK</span> 58
            </p>
            <del className="text-sm text-gray-500">TK70</del>
            <p className="bg-org text-white px-2 rounded uppercase font-medium text-sm">
              Only 7 left
            </p>
          </div>

          <div className="p-3 rounded bg-orange-50 flex justify-between items-center">
            <p className="font-medium flex items-center gap-2">
              <TiTick className="text-[#0A8800] text-xl" /> Free shipping
              special for you
            </p>
            <small className="text-gray-500">Limited-time offer</small>
          </div>
        </div>

        {/* Color and Size */}
        <ColorUi setViewPicture={setViewPicture} />

        {/* Add to Cart Button */}
        <div className="my-4">
          <button className="px-6 py-3 rounded-full w-full text-white font-medium text-center bg-orange-500 hover:bg-orange-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BagDetailsPage;
