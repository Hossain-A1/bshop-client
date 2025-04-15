import FeatureProducts from "@/components/FeatureProducts";
import Features from "@/components/Features";
import ProductItem from "@/components/ProductItem/ProductItem";

const page = () => {
  return (
    <div>
      <Features />
      <div className='mt-3 md:mt-6'>
        <FeatureProducts />
      </div>
      <ProductItem />
    </div>
  );
};

export default page;
