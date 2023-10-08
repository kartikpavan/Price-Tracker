"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const heroImages = [
  { imgURL: "/assets/lamp.png", alt: "lamp" },
  { imgURL: "/assets/smartwatch.png", alt: "smartwatch" },
  { imgURL: "/assets/microwave.png", alt: "microwave" },
  { imgURL: "/assets/bag.png", alt: "smartwatch" },
];

const HeroCarousel = () => {
  return (
    <div className="relative sm:px-10 py-5 sm:pt-20 max-w-[560px] h-[700px] rounded-[30px] w-full bg-gray-300 sm:mx-auto flex items-center justify-center">
      <Carousel
        // autoPlay={true}
        showThumbs={false}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
        // interval={2000}
      >
        {heroImages.map((image, idx) => {
          return (
            <Image
              src={image.imgURL}
              alt={image.alt}
              width={484}
              height={484}
              className="object-contain"
              key={idx}
            />
          );
        })}
      </Carousel>
      <Image
        src="/assets/arrow.png"
        width={175}
        height={175}
        className="max-10xl:hidden absolute bottom-0 -left-24 rotate-[30deg]"
        alt="arrow"
      />
    </div>
  );
};

export default HeroCarousel;
