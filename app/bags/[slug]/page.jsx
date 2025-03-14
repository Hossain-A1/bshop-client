"use client";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const BagDetailsPage = () => {
  const { slug } = useParams();

  const { product, loading, error } = useSelector((state) => state.product);

  return (
    <>
      {/* {product && (
        <ProductDetails
          product={product}
          loading={loading}
          error={error}
          slug={slug}
        />
      )} */}
    </>
  );
};

export default BagDetailsPage;
