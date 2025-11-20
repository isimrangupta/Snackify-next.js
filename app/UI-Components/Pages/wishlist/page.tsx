"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type WishlistItem = {
  Id: string;
  title: string;
  price: string;
  review: string;
  image: string;
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from LocalStorage

  useEffect(() => {
    const loadWishlist = () => {
      try {
        const wishlist: WishlistItem[] = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        setWishlistItems(wishlist);
      } catch (error) {
        console.error("Failed to load wishlist", error);
        setWishlistItems([]);
      }
    };

    loadWishlist();
    window.addEventListener("storageUpdate", loadWishlist);
    return () => window.removeEventListener("storageUpdate", loadWishlist);
  }, []);

  //   Remove Product from Wishlist
  const handleRemove = (productId: string) => {
    const updateWishlist = wishlistItems.filter(
      (item) => item.Id !== productId
    );
    localStorage.setItem("wishlist", JSON.stringify(updateWishlist));
    window.dispatchEvent(new Event("storageUpdate"));
    toast.success("Product Removed From Wishlist");
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
      <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
        <div className="flex justify-between items-center">
          <h2 className="Unbounded text-2xl">Wishlist</h2>
          <div className="flex">
            <Link href="/" className="text-2xl Unbounded">
              Home &nbsp; :
            </Link>
            <h2 className="Unbounded text-2xl text-[var(--prim-color)]">
              &nbsp; Wishlist
            </h2>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] py-5">
        {wishlistItems.length === 0 ? (
          <p className="text-lg bg-red-200 px-5 py-2 rounded">
            You Wishlist is Empty !
          </p>
        ) : (
          <div className="overflow-x-auto">
            <div className="overflow-x-auto">
              {/* Desktop List */}
              <table className="min-w-full border border-gray-300 rounded hidden md:table">
                <thead className="bg-[#E6F9EF] ">
                  <tr>
                    <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left">
                      Product
                    </th>

                    <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left">
                      Price
                    </th>

                    <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left">
                      Stock Status
                    </th>

                    <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left">
                      Add to Cart
                    </th>

                    <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left">
                      Remove
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {wishlistItems.map((item) => (
                    <tr key={item.Id} className="border-b border-gray-300">
                      <td className="py-3 px-4 flex items-center gap-3 border-r border-gray-300">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-contain rounded"
                        />
                        <div className="flex flex-col">
                          <p className="font-medium Unbounded text-xl">
                            {item.title}
                          </p>
                          <h6 className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <i className="bi bi-shop text-[var(--prim-color)]"></i>
                            By Lucky Supermarket
                          </h6>

                          <span className="flex items-center text-yellow-500 font-medium">
                            <i className="bi bi-star-fill me-1">
                              {item.review} Review
                            </i>
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 Unbounded border-r border-gray-300">
                        $
                        {parseFloat(
                          item.price.replace(/[^0-9.-]+/g, "")
                        ).toFixed(2)}
                      </td>

                      <td className="py-3 px-4 Unbounded border-r border-gray-300">
                        In stock
                      </td>

                      <td className="px-3 border-r border-gray-300">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full px-4 py-2 text-lg font-semibold text-[var(--prim-color)]  bg-[#cddee0]  rounded-md hover:bg-[var(--prim-color)] hover:text-white transition cursor-pointer"
                        >
                          Add to Cart <i className="bi bi-cart"></i>
                        </button>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          onClick={() => handleRemove(item.Id)}
                        >
                          X Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile List */}
              <div className="md:hidden space-y-4">
                {wishlistItems.map((item) => (
                  <div
                    key={item.Id}
                    className="border border-gray-300 rounded-lg p-4 flex flex-col bg-white shadow-sm"
                  >
                    {/* Image and Details */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-contain rounded"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium Unbounded text-lg text-gray-800">
                          {item.title}
                        </p>
                        <h6 className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <i className="bi bi-shop text-[var(--prim-color)]"></i>
                          By Lucky Supermarket
                        </h6>
                        <span className="flex items-center text-yellow-500 font-medium">
                          <i className="bi bi-star-fill me-1"></i>
                          {item.review} Reviews
                        </span>
                      </div>
                    </div>

                    {/* Price and Stock */}
                    <div className="mt-3 flex flex-col">
                      <span className="Unbounded text-gray-700 text-lg font-semibold">
                        $
                        {parseFloat(
                          item.price.replace(/[^0-9.-]+/g, "")
                        ).toFixed(2)}
                      </span>
                      <span className="text-gray-600 text-sm">
                        Status: In Stock
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 px-4 py-2 text-yellow-600 font-semibold bg-[#c2d5d7] rounded-md hover:bg-yellow-700 hover:text-white transition cursor-pointer"
                      >
                        Add to Cart <i className="bi bi-cart"></i>
                      </button>
                      <button
                        onClick={() => handleRemove(item.Id)}
                        className="flex-1 px-4 py-2 font-semibold text-red-400 hover:text-red-700 transition cursor-pointer text-right"
                      >
                        X Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
