import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <>
      <footer className="py-4 bg-gray-100">
        <div className="w-full px-6 mx-auto">
          <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
            <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
              <div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
                © {new Date().getFullYear()}, made with{" "}
                <FontAwesomeIcon icon={faHeart} /> by{" "}
                <Link href="/">
                  <a className="font-semibold text-slate-700 dark:text-white">
                    The Paperhands App Team{" "}
                  </a>
                </Link>
                for a better web.
              </div>
            </div>
            <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
              <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
                <li className="nav-item">
                  <Link href="/">
                    <a className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500">
                      PaperHands
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/about">
                    <a className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500">
                      About Us
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/contact">
                    <a className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500">
                      Contact
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/terms">
                    <a className="block px-4 pt-0 pb-1 pr-0 text-sm font-normal transition-colors ease-in-out text-slate-500">
                      Terms and conditions
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
