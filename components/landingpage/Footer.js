import Link from "next/link";
import Image from "next/image";
import React from "react";
import Container from "./Container";
import Twitter from "../../public/img/brands/twitter.svg";
import Facebook from "../../public/img/brands/facebook.svg";
import Instagram from "../../public/img/brands/instagram.svg";
import Linkedin from "../../public/img/brands/linkedin.svg";

export default function Footer() {
  const navigation = ["Product", "Features"];
  const legal = ["Terms", "Privacy", "Legal"];
  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGrey-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              {" "}
              <Link href="/">
                <a className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                  <span>Paperhands</span>
                </a>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
              Paperhands is a risk management tool for casual traders to
              understand the implications behind their crypto investments.
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {navigation.map((item, index) => (
                <Link key={index} href="/">
                  <a className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGrey-700">
                    {item}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {legal.map((item, index) => (
                <Link key={index} href="/">
                  <a className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGrey-700">
                    {item}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <div>Follow us</div>
            <div className="flex mt-5 space-x-5 text-gray-400 dark:text-gray-500">
              <a
                href="https://twitter.com/BuildFaast"
                target="_blank"
                rel="noopener"
              >
                <span className="sr-only">Twitter</span>
                <Twitter width="24" height="24" />
              </a>
              {/* <a
                href="https://facebook.com/web3templates"
                target="_blank"
                rel="noopener"
              >
                <span className="sr-only">Facebook</span>
                <Facebook width="24" height="24" />
              </a> */}
              {/* <a
                href="https://instagram.com/web3templates"
                target="_blank"
                rel="noopener"
              >
                <span className="sr-only">Instagram</span>
                <Instagram width="24" height="24" />
              </a> */}
              {/* <a href="https://linkedin.com/" target="_blank" rel="noopener">
                <span className="sr-only">Linkedin</span>
                <Linkedin width="24" height="24" />
              </a> */}
            </div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Made with ♥ by a couple of
          paperhanded devs
        </div>
      </Container>
    </div>
  );
}

const Backlink = () => {
  return (
    <a
      href="https://web3templates.com"
      target="_blank"
      rel="noopener"
      className="absolute flex px-3 py-1 space-x-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded shadow-sm place-items-center left-5 bottom-5 dark:bg-trueGrey-900 dark:border-trueGrey-700 dark:text-trueGrey-300"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 30 30"
        fill="none"
        className="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="30" height="29.5385" rx="2.76923" fill="#362F78" />
        <path
          d="M10.14 21.94H12.24L15.44 12.18L18.64 21.94H20.74L24.88 8H22.64L19.58 18.68L16.36 8.78H14.52L11.32 18.68L8.24 8H6L10.14 21.94Z"
          fill="#F7FAFC"
        />
      </svg>

      <span>Web3Templates</span>
    </a>
  );
};
