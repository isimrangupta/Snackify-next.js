"use client";
import Link from "next/link";

// All json Data
import BestDeals from "@/app/JsonData/BestDeals.json";
import Arrivals from "@/app/JsonData/Arrivals.json";
import BestSales from "@/app/JsonData/BestSales.json";
import OrganicFood from "@/app/JsonData/OrganicFood.json";
import Recommend from "@/app/JsonData/Recommend.json";
import ShortProducts from "@/app/JsonData/ShortProducts.json";
import Vendors from "@/app/JsonData/Vendors.json";
import HotDetail from "@/app/JsonData/HotDetail.json";

import { useEffect, useMemo, useState } from "react";

interface ProductType {
  Id: string;
  title?: string;
  Name?: string;
  ProductImage?: string;
  image?: string;
  price?: string;
  Price?: string;
}

const MiddleNav = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  //  Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ProductType[]>([]);

  const allProducts : ProductType[] = useMemo(
    () => [
      ...Arrivals,
      ...BestDeals,
      ...BestSales,
      ...OrganicFood,
      ...Recommend,
      ...HotDetail,
      ...(ShortProducts?.Featured?.map((p) => ({
        ...p,
        Id: `Featured-${p.Id}`,
      })) || []),
      ...(ShortProducts?.TopSelling?.map((p) => ({
        ...p,
        Id: `Featured-${p.Id}`,
      })) || []),
      ...(ShortProducts?.OnSale?.map((p) => ({
        ...p,
        Id: `Featured-${p.Id}`,
      })) || []),
      ...(ShortProducts?.TopRated?.map((p) => ({
        ...p,
        Id: `Featured-${p.Id}`,
      })) || []),
    ],
    []
  );

  //Filter Product by search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    const filtered = allProducts.filter((p) =>
      (p.Name || p.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }, [searchTerm, allProducts]);

  useEffect(() => {
    const loadCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      const uniqueCart = new Set(cart.map((item: any) => item.Id));
      const uniqueWishlist = new Set(wishlist.map((item: any) => item.Id));

      setCartCount(uniqueCart.size);
      setWishlistCount(uniqueWishlist.size);
    };

    loadCounts();
    window.addEventListener("storageUpdate", loadCounts);
    return () => window.removeEventListener("storageUpdate", loadCounts);
  }, []);

  return (
    <div className="w-full bg-[var(--prim-light)] border-b border-gray-300 relative">
      <div className="flex items-center justify-between py-5 px-[8%] lg:px-[12%]">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold Merienda text-gray-200">
          Snacki<span className="text-[var(--prim-color)] ">fy</span>
        </Link>


        {/* Search */}
        <div className="flex flex-1 ms-6 lg:mx-0 max-w-xl relative">
          <input
            type="text"
            placeholder="Search for product on Brand"
            className="flex-1 border px-3 py-2 rounded-s-lg border-gray-500 outline-none text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-[var(--prim-color)] text-white px-3 rounded-r cursor-pointer">
            <i className="bi bi-search"></i>
          </button>
          

          {/* Search Result */}
          {results.length > 0 && (
            <div className="search -result absolute top-12 left-0 bg-white border-gary-300 rounded-md shadow-lg z-50 p-2 grid grid-cols-1 lg:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto">
              {results.map((item, index) => (
                <Link
                  key={`${item.Id}-${index}`}
                  href={{
                    pathname: "/UI-Components/Shop",
                    query: { id: item.Id },
                  }}
                  onClick={() => setSearchTerm("")}
                >
                  <div className="flex flex-col items-center p-2 border border-gray-300 rounded hover:shadow-lg transition-all">
                    <img
                      src={item.ProductImage || item.image}
                      alt={item.Name || item.title}
                      className="w-full object-cover rounded"
                    />
                    <h3 className="font-semibold text-sm text-center mt-2">
                      {item.Name || item.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">
                      ${item.price || item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Location dropdown */}
          <div className="hidden lg:flex text-sm ms-5 bg-white items-center ps-4 rounded-lg border border-gray-400">
            <i className="bi bi-geo-alt text-lg text-[var(--prim-color)]"></i>

            <select
              name="location"
              className="px-3 rounded-lg text-[var(--prim-color)] font-semibold appearance-none cursor-pointer outline-none"
              defaultValue="India"
            >
              <option>India</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Kolkata</option>
              <option>Chennai</option>
              <option>Bangalore</option>
              <option>Siliguri</option>
              <option>Patna</option>
              <option>Jaipur</option>
              <option>Hyderabad</option>
            </select>
          </div>
        </div>

        {/* Wishlist & Cart */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Wishlist */}
          <Link href="/UI-Components/Pages/wishlist" className="relative">
            <i className="bi bi-heart text-gray-400 text-xl hover:text-[var(--prim-color)] transition-all">
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--prim-color)] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </i>
          </Link>

          {/* Cart */}
          <Link href="/UI-Components/Pages/cart" className="relative">
            <i className="bi bi-cart text-gray-400 text-xl hover:text-[var(--prim-color)] transition-all">
              {" "}
            </i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--prim-color)] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MiddleNav;
