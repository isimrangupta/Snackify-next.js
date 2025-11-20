"use client";

import { useSearchParams } from "next/navigation";

// All json Data
import BestDeals from "@/app/JsonData/BestDeals.json";
import Arrivals from "@/app/JsonData/Arrivals.json";
import BestSales from "@/app/JsonData/BestSales.json";
import OrganicFood from "@/app/JsonData/OrganicFood.json";
import Recommend from "@/app/JsonData/Recommend.json";
import ShortProducts from "@/app/JsonData/ShortProducts.json";
import HotDetail from "@/app/JsonData/HotDetail.json";

import ProductDetail from "./ProductDetails/page";
import Products from "./Products/page";



const ShopPage = () => {
  const allProducts = [
    ...Arrivals,
    ...BestDeals,
    ...BestSales,
    ...OrganicFood,
    ...Recommend,
    ...HotDetail,
    ...(ShortProducts?.Featured || []),
    ...(ShortProducts?.TopSelling || []),
    ...(ShortProducts?.OnSale || []),
    ...(ShortProducts?.TopRated || []),
  ];

  const searchParms = useSearchParams();
  const productId = searchParms.get("id");

  return (
    <div className="">
      {productId ? (
        <ProductDetail id={productId} products={allProducts} />
      ) : (
        <Products />
      )}
    </div>
  );
};

export default ShopPage;
