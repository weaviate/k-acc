"use client";

import React, { Suspense, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";

import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="navbar bg-secondary">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <img src="/logo.svg" alt="Logo" className="h-6 mr-2" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-secondary text-primary rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a onClick={() => router.push("/search")}>Shop all</a>
            </li>
            <li>
              <a onClick={() => window.open("https://weaviate.io/", "_blank")}>
                About Weaviate
              </a>
            </li>
            <li>
              <a onClick={() => router.push("/survey")}>Survey</a>
            </li>
          </ul>
        </div>
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-6 ml-3 hidden lg:block cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>
      <div className="navbar-center hidden lg:flex text-primary">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              className="hover:bg-secondary"
              onClick={() => router.push("/search")}
            >
              Shop all
            </a>
          </li>
          <li>
            <a
              className="hover:bg-secondary"
              onClick={() => window.open("https://weaviate.io/", "_blank")}
            >
              About Weaviate
            </a>
          </li>
          <li>
            <a
              className="hover:bg-secondary"
              onClick={() => router.push("/survey")}
            >
              Survey
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <button
          className={` text-opacity-25 btn btn-square btn-ghost text-primary hover:text-opacity-100 hover:bg-white`}
          onClick={() =>
            window.open("https://github.com/weaviate/k-acc", "_blank")
          }
        >
          <FaGithub size={20} />
        </button>
      </div>
    </div>
    // <div>
    //   <header className="flex justify-between items-center p-1 bg-white">
    //     <div
    //       className="flex items-center btn btn-ghost hover:bg-white"
    //       onClick={() => router.push("/")}
    //     >
    //       <img src="/logo.svg" alt="Logo" className="h-6 mr-2" />
    //     </div>
    //     <div className="flex items-center gap-10 w-auto justify-end transition-all duration-1000 ease-in-out">
    //       <p
    //         onClick={() => router.push("/search")}
    //         className="text-sm text-gray-500 hover:text-primary cursor-pointer"
    //       >
    //         Shop all
    //       </p>
    //       <p
    //         onClick={() => window.open("https://weaviate.io/", "_blank")}
    //         className="text-sm text-gray-500 hover:text-primary cursor-pointer"
    //       >
    //         About Weaviate
    //       </p>
    //       <p
    //         onClick={() => router.push("/survey")}
    //         className="text-sm text-gray-500 hover:text-primary cursor-pointer"
    //       >
    //         Survey
    //       </p>
    //     </div>
    //     <div
    //       className={`flex items-center gap-2 transition-all duration-1000 ease-in-out`}
    //     >
    //       <div className="flex ml-5 mr-5">
    //         <button
    //           className={` text-opacity-25 btn btn-square btn-ghost text-primary hover:text-opacity-100 hover:bg-white`}
    //           onClick={() =>
    //             window.open("https://github.com/weaviate/k-acc", "_blank")
    //           }
    //         >
    //           <FaGithub size={20} />
    //         </button>
    //       </div>
    //     </div>
    //   </header>
    //   <div className="flex justify-center items-center">
    //     <hr className="border-t border-accent border-opacity-50 w-full" />
    //   </div>
    // </div>
  );
};

export default Navbar;
