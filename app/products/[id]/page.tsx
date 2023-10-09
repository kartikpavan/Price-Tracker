import PriceInfoCard from "@/components/PriceInfoCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import {
  AiOutlineShareAlt,
  AiOutlineStar,
  AiOutlineHeart,
  AiOutlineLineChart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiBookmark, BiMessageDetail } from "react-icons/bi";
import { ImPriceTags } from "react-icons/im";
import { FcLowPriority, FcHighPriority } from "react-icons/fc";
import SimilarProducts from "@/components/SimilarProducts";
const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = await getProductById(id);
  const similarProducts = await getSimilarProducts(id);

  if (!product) redirect("/");

  console.log(product);

  return (
    <div className="flex flex-col gap-16 flex-wrap px-6 md:px-20 py-24 w-full">
      <div className="flex gap-28 flex-col xl:flex-row w-full">
        {/* Image container */}
        <div className="flex-grow xl:max-w-[50%] max-w-full py-16 border border-gray-200 shadow-sm rounded-[17px]">
          <Image
            src={product?.image}
            alt={product?.productTitle}
            width={400}
            height={400}
            className="mx-auto bg-transparent"
          />
        </div>
        {/* content */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6 ">
            {/* Title and Link */}
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold">{product?.productTitle}</p>
              <Link
                href={product?.url}
                target="_blank"
                className="text-gray-400/70"
              >
                Visit Product
              </Link>
            </div>
            {/* Icons */}
            <div className="flex items-center justify-center gap-3">
              {/* Review Count */}
              <div className="flex items-center gap-2 px-3 py-1 bg-[#e3fad4] rounded-lg">
                <AiOutlineHeart className="text-lg text-primary" />
                <p className="text-primary">100</p>
              </div>
              {/* Wishlist product */}
              <div className="px-3 py-1 bg-base-200 rounded-lg">
                <BiBookmark className="text-xl" />
              </div>
              <div className="px-3 py-1 bg-base-200 rounded-lg">
                <AiOutlineShareAlt className="text-xl" />
              </div>
            </div>
          </div>
          {/* Product Info */}
          <div className="flex items-center flex-wrap gap-10 py-6 border-y border-y-[#E4E4E4]">
            {/* Price */}
            <div className="flex flex-col gap-2">
              <p className="text-4xl font-semibold text-primary-content">
                {product?.currency} {product?.currentPrice}
              </p>
              <p className="text-xl opacity-50 line-through">
                {product?.currency} {product?.originalPrice}
              </p>
            </div>
            {/* Ratings and reviews */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-base-200 rounded-lg">
                  <AiOutlineStar className="text-xl " />
                  <p className="text-sm font-semibold">
                    {product?.stars || "2.5"} Rating
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-base-200 rounded-lg">
                  <BiMessageDetail />
                  <p className="text-sm font-semibold">
                    {product?.reviewCount || 22} Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*  Price Cards */}
          <div className="my-6 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                Icon={ImPriceTags}
                value={`${product?.currency} ${product?.currentPrice}`}
                iconColor="text-secondary"
              />
              <PriceInfoCard
                title="Average Price"
                Icon={AiOutlineLineChart}
                value={`${product?.currency} ${product?.averagePrice}`}
                iconColor="text-error"
              />
              <PriceInfoCard
                title="Highest Price"
                Icon={FcHighPriority}
                value={`${product?.currency} ${product?.highestPrice}`}
                iconColor="text-warning"
              />
              <PriceInfoCard
                title="Lowest Price"
                Icon={FcLowPriority}
                value={`${product?.currency} ${product?.lowesetPrice}`}
                iconColor="text-neutral"
              />
            </div>
          </div>
          {/* Modal for Tracking the product */}
          MODAL
        </div>
      </div>
      <div className="flex flex-col gap-16 w-full">
        {/* Buy Now Button */}
        <div className="w-full max-w-sm mx-auto btn btn-outline">
          <AiOutlineShoppingCart className="text-lg" />
          Buy Now
        </div>
        {/* Similar Products */}
        {similarProducts && similarProducts?.length > 0 && (
          <SimilarProducts productId={id} />
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
