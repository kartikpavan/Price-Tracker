import { getSimilarProducts } from "@/lib/actions";
import React from "react";
import ProductCard from "./ProductCard";

const SimilarProducts = async ({ productId }: { productId: string }) => {
  const similarProducts = await getSimilarProducts(productId);

  return (
    <>
      <section className="px-6 py-4">
        <h2 className="text-2xl font-semibold">Similar Products</h2>
        {/* Product LIST */}
        <div className="flex flex-wrap gap-x-8 gap-y-16 py-10 items-center justify-center">
          {similarProducts?.map((product) => {
            // Product CARD
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </section>
    </>
  );
};

export default SimilarProducts;
