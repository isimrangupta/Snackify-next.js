"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Image from "next/image";

import products from "@/app/JsonData/Arrivals.json";

import toast from "react-hot-toast";
import Link from "next/link";

const Arrivals = () => {
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

  const handleAddToWishlist = (product: any) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const existingProduct = wishlist.find(
      (item: any) => item.Id === product.Id
    );

    if (existingProduct) {
      toast(`${product.title} is already in the wishlist`, {
        icon: "⚠️",
        style: {
          border: "1px solid #facc15",
          padding: "16px",
          color: "#333",
          background: "#fff9c4",
        },
      });
    } else {
      wishlist.push({ ...product, qty: 1 });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("storageUpdate"));

      toast.success(`${product.title} added to wishlist!`);
    }
  };
  return (
    <>
      <div className="px-[8%] lg:px-[12%] py-10">
        <div className="title my-10 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
          <h1 className="text-5xl Unbounded">New Arrivals.</h1>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-5">
          <div className="w-full">
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                1200: { slidesPerView: 4 },
                991: { slidesPerView: 2.5 },
                575: { slidesPerView: 1 },
                0: { slidesPerView: 1 },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.Id}>
                  <div
                    className="product-wrap border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md 
                                   transition-all hover:border-[var(--prim-color)] duration-300 flex flex-col justify-between h-full"
                  >
                    {/* Image Section */}
                    <div className="relative flex justify-center items-center w-full h-[180px]">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={150}
                        height={150}
                        className="object-contain"
                      />

                      <div
                        onClick={() => handleAddToWishlist(product)}
                        className="absolute top-0 left-0 w-[50px] h-[50px] rounded-full bg-[#d4e2e4] 
                                       text-[var(--prim-color)] flex justify-center items-center"
                      >
                        <i className="bi bi-balloon-heart text-xl cursor-pointer"></i>
                      </div>

                      <span
                        className={`absolute off-product top-0 right-0 px-4 py-2 Merienda text-xs font-bold text-white rounded ${
                          product.sale === "New"
                            ? "bg-yellow-400"
                            : product.sale.includes("%")
                            ? "bg-red-500"
                            : "opacity-0"
                        }`}
                      >
                        {product.sale}
                      </span>
                    </div>

                    {/* Product Info */}
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

                    {/* Add to Cart Button at Bottom */}
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

export default Arrivals;
