import ProductDetails from "@/components/ProductDetails";

export const generateMetadata = async ({ params }) => {
  const slug = params?.slug || [];

  return {
    title: `B-shop-${slug[1] || "product"}`,
  };
};

const DynamicProductPage = async ({ params }) => {
  const slug = params?.slug || [];

  if (!slug || slug.length < 2) return <p>Invalid product URL</p>;

  const productSlug = slug[1];

  return <ProductDetails slug={productSlug} />;
};

export default DynamicProductPage;
