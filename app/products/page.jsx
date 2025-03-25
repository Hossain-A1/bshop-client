"use client";
import ProductItem from "@/components/ProductItem/ProductItem";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const { products } = useSelector((state) => state.product);

  

  return (
    <div className="min-h-screen">
      {products.length > 0 ? (
        <ProductItem />
      ) : (
       <div className="h-full flex  items-center justify-center">
         <h2 className=" h-full text-red-700 text-2xl  lg:text-4xl text-center font-semibold">No products found. Please search again.</h2>
       </div>
      )}
    </div>
  );
};

export default ProductPage;
