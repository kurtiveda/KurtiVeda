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

const Header = async () => {
  return (
    <>
      <div className="xsPhone:hidden tablet:block bg-white">
        <NavBar />
      </div>
      <div className="tablet:hidden xsPhone:block">
        <MobNav />
      </div>
      {/* <Categories /> */}
    </>
  );
};

export default Header;
