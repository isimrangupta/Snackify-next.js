"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartItem = {
  Id: string;
  title: string;
  price: string;
  review: string;
  qty?: number;
  image: string;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtital] = useState<number>(0);

  const estimatedTaxes = 10;

  useEffect(() => {
    const loadCart = () => {
      try {
        const cart: CartItem[] = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        setCartItems(cart);

        const total = cart.reduce((acc: number, item: CartItem) => {
          const quantity = item.qty ?? 1;
          const priceNum =
            parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
          return acc + priceNum * quantity;
        }, 0);
        setSubtital(total);
      } catch (error) {
        console.error("Failed to load Cart", error);
        setCartItems([]);
        setSubtital(0);
      }
    };

    loadCart();
    window.addEventListener("storageUpdate", loadCart);
    return () => window.removeEventListener("storageUpdate", loadCart);
  }, []);

  const handleRemove = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.Id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storageUpdate"));
    toast.success("Product Removed From Cart!");
  };

  const handleQtyChange = (productId: string, qty: number) => {
    const updatedCart = cartItems.map((item) =>
      item.Id === productId ? { ...item, qty } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storageUpdate"));
  };

  return (
    <>
      <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
        <div className="flex justify-between items-center">
          <h2 className="Unbounded text-2xl">Shopping Cart</h2>
          <div className="flex">
            <Link href="/" className="text-2xl Unbounded">
              Home &nbsp; :
            </Link>
            <h2 className="Unbounded text-2xl text-[var(--prim-color)]">
              &nbsp; Cart
            </h2>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] py-10">
        {cartItems.length === 0 ? (
          <p className="text-lg bg-red-200 px-5 py-2 rounded">
            You Wishlist is Empty !
          </p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded hidden md:table">
                  <thead className="bg-[#E6F9EF] ">
                    <tr>
                      <th className="py-3 px-4 Unbounded font-normal text-left">
                        Product
                      </th>

                      <th className="py-3 px-4 Unbounded font-normal text-left">
                        Price
                      </th>

                      <th className="py-3 px-4 Unbounded font-normal text-left">
                        Quantity
                      </th>

                      <th className="py-3 px-4 Unbounded font-normal text-left">
                        Subtotal
                      </th>

                      <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item: CartItem) => {
                      const quantity = item.qty ?? 1;
                      const priceNum =
                        parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
                      const itemSubtotal = priceNum * quantity;

                      return (
                        <tr key={item.Id} className="border-b border-gray-300">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="object-contain rounded"
                            />
                            <div>
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

                          <td className="py-3 px-4 Unbounded">
                            ${priceNum.toFixed(2)}
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-2 border w-24 rounded-full bg-[#E6F9EF]">
                              <button
                                className="flex text-lg cursor-pointer"
                                onClick={() =>
                                  handleQtyChange(
                                    item.Id,
                                    Math.max(1, quantity - 1)
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="px-4">{quantity}</span>
                              <button
                                className="flex text-lg cursor-pointer"
                                onClick={() =>
                                  handleQtyChange(item.Id, quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td className="py-3 px-4 Unbounded">
                            ${itemSubtotal.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 Unbounded">
                            <button
                              className="py-3 text-red-500 hover:text-red-700 cursor-pointer"
                              onClick={() => handleRemove(item.Id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Mobile List */}
                <div className="md:hidden space-y-4">
                  {cartItems.map((item) => {
                    const quantity = item.qty ?? 1;
                    const priceNum =
                      parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
                    const itemSubtotal = priceNum * quantity;

                    return (
                      <div
                        key={item.Id}
                        className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
                      >
                        {/* IMAGE + TITLE + SHOP + REVIEWS */}
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            className="w-20 h-20 object-contain"
                            alt={item.title}
                          />
                          <div className="flex flex-col">
                            <p className="font-medium Unbounded text-lg text-gray-800">
                              {item.title}
                            </p>

                            <h6 className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <i className="bi bi-shop text-[var(--prim-color)]"></i>
                              By Lucky Supermarket
                            </h6>

                            <span className="flex items-center text-yellow-500 text-sm font-medium">
                              <i className="bi bi-star-fill me-1"></i>
                              {item.review} Reviews
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between items-end">
                          <div className="flex flex-col gap-2">
                            <span className="text-lg font-semibold text-gray-800">
                              ${priceNum.toFixed(2)}
                            </span>

                            <span className="text-sm text-gray-600 font-medium">
                              Subtotal: ${itemSubtotal.toFixed(2)}
                            </span>

                            <div className="flex items-center justify-between w-24 h-8 bg-[#E6F9EF] rounded-full border">
                              <button
                                className="w-7 h-7 flex items-center justify-center text-lg"
                                onClick={() =>
                                  handleQtyChange(
                                    item.Id,
                                    Math.max(1, quantity - 1)
                                  )
                                }
                              >
                                -
                              </button>

                              <span className="text-sm font-medium">
                                {quantity}
                              </span>

                              <button
                                className="w-7 h-7 flex items-center justify-center text-lg"
                                onClick={() =>
                                  handleQtyChange(item.Id, quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => handleRemove(item.Id)}
                            className="text-red-500 font-semibold Unbounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 sticky h-[100%] top-22 left-0 ">
              <div className="bg-[#d0ebe8] p-5 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-[#72570d] mb-4">
                  Cart Totle
                </h2>
                <div className="flex justify-between mb-2 text-[#5b5858]">
                  <span className="Unbounded">Subtotal</span>
                  <span className="Unbounded">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#5b5858] mb-2">
                  <span className="Unbounded">Estimated Delivery</span>
                  <span className="Unbounded">Free</span>
                </div>

                <div className="flex justify-between text-[#5b5858] mb-2">
                  <span className="Unbounded">Estimated Taxes</span>
                  <span className="Unbounded">
                    USD {estimatedTaxes.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between mb-2 font-bold border-t border-gray-400 pt-2 text-lg text-[#5b5858]">
                  <span className="Unbounded">Total</span>
                  <span className="Unbounded">
                    ${(subtotal + estimatedTaxes).toFixed(2)}
                  </span>
                </div>

                <div className="w-full py-3 cursor-pointer bg-[var(--prim-color)] text-white font-semibold rounded hover:bg-gray-500 transition text-center mt-2">
                  <Link href="/UI-Components/Pages/checkout">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
