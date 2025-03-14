"use client";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";

const DynamicProductPage = () => {
  const { slug } = useParams();

  if (!slug || slug.length < 2) return <p>Invalid product URL</p>;

  const productSlug = slug[1]; // Extract only the product slug

  return <ProductDetails slug={productSlug} />;
};

export default DynamicProductPage;
