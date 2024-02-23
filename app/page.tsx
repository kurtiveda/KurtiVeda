import { getBanner } from "@/sanity/sanity.query";
import Image from "next/image";
import { BannerType } from "../types";
import Header from "@/components/Header/Header";
import Banner from "@/components/Banner/Banner";
import Arrivals from "@/components/Arrivals/Arrivals";
import Categories from "@/components/Header/Categories";
import { getCategory } from "@/lib/utils";
import MadeInIndia from "@/components/Footers/MadeInIndia";
import Footer from "@/components/Footers/Footer";

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

  return (
    <div>
      <Header />
      <Categories categories={categories} />
      <Banner images={images} />
      <Arrivals />
      <MadeInIndia />
      <Footer />
    </div>
  );
}
