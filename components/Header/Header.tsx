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
import axios from "axios";

const Header = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const banner = await getBanner();
  const cartNumber = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/cart/products`,
    {
      headers: {
        userId: session?.user?.id as string,
      },
    }
  );
  return (
    <div>
      <div className="xsPhone:hidden tablet:block bg-white drop-shadow-md z-[400] relative">
        <NavBar
          userId={userId as string}
          banner={banner}
          cartNumber={cartNumber?.data[0]?.products?.length}
        />
      </div>
      <div className="tablet:hidden xsPhone:block bg-white drop-shadow-md z-[400] relative">
        <MobNav
          userId={userId as string}
          banner={banner}
          cartNumber={cartNumber?.data[0]?.products?.length}
        />
      </div>
      {/* <Categories /> */}
    </div>
  );
};

export default Header;
