"use client";
import ProductItem from "@/components/ProductItem/ProductItem";
import { useSelector } from "react-redux";

const ProductPage = ({ params }) => {
  console.log(params);
  const { products, searchResults, loading, error } = useSelector(
    (state) => state.product
  );
  const displayedProducts = searchResults.length > 0 ? searchResults : products;

  return (
    <div className='min-h-screen'>
      {displayedProducts.length > 0 ? (
        <ProductItem
          products={displayedProducts}
          loading={loading}
          error={error}
        />
      ) : (
        <div className='h-full flex items-center justify-center'>
          <h2 className='text-red-700 text-2xl lg:text-4xl text-center font-semibold'>
            No products found. Please search again.
          </h2>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
