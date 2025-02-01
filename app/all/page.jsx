"use client";
import { fetchAllProducts, seeMoreProducts } from "@/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

const All = () => {
  const dispatch = useDispatch();
  const { products, loading, error, pagination } = useSelector((state) => state.product);

  console.log(products);
  console.log(pagination);

  const handleSeeMore = () => {
    if (pagination.currentLoad < pagination.totalLoad) {
      dispatch(seeMoreProducts());
      dispatch(fetchAllProducts({ endpoint: "/list", load: pagination.currentLoad + 1, limit: 1 }));
    }
  };

  return (
    <div>
  

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <h3>{product.title}</h3>
              <p>Price: {product.price} BDT</p>
            </div>
          ))
        ) : (
          !loading && <p>No products found</p>
        )}
      </div>

      {pagination.currentLoad < pagination.totalLoad && (
        <button className="cursor-pointer" onClick={handleSeeMore} disabled={loading}>
          {loading ? "Loading..." : "See More"}
        </button>
      )}
    </div>
  );
};

export default All;
