"use client"
import FeatureProducts from '@/components/FeatureProducts';
import Features from '@/components/Features';
import ProductItem from '@/components/ProductItem/ProductItem';
import { useSelector } from 'react-redux';

const page = () => {
  const { products, searchResults,loading,error } = useSelector((state) => state.product);

  return (
    <div>
      <Features/>
      <div className= 'mt-3 md:mt-6'>
        <FeatureProducts />
      </div>
      <ProductItem products={products} loading={loading} error={error} />

    </div>
  )
}

export default page