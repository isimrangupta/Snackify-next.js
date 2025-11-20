import Banner from "./Banner/Banner";
import BestSales from "./BestSales/BestSales";
import Brands from "./Brands/Brands";
import Category from "./Categories/Category";
import Deals from "./Deals/Deals";
import Hero from "./Header/Hero";
import HotDeals from "./Hot-Deals/HotDeals";
import Arrivals from "./New-Arrivals/Arrivals";
import Offers from "./Offers-Banner/Offers";
import OrganicFood from "./Organic-food/Organic-Food";
import Banners from "./Promotion-Banner/Banners";
import Recommend from "./Recommend/Recommend";
import ShortProducts from "./Short-Products/Products";
import Vendors from "./Vendors/Vendors";
import Benefits from "./Benefits/Benefits";
import Newslatter from "./Newsletter/Newslatter";

const Index = () => {
  return (
    <>
      <Hero />
      <Category />
      <Banners />
      <Deals />
      <Offers />
      <Recommend />
      <HotDeals />
      <Vendors />
      <BestSales />
      <Banner />
      <OrganicFood />
      <ShortProducts />
      <Brands />
      <Arrivals/>
      <Benefits/>
      <Newslatter/>
    </>
  );
};

export default Index;
