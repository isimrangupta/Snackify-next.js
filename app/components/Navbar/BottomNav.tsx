"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },

  {
    label: "Shop",
    href: "/UI-Components/Shop",
    dropdown: [
      { label: "Shop", href: "/UI-Components/Shop" ,},
      { label: "Shop Details", href: "/UI-Components/Shop?id=" },
    ],
  },

  {
    label: "Pages",
    href: "#",
    dropdown: [
      { label: "Cart", href: "/UI-Components/Pages/cart" },
      { label: "Wishlist", href: "/UI-Components/Pages/wishlist" },
      { label: "Checkout", href: "/UI-Components/Pages/checkout" },
      { label: "Account", href: "/UI-Components/Pages/account" },
    ],
  },

  {
    label: "Blog",
    href: "/UI-Components/Blogs",
  },

  { label: "Contact Us", href: "/UI-Components/Pages/contact" },
];

const BottomNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});

  const [isFixed, setIsFixed] = useState(false);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

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
    <div
      className={`w-full bg-white shadow-sm transition-all duration-500 ${
        isFixed ? "fixed fixed-nav top-0 left-0 z-50 " : ""
      }`}
    >
      <div className="flex items-center justify-between px-[8%] lg:px-[12%] text-gray-700">
        {/* Desktop Nav */}
        <Link
          href="/"
          className={`text-3xl font-bold Merienda text-black hidden ${
            isFixed ? "lg:flex" : "hidden"
          }`}
        >
          Snacki<span className="text-[var(--prim-color)]">fy</span>
        </Link>

        <nav className="hidden lg:flex space-x-6 menu-link relative">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative group z-[99999]">
                <Link href={link.href} className="flex items-center gap-1">
                  {link.label}
                  <i className="ri-arrow-down-s-line"></i>
                </Link>
                <div className="absolute left-0 top-full hidden group-hover:block bg-[#758687] text-white shadow-xl p-2 border border-gray-100 rounded-lg min-w-[150px]">
                  {link.dropdown.map((item) =>
                    item.label === "Shop Details" ? (
                      <Link
                        key={item.label}
                        href={{
                          pathname: "/UI-Components/Shop",
                          query: {},
                        }}
                        className="block px-4 py-2 rounded-md hover:bg-white hover:text-[#bc8924] hover:font-bold transition-all"
                      >
                        {item.label}
                      </Link>
                    ) : item.label === "Blog Details" ? (
                      <Link
                        key={item.label}
                        href={{
                          pathname: "/UI-Components/Blogs",
                          query: {},
                        }}
                        className="block px-4 py-2 rounded-md hover:bg-white hover:text-[#bc8924] hover:font-bold transition-all"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 rounded-md hover:bg-white hover:text-[#bc8924] hover:font-bold transition-all"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        

        <button className="nav-button cursor-pointer font-bold bg-[var(--prim-color)] text-white p-3 hidden lg:flex">
          <i className="bi bi-telephone pe-2 text-xl"></i>
          91+ 123 456 789
        </button>

        {/* Mobile Nav header */}
        <div className="lg:hidden flex items-center justify-between gap-4 w-full">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            <div className="flex items-center gap-x-5 cursor-pointer">
              <i className="ri-menu-line"></i>
            </div>
          </button>

          <div className="flex lg:hidden items-center space-x-6">
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
              <i className="bi bi-cart text-gray-400 text-xl hover:text-[var(--prim-color)] transition-all"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--prim-color)] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <button className="nav-button cursor-pointer font-bold bg-[var(--prim-color)] text-white p-3 text-center">
            <i className="bi bi-telephone pe-2 text-xl "></i>
            91+ 123 456 789
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#758687] text-white border-t border-gray-200 shadow-md overflow-hidden transition-all duration-500 pl-4 ">
          <nav className="flex flex-col px-[4%] py-4 space-y-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="flex flex-col w-full">
                  <button
                    className="flex justify-between items-center w-full px-2 py-2 font-medium cursor-pointer "
                    onClick={() => toggleDropdown(link.label)}
                  >
                    {link.label}
                    <i
                      className={`ri-arrow-down-s-line transition-transform ${
                        openDropdown[link.label] ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openDropdown[link.label] ? "max-h-60 mt-1" : "max-h-0"
                    }`}
                  >
                    <div className="flex flex-col bg-[#99acace6] text-white py-2 space-y-0 w-full rounded-sm">
                      {link.dropdown.map((item) =>
                        item.label === "Shop Details" ? (
                          <Link
                            key={item.label}
                            href={{
                              pathname: "/UI-Components/Shop",
                              query: {},
                            }}
                            className="block px-4 py-2 rounded-md  transition-all w-full hover:bg-white hover:text-[#bc8924] hover:font-bold"
                          >
                            {item.label}
                          </Link>
                        ) : 
                        item.label === "Blog Details" ? (
                          <Link
                            key={item.label}
                            href={{
                              pathname: "/UI-Components/Blogs",
                              query: {},
                            }}
                            className="block px-4 py-2 rounded-md hover:bg-white hover:text-[#bc8924] hover:font-bold transition-all"
                          >
                            {item.label}
                          </Link>
                        )
                         : (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2 rounded-md transition-all hover:bg-white hover:text-[#bc8924] hover:font-bold"
                          >
                            {item.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.label} href={link.href}>
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default BottomNav;
