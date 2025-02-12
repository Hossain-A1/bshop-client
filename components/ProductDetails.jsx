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
import {
  fetchSingleProduct,
} from "@/features/product/productSlice";
import { useDispatch } from "react-redux";

const ProductDetails = ({ product, loading, error, slug }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    title,
    desc,
    price,
    sizes = [""],
    sold,
    stock,
    images = [],
    color = [""],
    category,
    colorImages = [""],
  } = product;

  // Image View State
  const [viewPicture, setViewPicture] = useState(images[0]||"/default.jpg");
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (slug) {
      dispatch(fetchSingleProduct(slug));
    }
  }, [slug, dispatch]);

  useEffect(()=>{
if(images.length>0 &&images[0]){
  setViewPicture(images[0])
}
  },[images])

  // Handle Zoom Toggle
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
    setPosition({ x: 0, y: 0 }); // Reset position when toggling zoom
  };

  // Handle Mouse Move for Panning
  const handleMouseMove = (e) => {
    if (!isZoomed || !dragging) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  // Handle Mouse Down (Start Drag)
  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    setDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  // Handle Mouse Up (Stop Drag)
  const handleMouseUp = () => setDragging(false);

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{title} | ShopEase</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={`${category}, leather, fashion, accessories`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={viewPicture} />
        <meta property="og:type" content="product" />
      </Head>

      <div className="space-y-5 min-h-screen">
        {loading && <Loading isLoading={loading} />}
        {error && <Error error={error} />}

        <div className="lg:flex lg:flex-row flex-col h-full w-full gap-4 mt-2 mb-20">
          {/* Left Side - Images */}
          <section className="flex flex-col-reverse lg:flex-row lg:w-1/2 gap-4">
            {/* Side Images */}
            <div className="flex lg:flex-col flex-row gap-2">
              {images.map((img, i) => (
                <figure
                  key={i}
                  onMouseEnter={() => setViewPicture(img)}
                  className={`w-16 h-16 sm:w-24 sm:h-20 lg:h-28 overflow-hidden border ${
                    viewPicture === img ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image height={100} width={100} className="h-full w-full object-fill" src={img} alt={title} />
                </figure>
              ))}
            </div>

            {/* Main Image with Zoom & Pan */}
            <div className="zoom-container w-full">
              <figure
                className={`lg:h-[90vh] h-80 w-full ${isZoomed ? "zoomed" : ""}`}
                onClick={handleZoomToggle}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setDragging(false)}
              >
                <Image
                  height={700}
                  width={1080}
                  alt={title}
                  className="h-full w-full object-fill image-move"
                  src={viewPicture || "/default.jpg"}
                  style={{
                    transform: isZoomed
                      ? `scale(2) translate(${position.x}px, ${position.y}px)`
                      : "scale(1)",
                  }}
                />
              </figure>
            </div>
          </section>

          {/* Right Side - Product Info */}
          <section className="lg:w-1/2 w-full space-y-2">
            <h2 className="text-xl font-bold">{title}</h2>

            <div className="space-y-2">
              <span className="flex items-center text-[#0A8800] flex-wrap">
                <FaCarSide className="mr-1 font-medium" /> Fastest delivery: 4-5 Business Days
                <p className="text-gray-600">{desc}</p>
              </span>

              <p>Sold: {sold} pieces</p>

              {/* Price & Stock */}
              <div className="flex items-center gap-2">
                <p className="text-3xl font-semibold text-black">
                  <span className="font-medium text-xl">TK</span> {price}
                </p>
                {stock === 0 ? (
                  <p className="bg-red-500 text-white px-2 rounded uppercase font-medium text-sm">Out of Stock</p>
                ) : (
                  <p className="bg-orange-500 text-white px-2 rounded uppercase font-medium text-sm">Only {stock} left</p>
                )}
              </div>

              {/* Free Shipping Offer */}
              <div className="p-3 rounded bg-orange-50 flex justify-between items-center">
                <p className="font-medium flex items-center gap-2">
                  <TiTick className="text-[#0A8800] text-xl" /> Free shipping special for you
                </p>
                <small className="text-gray-500">Limited-time offer</small>
              </div>
            </div>

            {/* Color UI */}
            {color?.length > 0 && <ColorUi setViewPicture={setViewPicture} product={product} sizes={sizes} colors={color} colorImages={colorImages} stock={stock} />}

            {/* Add to Cart Button */}
         
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

export default ProductDetails;
