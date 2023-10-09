import HeroCarousel from "@/components/HeroCarousel";
import Searchbar from "@/components/Searchbar";
import { BiRightArrowAlt } from "react-icons/bi";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const allProducts = await getAllProducts(); // server action
  return (
    <>
      <section className="px-6 py-24 md:px-20 rounded-[20px]">
        <div className="flex max-10xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <p className="text-primary-focus">Smart Shopping Starts here</p>
              <BiRightArrowAlt />
            </div>
            <h1 className="text-5xl py-8 font-semibold">
              <span className="text-primary-focus">PriceTracker :</span>
              Track Prices with Precision
            </h1>
            <p className="text-gray-500 leading-8 tracking-wide">
              Experience the Future of Shopping with PriceTracker: Smarter
              Savings, Every Day, Guided by Expert Insights.
            </p>
            {/* Search BAR */}
            <Searchbar />
          </div>
          {/* Hero Carousel */}
          <HeroCarousel />
        </div>
      </section>
      <section className="px-6 py-4">
        <h2 className="text-4xl font-semibold">Trending</h2>
        {/* Product LIST */}
        <div className="flex flex-wrap gap-x-8 gap-y-16 py-10 items-center justify-center">
          {allProducts?.map((product, idx) => {
            // Product CARD
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </section>
    </>
  );
}
