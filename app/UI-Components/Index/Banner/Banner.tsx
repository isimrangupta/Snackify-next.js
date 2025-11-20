"use client";
import Image from "next/image";
import deliveryMan from "@/public/delivery-man.png";
import SpecialSnacks from "@/public/special-snacks-img.png";

const Banner = () => {
  return (
    <>
      <div className="px-[8%] lg:px-[12%] pb-10">
        <div className="banner h-[300px] relative rounded-2xl flex justify-center items-center ">
          <div className="flex flex-col items-center">
            <Image
            src={deliveryMan}
            alt="deliveryMen"
            className="banner-img1 absolute -bottom-10 left-5"
          />
            <h1 className="text-white text-4xl leading-15 text-center Merienda">
              We Delivery on Next Day from 10:00 <br /> AM to 08:00 PM
            </h1>
            <p className="text-white">For orders starts from $100</p>
            <button className="px-8 py-3 my-3 text-lg font-semibold text-[var(--prim-color)] bg-[var(--prim-light)] rounded-md text-md hover:bg-white hover:[var(--prim-color)] cursor-pointer transition-all duration-300">Shop Now <i className="bi bi-cart"></i></button>
            
          </div>
          <Image
            src={SpecialSnacks}
            alt="SpecialSnacks"
            className="banner-img2 w-[30%] absolute  right-0"
          />
        </div>
        
      </div>
    </>
  );
};

export default Banner;
