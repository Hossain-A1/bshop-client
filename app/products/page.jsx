import ProductItem from "@/components/ProductItem/ProductItem";
// 👇 Dynamic Metadata
export function generateMetadata({ searchParams }) {
  const searchTerm = searchParams?.search || "All Products";

  console.log("Meta Search Term:", searchTerm); // ✅ Should now log the actual search query

  return {
    title: `${searchTerm} - Buy Online | MyStore`,
    description: `Explore our wide range of ${searchTerm}. Shop now!`,
  };
}

const ProductPage = async () => {
  return <ProductItem />;
};

export default ProductPage;
