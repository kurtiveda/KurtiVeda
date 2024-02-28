export const revalidate = 20000;
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";

import CrispWithNoSSR from "@/lib/Crisp";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footers/Footer";

import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CrispWithNoSSR />
      <body className={inter.className}>
        {/* <Header /> */}
        {children}
        <GoogleAnalytics gaId="G-V9EC18968X" />
        <Toaster className="bg-white" richColors />
      </body>
    </html>
  );
}
