import CategoryProduct from "@/components/ProductItem/CategoryProduct";
export const generateMetadata = ({ params }) => {
  const category = params?.category;
  console.log(params);
  return {
    title: `b-shop-category - ${category}` || "category",
  };
};
const CategoryPage = async ({ params }) => {
  const category = params?.category || "category";

  return (
    <div>
      <h1 className='text-xl font-bold capitalize'>{category} Collection</h1>
      <CategoryProduct category={category} />
    </div>
  );
};

export default CategoryPage;
