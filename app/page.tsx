import { getBanner } from "@/sanity/sanity.query";
import Image from "next/image";
import { BannerType } from "../types";
import Header from "@/components/Header/Header";
import Banner from "@/components/Banner/Banner";
import Arrivals from "@/components/Arrivals/Arrivals";
import Categories from "@/components/Header/Categories";
import { getCategory, getPromo } from "@/lib/utils";
import MadeInIndia from "@/components/Footers/MadeInIndia";
import Footer from "@/components/Footers/Footer";
import Countdown from "@/components/ui/Countdown";
import CountDownCarousel from "@/components/PromoCode/CountDownCarousel";

export default async function Home() {
  const BannerImages: BannerType[] = await getBanner();

  const images: string[] = [];

  const bb = BannerImages.forEach((Banner) => {
    Banner.bannerMedia.map((image, index) => {
      images[index] = image.asset.url;
    });
  });

  const categories = await getCategory();
  console.log(categories);

  const expiryDate = await getPromo();
  console.log("date", expiryDate);

  // Create a function to get the category

  return (
    <div>
      <Header />
      <Categories categories={categories} />
      <Banner images={images} />
      <Arrivals />
      <CountDownCarousel promoCodes={expiryDate} />
      <MadeInIndia />

      <Footer />
    </div>
  );
}
