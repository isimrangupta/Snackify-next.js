"use client";

import { useSearchParams } from "next/navigation";
import Products from "./Products/page";
import ProductDetails from "./ProductDetails/page";

const ShopHandler = ({ allProducts }: { allProducts: any[] }) => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  return productId ? (
    <ProductDetails id={productId} products={allProducts} />
  ) : (
    <Products />
  );
};

export default ShopHandler;