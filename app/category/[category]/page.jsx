"use client";
import CategoryProduct from "@/components/ProductItem/CategoryProduct";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL (e.g., "bag-wallet")
  const { products } = useSelector((state) => state.product);
  
  // ✅ Slugify function
  const slugify = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/[\s&']+/g, "-") // Convert spaces, "&", and apostrophes to "-"
      .replace(/[^a-z0-9-]/g, ""); // Remove special characters
    };
    
  // Decode the category for display (e.g., "bag-wallet" -> "bag & wallet")
  const decodedCategory = decodeURIComponent(category.replace(/-/g, " "));


  // ✅ Compare slugified values to match correctly
  const filteredProducts = products?.filter(
    (item) => slugify(item.category) === category // Compare slugified database category with URL parameter
  );

  if (!filteredProducts || filteredProducts.length === 0) {
    return <p className="text-gray-500 mt-4">No products found in this category.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold capitalize">
        {decodedCategory} Collection
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {filteredProducts.map((product) => (
          <CategoryProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;