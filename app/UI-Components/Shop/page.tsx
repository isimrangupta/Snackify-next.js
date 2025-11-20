import { Suspense } from "react";

// All JSON Data
import BestDeals from "@/app/JsonData/BestDeals.json";
import Arrivals from "@/app/JsonData/Arrivals.json";
import BestSales from "@/app/JsonData/BestSales.json";
import OrganicFood from "@/app/JsonData/OrganicFood.json";
import Recommend from "@/app/JsonData/Recommend.json";
import ShortProducts from "@/app/JsonData/ShortProducts.json";
import HotDetail from "@/app/JsonData/HotDetail.json";

import ShopHandler from "./ShopHandler";

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopHandler allProducts={allProducts} />
    </Suspense>
  );
};

export default ShopPage;