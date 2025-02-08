"use client";
import ProductItem from "@/components/ProductItem/ProductItem";
import ColorUi from "@/helpers/ColorUi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import Head from "next/head";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import { fetchSingleProduct } from "@/features/product/productSlice";
import { useDispatch } from "react-redux";

const ProductDetails = ({ product, loading, error, slug }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    title,
    desc ,
    price,
    sizes = [],
    sold,
    stock,
    images = [],
    color = [],
    category,
    colorImages = [],
  } = product || {};

  // Image View State
  const [viewPicture, setViewPicture] = useState(images?.[0] || "");

  useEffect(() => {
    if (slug) {
      dispatch(fetchSingleProduct(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (images?.length > 0) {
      setViewPicture(images[0]);
    }
  }, [images]);

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{title} | ShopEase</title>
        <meta name='description' content={desc} />
        <meta
          name='keywords'
          content={`${category}, leather, fashion, accessories`}
        />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={desc} />
        <meta property='og:image' content={viewPicture} />
        <meta property='og:type' content='product' />
      </Head>

      <div className='space-y-5 min-h-screen'>
        {loading && <Loading isLoading={loading} />}
        {error && <Error error={error} />}

        <div className='lg:flex lg:flex-row flex-col h-full w-full gap-4 mt-2 mb-20'>
          {/* Left Side - Images */}
          <section className='flex flex-col-reverse lg:flex-row lg:w-1/2 gap-4'>
            {/* Side Images */}
            <div className='flex lg:flex-col flex-row gap-2'>
              {
                images.map((img, i) => (
                  <figure
                    onMouseEnter={() => setViewPicture(img)}
                    key={i}
                    className={`w-16 h-16 sm:w-24 sm:h-20 lg:h-28 overflow-hidden border ${
                      viewPicture === img ? "border-black" : "border-gray-200"
                    }`}
                  >
                    <Image
                      height={100}
                      width={100}
                      className='h-full w-full object-fill'
                      src={img}
                      alt={title}
                    />
                  </figure>
                ))}
            </div>

            {/* Main Image */}
            <figure className='lg:h-full h-80 w-full overflow-hidden'>
              <Image
                height={700}
                width={1080}
                alt={title}
                className='h-full w-full object-fill'
                src={viewPicture}
              />
            </figure>
          </section>

          {/* Right Side - Product Info */}
          <section className='lg:w-1/2 w-full space-y-2'>
            <h2 className='text-xl font-bold'>{title}</h2>

            <div className='space-y-2'>
              <span className='flex items-center text-[#0A8800] flex-wrap'>
                <FaCarSide className='mr-1 font-medium' /> Fastest delivery: 4-5
                Business Days
                <p className='text-gray-600'>{desc}</p>
              </span>

              <p>Sold: {sold} pieces</p>

              {/* Price & Stock */}
              <div className='flex items-center gap-2'>
                <p className='text-3xl font-semibold text-black'>
                  <span className='font-medium text-xl'>TK</span> {price}
                </p>
                {stock === 0 ? (
                  <p className='bg-red-500 text-white px-2 rounded uppercase font-medium text-sm'>
                    Out of Stock
                  </p>
                ) : (
                  <p className='bg-orange-500 text-white px-2 rounded uppercase font-medium text-sm'>
                    Only {stock} left
                  </p>
                )}
              </div>

              {/* Free Shipping Offer */}
              <div className='p-3 rounded bg-orange-50 flex justify-between items-center'>
                <p className='font-medium flex items-center gap-2'>
                  <TiTick className='text-[#0A8800] text-xl' /> Free shipping
                  special for you
                </p>
                <small className='text-gray-500'>Limited-time offer</small>
              </div>
            </div>

            {/* Color UI */}
            {color?.length > 0 && (
              <ColorUi
                setViewPicture={setViewPicture}
                sizes={sizes}
                colors={color}
                colorImages={colorImages}
              />
            )}

            {/* Add to Cart Button */}
            <div className='my-4'>
              <button
                onClick={() => router.push("/cart")}
                disabled={stock === 0}
                className={`px-6 py-3 rounded-full w-full text-white font-medium text-center ${
                  stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </section>
        </div>

        {/* Suggested Products */}
        <div className='mt-5 space-y-3'>
          <h2 className='font-medium text-lg sm:text-xl'>You May Also Like</h2>
          <ProductItem />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
