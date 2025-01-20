"use client";
import ProductItem from "@/components/ProductItem/ProductItem";
import ColorUi from "@/helpers/ColorUi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import Head from "next/head";
import { useDispatch } from "react-redux";

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
  const router = useRouter();
  const dispatch = useDispatch()

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Bag Details - Premium Leather Bags | ShopEase</title>
        <meta
          name="description"
          content="Explore our premium leather bag collection with fast delivery and exclusive discounts. Only a few pieces left!"
        />
        <meta
          name="keywords"
          content="leather bag, premium bags, fashion bags, fast delivery, exclusive discount"
        />
        <meta property="og:title" content="Bag Details - Premium Leather Bags" />
        <meta
          property="og:description"
          content="Discover our high-quality leather bags. Shop now and enjoy free shipping with exclusive offers!"
        />
        <meta property="og:image" content={sideImg[0]?.src} />
        <meta property="og:type" content="product" />
      </Head>

      <div className="space-y-5">
        <div className="lg:flex lg:flex-row flex-col lg:h-[80vh] h-full w-full gap-4 mt-2">
          {/* Left Side */}
          <section
            className="flex flex-col-reverse lg:flex-row lg:w-1/2 gap-4"
            aria-labelledby="product-images"
          >
            <h2 id="product-images" className="sr-only">
              Product Images
            </h2>
            {/* Side Images */}
            <div className="flex lg:flex-col flex-row gap-2">
              {sideImg.map((img) => (
                <figure
                  onMouseEnter={() => setViewPicture(img.src)}
                  key={img._id}
                  className={`w-16 h-16 sm:w-24 sm:h-20 lg:h-28 overflow-hidden border ${
                    viewPicture === img.src
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    height={100}
                    width={100}
                    className="h-full w-full object-cover"
                    src={img.src}
                    alt={`Bag thumbnail ${img._id}`}
                  />
                </figure>
              ))}
            </div>

            {/* Main Image */}
            <figure className="lg:h-full h-80 w-full overflow-hidden">
              <Image
                height={700}
                width={1080}
                alt="Premium Leather Bag"
                className="h-full w-full object-cover"
                src={viewPicture}
              />
            </figure>
          </section>

          {/* Right Side */}
          <section
            className="lg:w-1/2 w-full space-y-4"
            aria-labelledby="product-details"
          >
            <h2 id="product-details" className="text-xl font-bold">
              Premium Leather Bag Details
            </h2>
            <div className="space-y-2">
              <p className="text-[16px] font-light">
                <span className="text-[#0A8800] flex gap-2 items-center font-medium">
                  <FaCarSide /> Fastest delivery: 4 Business Days
                </span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea
                perferendis ab aliquam soluta aspernatur itaque? Ea voluptatum,
                itaque praesentium provident aliquid ab, quo molestiae at porro
                rerum eligendi quas impedit?
              </p>
              <p>Sold: 7k</p>

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
              <button
                onClick={() => router.push("/cart")}
                className="px-6 py-3 rounded-full w-full text-white font-medium text-center bg-orange-500 hover:bg-orange-600"
              >
                Add to Cart
              </button>
            </div>
          </section>
        </div>

        {/* Suggested Products */}
        <div className="mt-5 space-y-3">
          <h2 className="font-medium text-lg sm:text-xl">You May Also Like</h2>
          <ProductItem />
        </div>
      </div>
    </>
  );
};

export default BagDetailsPage;
