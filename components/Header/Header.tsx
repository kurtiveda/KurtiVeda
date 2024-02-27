import React, { Suspense } from "react";
import NavBanner from "./NavBanner";
import NavBar from "./NavBar";
import Categories from "./Categories";
import Banner from "../Banner/Banner";
import { BannerType } from "@/types";
import { getBanner } from "@/sanity/sanity.query";
import { ProdCards } from "../Products/ProdCards";
import { EyeIcon } from "lucide-react";
import MediumCards from "../Products/MediumCards";
import Arrivals from "../Arrivals/Arrivals";
import MobNav from "./MobNav";
import { auth } from "@/auth";

const Header = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const banner = await getBanner();
  return (
    <>
      <div className="xsPhone:hidden tablet:block bg-white">
        <NavBar userId={userId as string} banner={banner} />
      </div>
      <div className="tablet:hidden xsPhone:block">
        <MobNav userId={userId as string} banner={banner} />
      </div>
      {/* <Categories /> */}
    </>
  );
};

export default Header;
