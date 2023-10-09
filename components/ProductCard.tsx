import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductProps {
  product: {
    _id?: string;
    productURL: string;
    currency: string;
    image: string;
    productTitle: string;
    currentPrice: number;
    originalPrice: number;
    priceHistory: Array<{ price: number }> | [];
    highestPrice: number;
    lowestPrice: number;
    averagePrice: number;
    discountRate: number;
    description: string;
    category: string;
    reviewsCount: number;
    stars: number;
    isOutOfStock: Boolean;
    users?: Array<{ price: number }>;
  };
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <Link
      href={`/products/${product?._id}`}
      className="sm:w-[292px] sm:max-w-[292px] flex-1 w-full flex flex-col gap-4 rounded-md shadow-md p-4"
    >
      <div className="flex-1 relative flex flex-col gap-5 p-4 rounded-md  ">
        <Image
          src={product?.image}
          alt={product?.productTitle}
          width={200}
          height={200}
          className="bg-transparent w-full h-full object-contain max-h-[250px]"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold leading-5 truncate">
          {product?.productTitle}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-black capitalize opacity-50">
            {product?.category}
          </p>
          <p className="text-lg font-semibold text-primary duration-200 ease-in-out transition-all hover:underline hover:text-primary-content">
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
