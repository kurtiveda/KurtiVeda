import React from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

function Footer() {
  return (
    <div className="h-[10rem] bg-white text-black border-t-4 border-[#A77737] font-lato text-sm tracking-widest uppercase py-8">
      <footer className="bg-white text-black">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 text-3xl tracking-wider flex justify-start items-center font-light">
              <Image src={logo} alt="logo" className="w-10 h-10 mr-2" />
              KURTIVEDA
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              {/* <div>
                <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                  Resources
                </h2>
                <ul className="text-white font-medium">
                  <li className="mb-4">
                    <a
                      href="https://kurtiveda.com/"
                      className="hover:underline">
                      KURTIVEDA
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tailwindcss.com/"
                      className="hover:underline">
                      Tailwind CSS
                    </a>
                  </li>
                </ul>
              </div> */}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-black uppercase ">
                  Follow us
                </h2>
                <ul className="text-black font-medium">
                  <li className="mb-4">
                    <a
                      href="https://instagram.com/"
                      className="hover:underline ">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://facebook.com/" className="hover:underline">
                      FaceBook
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold  uppercase text-black">
                  Legal
                </h2>
                <ul className="text-black font-medium space-y-4">
                  <li className="mb-4">
                    <Link href="/privacy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:underline">
                      Terms &amp; of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/exchange-policy" className="hover:underline">
                      Exchange Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm  sm:text-center text-black">
              <a href="https://kurtiveda.com/" className="hover:underline">
                KURTIVEDA
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" className="text-black">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19">
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
