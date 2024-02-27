"use client";
import { BannerType } from "@/types";

const NavBanner = ({ banner }: { banner: BannerType[] }) => {
  return (
    <div className="w-full text-center bg-[#A77737] p-2">
      <p className="animate-pulse text-white font-medium font-lato text-[14px]">
        {banner.map((b) => (
          <>{b.Title}</>
        ))}
      </p>
    </div>
  );
};

export default NavBanner;
