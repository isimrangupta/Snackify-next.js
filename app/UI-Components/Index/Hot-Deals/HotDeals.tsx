"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import products from "@/app/JsonData/HotDetail.json";

import toast from "react-hot-toast";
import Link from "next/link";
import { useEffect, useState } from "react";

import hotDealBanner from "@/public/hot-deals-img.png";

const HotDeals = () => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(saved.map((item: any) => item.Id));
  }, []);

  const handleAddToWishlist = (product: any) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const exists = wishlist.find((item: any) => item.Id === product.Id);

    if (exists) {
   
      wishlist = wishlist.filter((item: any) => item.Id !== product.Id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      setWishlistItems((prev) => prev.filter((id) => id !== product.Id));

      toast(`${product.title} removed from wishlist`, {
        icon: "❌",
        style: { border: "1px solid red", padding: "14px", background: "#ffe6e6" }
      });
    } else {
      // ADD
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      setWishlistItems((prev) => [...prev, product.Id]);

      toast.success(`${product.title} added to wishlist!`);
    }
  };

  const handleAddToCart = (product: any) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProduct = cart.find((item: any) => item.Id === product.Id);

    if (existingProduct) {
      toast(`${product.title} is already in the cart`, {
        icon: "⚠️",
        style: {
          border: "1px solid #facc15",
          padding: "16px",
          color: "#333",
          background: "#fff9c4",
        },
      });
    } else {
      cart.push({ ...product, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storageUpdate"));

      toast.success(`${product.title} added to cart!`);
    }
  };

  return (
    <>
      <div className="px-[8%] lg:px-[12%] pb-10 ">
        <div className="title my-10 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
          <h1 className="text-5xl Unbounded">Today's Hot Deals.</h1>
        </div>

        <div className="flex flex-col lg:flex-row item-start gap-5">
          <div className="w-full lg:w-1/3 p-10 rounded-2xl hot-deal-banner flex flex-col justify-center items-center">
            <Image src={hotDealBanner} alt="hotDealBanner" />
            <h1 className="text-4xl Merienda text-white my-5">
              Fresh Vegetable
            </h1>

            <p className="text-center text-white font-semibold mb-3">
              Get the freshest vegetables delivered to your doorstep.
            </p>

            <button className="px-6 py-3 my-2 text-lg font-semibold text-[#095649] bg-white rounded-2xl cursor-pointer hover:bg-[#182f2b] hover:text-white">
              Shop Now <i className="bi bi-cart"></i>
            </button>
          </div>

          <div className="w-full lg:w-2/3">
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                1200: { slidesPerView: 3 },
                991: { slidesPerView: 2 },
                575: { slidesPerView: 1 },
                0: { slidesPerView: 1 },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.Id}>
                  <div className="product-wrap border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md 
                    transition-all hover:border-[var(--prim-color)] duration-300 flex flex-col justify-between h-full">

                    {/* Image Section */}
                    <div className="relative flex justify-center items-center w-full h-[180px]">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={180}
                        height={180}
                        className="object-contain"
                      />

                      <div
                        onClick={() => handleAddToWishlist(product)}
                        className={`absolute top-0 left-0 w-[50px] h-[50px] rounded-full flex justify-center items-center cursor-pointer
                          ${
                            wishlistItems.includes(product.Id)
                              ? "bg-green-500 text-white"
                              : "bg-[#d4e2e4] text-[var(--prim-color)]"
                          }
                        `}
                      >
                        <i className="bi bi-balloon-heart text-xl"></i>
                      </div>

                      <span
                        className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold text-white rounded ${
                          product.sale === "New"
                            ? "bg-yellow-400"
                            : product.sale.includes("%")
                            ? "bg-red-500"
                            : ""
                        }`}
                      >
                        {product.sale}
                      </span>
                    </div>

                    <div className="mt-5 flex-1">
                      <Link
                        href={{
                          pathname: "/UI-components/Shop",
                          query: { id: product.Id },
                        }}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-sm line-through">
                              {product.lessprice}
                            </span>
                            <span className="text-xl font-semibold">
                              {product.price}
                            </span>
                          </div>

                          <span className="flex items-center text-yellow-500 font-medium text-sm">
                            <i className="bi bi-star-fill me-1"></i>
                            {product.review}
                          </span>

                          <h2 className="text-xl text-gray-500 font-normal my-2 hover:text-[var(--prim-color)]">
                            {product.title}
                          </h2>

                          <h6 className="text-lg text-gray-500 flex items-center gap-1">
                            <i className="bi bi-shop text-[var(--prim-color)]"></i>
                            By Luck Supermarket
                          </h6>

                          <h3 className="mt-2 text-md text-gray-600">
                            Sold: {product.sold}
                          </h3>
                        </div>
                      </Link>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 px-4 py-2 font-semibold text-white bg-[#789a9e] rounded-md 
                      hover:bg-[#2b5960] w-full cursor-pointer"
                    >
                      Add To Cart <i className="bi bi-cart"></i>
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotDeals;