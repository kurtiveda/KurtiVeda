/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import Arrivals from "@/components/Arrivals/Arrivals";
import Accordian from "@/components/Products/Accordian";
import CartButtons from "@/components/Products/CartButtons";
import ImageMagnify from "@/components/Products/ImageMagnify";

import PageLoader from "@/components/Products/PageLoader";
import { StickyScroll } from "@/components/Products/StickyScroll";
import ZoomCaraousel from "@/components/Products/ZoomCaraousel";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import WhatsAppButton from "@/components/ui/Whatsapp";
import { Separator } from "@/components/ui/separator";
import { getProductById } from "@/sanity/sanity.query";
import { HandIcon, WashingMachineIcon } from "lucide-react";
import React from "react";

import { FaHandsBubbles } from "react-icons/fa6";
import { TbWashTemperature3, TbWashDryShade, TbIroning1 } from "react-icons/tb";

const Page = async ({ params }: { params: { id: string } }) => {
  const [product] = await getProductById(params.id);
  // console.log(product);
  const session = await auth();

  return (
    <>
      <Separator />
      <div className="w-full pt-8 ">
        <BreadCrumbs customPath={["shop", `${product.Title}`]} />
      </div>

      <div className="w-screen flex justify-center items-center ">
        <div className="flex tablet:flex-row xsPhone:flex-col justify-center items-start xsPhone:w-[100%] tablet:w-[90%] tablet:mt-[2rem]">
          <div className="w-[50%] tablet:grid grid-cols-2 gap-4 relative xsPhone:hidden">
            {product.productMedia.map((prod, index) => {
              return <ImageMagnify src={prod.asset.url} key={index} />;
            })}
          </div>
          <div className="w-[100%] h-auto tablet:hidden xsPhone:block">
            <ZoomCaraousel
              images={product.productMedia.map((prod) => {
                return prod.asset.url;
              })}
            />
          </div>
          <div className="tablet:w-[50%] xsPhone:w-[100%] flex flex-col justify-start items-start sticky top-0 overflow-hidden ring-offset-2 py-[3rem] tablet:pl-[3rem] laptop:pl-[4rem] xsPhone:px-[2rem] gap-[2rem]">
            <div className="w-full space-y-3">
              <p className="laptop:text-5xl tablet:text-4xl xsPhone:text-3xl font-playfair tracking-wide text-neutral-700 uppercase">
                {product.Title}
              </p>
              <p className="laptop:text-xl tablet:text-lg xsPhone:text-md font-lato font-light text-neutral-500">
                {product.line_description}
              </p>
            </div>
            <div className="flex-col justify-start items-start">
              <p className="laptop:text-3xl xsPhone:text-2xl font-playfair">
                ₹ {product.Price}
              </p>
              <p className=" font-lato xsPhone:text-sm font-light text-muted-foreground">
                Tax included
              </p>
            </div>

            <CartButtons
              userId={session?.user?.id as string}
              product={{
                id: params.id,
                name: product.Title,
                price: product.Price,
                sizes: product.sizes,
              }}
              session={session}
            />

            <div className="w-full font-lato flex flex-col ">
              <Accordian
                title={"Washing and Care Instructions"}
                description={[
                  {
                    title: "Hand wash only",
                    img: <FaHandsBubbles className="w-6 h-6" />,
                  },
                  {
                    title: "Wash in Cold or Lukewarm Water only",
                    img: <TbWashTemperature3 className="w-6 h-6" />,
                  },
                  {
                    title: "Dry in Shade",
                    img: <TbWashDryShade className="w-6 h-6" />,
                  },
                  {
                    title: "Low Heat Iron Only",
                    img: <TbIroning1 className="w-6 h-6" />,
                  },
                ]}
              />
              <Accordian
                title={"Products Details"}
                description={product.description}
              />
              <Accordian title={"Features"} description={product.features} />
            </div>
            <div>
              <WhatsAppButton
                // phoneNumber="+919352390463"
                phoneNumber="+919829320691"
                message={`Hello, I have a query regarding this product.`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
