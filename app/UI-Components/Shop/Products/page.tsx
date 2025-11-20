"use client";

import Image from "next/image";
import products from "@/app/JsonData/Recommend.json";

import toast from "react-hot-toast";

import Link from "next/link";
import { useEffect, useState } from "react";

const Products = () => {
  const [price, setPrice] = useState(0);
  const [discount50, setDiscount50] = useState(false);
  const [discount30, setDiscount30] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const [filterProducts, setFliterProducts] = useState(products);

  useEffect(() => {
      let result = products;
      result = result.filter((p) => {
        const productPrice = parseFloat(p.price.replace(/[^0-9.-]+/g, ""));
        return productPrice <= price;
      });

       if (discount50) {
        result = result.filter((p) => p.sale.includes("50%"));
      }

      if (discount30) {
        result = result.filter((p) => p.sale.includes("30%"));
      }

      if (isNew) {
        result = result.filter((p) => p.sale === "New");
      }

      setFliterProducts(result);
  }, [price, discount50, discount30, isNew]);



  const randomProduct = products[Math.floor(Math.random() * products.length)];

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
    <div className="px-[8%] lg:px-[12%] py-10  mb-7">
      <div className="mt-10">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          {/* Slidebar */}
          <div className="w-full md:w-1/2 lg:w-1/3 relative lg:sticky top-22 left-0 h-full">
            <div className="border border-gray-300 shadow rounded p-3 ">
              <div className="border-b w-full border-gray-300 pb-3 flex items-center justify-between">
                <h2 className="text-xl Unbounded">Product Category</h2>
                <button
                  onClick={() => setFliterProducts(products)}
                  className="border border-gray-300 px-2 py-1  rounded cursor-pointer hover:border-gray-500 transition-all duration-300"
                >
                  Reset
                </button>
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-medium mb-2">Price Range</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 text-sm font-medium">$0</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full accent-[var(--prim-color)]"
                  />
                  <span className="text-gray700 text-sm font-medium">
                    ${price}
                  </span>
                </div>
              </div>
              {/* Discount */}
              <div className="mt6">
                <h3 className="text-lg  font-semibold mb-2">Discount</h3>
                <form className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={discount50}
                      onChange={(e) => setDiscount50(e.target.checked)}
                      className="form-checkbox accent-[var(--prim-color)]"
                    />
                    <span>50% off</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={discount30}
                      onChange={(e) => setDiscount30(e.target.checked)}
                      className="form-checkbox accent-[var(--prim-color)]"
                    />
                    <span>30% off</span>
                  </label>
                </form>
              </div>

              {/* other */}
              <div className="mt-2">
                <h3 className="text-lg font-semibold mb-2">Other</h3>
                <form className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNew}
                      onChange={(e) => setIsNew(e.target.checked)}
                      className="form-checkbox accent-[var(--prim-color)]"
                    />
                    <span>New Products</span>
                  </label>
                </form>
              </div>
            </div>

            {/* Random Product */}
            <div
              key={randomProduct.Id}
              className="product-wrap border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all hover:border-[var(--prim-color)] cursor-pointer duration-300"
            >
              <div className="relative flex justify-center items-center w-full h-20">
                <Image
                  src={randomProduct.image}
                  alt={randomProduct.title}
                  width={70}
                  height={70}
                  className="object-contain mt-10"
                />

                <div
                  onClick={() => handleAddToWishlist(randomProduct)}
                  className="absolute top-0 left-0 w-[50px] h-[50px] rounded-full bg-[#d4e2e4] text-[var(--prim-color)] flex justify-center items-center hover:bg-[var(--prim-color)] hover:text-white transition-all duration-300"
                >
                  <i className="bi bi-balloon-heart text-xl"></i>
                </div>

                <span
                  className={`absolute off-product top-0 right-0 px-4 py-2 Merienda text-xs font-bold text-white rounded ${
                    randomProduct.sale === "New"
                      ? "bg-yellow-400"
                      : randomProduct.sale.includes("%")
                      ? "bg-red-500"
                      : "opacity-0"
                  }`}
                >
                  {randomProduct.sale}
                </span>
              </div>

              <div className="space-y-1  product-info">
                <Link
                  href={{
                    pathname: "/UI-Components/Shop/ProductDetails",
                    query: { id: randomProduct.Id },
                  }}
                  className="flex-1"
                >
                  <div className="space-y-1 mt-5 product-info">
                    <div className="flex items-center gap-2 ">
                      <span className="text-gray-500 text-sm line-through">
                        {randomProduct.lessprice}
                      </span>
                      <span className="text-sm font-semibold">
                        {randomProduct.price}
                      </span>
                      <span className="text-gray-500 text-sm">Qty</span>
                    </div>
                    <span className="flex items-center text-yellow-500 font-medium textsm]">
                      <i className="bi bi-star-fill me-1">
                        {randomProduct.review}
                      </i>
                    </span>
                    <h2 className="text-lg text-gray-500 font-normal Unbounded my-2 hover:text-[var(--prim-color)] transition-all duration-300">
                      {randomProduct.title}
                    </h2>
                    <h6 className="text-sm text-gray-500 flex items-center gap-1">
                      <i className="bi bi-shop text-sm text-[var(--prim-color)]"></i>{" "}
                      By Luck Supermarket
                    </h6>
                    <h3 className=" Unbounded text-sm text-gray-600 mt-1">
                      Sold: {randomProduct.sold}
                    </h3>
                  </div>
                </Link>

                {/* Button always at bottom */}
                <button
                  onClick={() => handleAddToCart(randomProduct)}
                  className="mt-1 px-4 font-semibold text-gray-500 bg-[#b8c6c8] rounded-md text-md hover:bg-[#ae8704] hover:text-white cursor-pointer transition w-full h-9"
                >
                  Add To Cart <i className="bi bi-cart"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Product  Grid */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3 lg:mt-0 mt-20">
            {filterProducts.length > 0 ? (
              filterProducts.map((product) => (
                <div
                  key={product.Id}
                  className="product-wrap border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all hover:border-[var(--prim-color)] cursor-pointer duration-300"
                >
                  <div className="relative flex justify-center items-center w-full h-50">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={180}
                      height={180}
                      className="object-contain mt-10"
                    />

                    <div
                      onClick={() => handleAddToWishlist(product)}
                      className="absolute top-0 left-0 w-[50px] h-[50px] rounded-full bg-[#d4e2e4] text-[var(--prim-color)] flex justify-center items-center hover:bg-[var(--prim-color)] hover:text-white transition-all duration-300"
                    >
                      <i className="bi bi-balloon-heart text-xl"></i>
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

                  <div className="space-y-1 mt-5 product-info ">
                    <Link
                      href={{
                        pathname: "/shop/" + product.Id,
                        query: { id: product.Id },
                      }}
                      className="flex-1"
                    >
                      <div className="space-y-1 mt-5 product-info">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-sm line-through">
                            {product.lessprice}
                          </span>
                          <span className="text-xl font-semibold">
                            {product.price}
                          </span>
                          <span className="text-gray-500 text-sm">Qty</span>
                        </div>
                        <span className="flex items-center text-yellow-500 font-medium">
                          <i className="bi bi-star-fill me-1">
                            {product.review}
                          </i>
                        </span>
                        <h2 className="text-xl text-gray-500 font-normal Unbounded my-2 hover:text-[var(--prim-color)] transition-all duration-300">
                          {product.title}
                        </h2>
                        <h6 className="text-lg text-gray-500 flex items-center gap-1">
                          <i className="bi bi-shop text-[var(--prim-color)]"></i>{" "}
                          By Luck Supermarket
                        </h6>
                        <h3 className="mt-2 Unbounded text-md text-gray-600">
                          Sold: {product.sold}
                        </h3>
                      </div>
                    </Link>

                    {/* Button always at bottom */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 px-4 font-semibold text-white bg-[#b8c6c8] rounded-md text-md hover:bg-[#2b5960] hover:text-white cursor-pointer transition w-full h-10"
                    >
                      Add To Cart <i className="bi bi-cart"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-bold border-b h-7 text-gray-500">
                No Product Found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
