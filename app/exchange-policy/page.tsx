import React from "react";
import "./style.css";
import Link from "next/link";
function page() {
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl  font-playfair my-10">EXCHANGE POLICY</h1>
      <hr className="w-[90%]" />
      <div className="font-lato laptop:w-[50%] tablet:w-[90%] xsPhone:w-full xsPhone:px-4 text-justify space-y-6 text-sm my-12">
        <ul className="list-disc space-y-4">
          <li>
            <strong>Exchange Policy: </strong>We make sure to make our product
            listings as accurate and descriptive as possible so that the
            customers can make informed choices. Before dispatching the orders,
            we undertake multi-layer quality checks to ensure that your order
            reaches you in perfect condition.{" "}
          </li>
          <li>
            But in case, you are unsatisfied with the order item(s), we would be
            happy to help you with size-related exchanges. Unfortunately, we do
            not accept order returns at the moment.
          </li>
          <li>
            <strong> Exchange eligibility:</strong> We only offer an exchange
            for domestic orders. The item(s) requested for exchange should be
            unused, unwashed, unworn and must be returned with all its packaging
            and tags.
          </li>
          <li>
            <strong> Exchange terms and criteria:</strong> Please note the
            following points while requesting an exchange for your order.
          </li>
          <li>
            {" "}
            We provide detailed product descriptions for every outfit along with
            its colour, fit, wash care and other details. However, due to
            differences in every gadget&apos;s display settings, colours, etc.,
            there might be a slight colour difference. Therefore, we will not be
            able to entertain or accept exchange requests under colour
            difference, fabric material, quality, etc.
          </li>
          <li>
            KURTIVEDA shall only entertain exchange requests for orders placed
            on our official website, www.kurtiveda.com
          </li>
          <li>
            If your exchange request meets the above-mentioned terms and
            criteria. You can raise the exchange query with us via mail at{" "}
            <Link
              href="mailto:kurtiveda@gmail.com"
              className="text-blue-600 underline">
              kurtiveda@gmail.com
            </Link>
          </li>
          <li>
            Exchanges for size will only be done once per order and multiple
            exchanges of products on the same order will not be entertained.
          </li>
          <li>
            There may be certain cases when the requested product size may not
            be available in our inventory. For such instances, our customer
            support team will inform you about the same and will coordinate with
            you effectively.
          </li>
          <li>
            Aachho does not provide any returns, cancellation or refunds on
            products once sold and delivered. We do offer a size exchange option
            for purchased items. You may refer to the same under &apos;Exchange
            & Cancelation Policy&apos; on our website.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default page;
