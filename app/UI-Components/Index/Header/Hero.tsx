"use client";

import Image from "next/image";
import Hero1 from "@/public/hero-img1.png";
import Hero2 from "@/public/hero-img2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Hero = () => {
  return (
    <div className="px-[8%] lg:px-[12%] py-5">
      <div className="relative p-10 px-20 Hero flex items-center gap-5">
        <Swiper
          slidesPerView={1}
          loop={true}
          grabCursor={true}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="hero-wrap w-full flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full">
                <h1 className="Merienda text-2xl lg:text-[3.6rem] font-bold">
                  Order Daily Groceries and Get Fast Delivery
                </h1>
                <p className="w-[80%] my-3">
                  Buy your groceries online and enjoy express delivery at your doorstep.
                </p>
                <button className="px-5 py-3 rounded-full text-white font-bold mt-5 bg-[var(--prim-color)] hover:bg-white hover:text-[var(--prim-color)] transition-all duration-300 cursor-pointer">
                  Shop Now <i className="bi bi-cart3 ps-3 "></i>
                </button>
              </div>

              <div className="hero-image w-full lg:w-1/2">
                <Image src={Hero1} alt="Hero1" className="Hero-image" />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="hero-wrap w-full flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full">
                <h1 className="Merienda text-2xl lg:text-[3.6rem] font-bold">
                  Order Daily Groceries and Get Fast Delivery
                </h1>
                <p className="w-[80%] my-3">
                  Buy your groceries online and enjoy express delivery at your doorstep.
                </p>
                <button className="px-5 py-3 rounded-full text-white font-bold mt-5 bg-[var(--prim-color)] hover:bg-white hover:text-[var(--prim-color)] transition-all duration-300 cursor-pointer">
                  Shop Now <i className="bi bi-cart3 ps-3 "></i>
                </button>
              </div>

              <div className="hero-image w-full lg:w-1/2">
                <Image src={Hero2} alt="Hero2" className="Hero-image" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;