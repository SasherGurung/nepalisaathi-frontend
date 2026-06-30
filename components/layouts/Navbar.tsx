"use client";

import React from "react";
import Image from "next/image";
import { FiHome } from "react-icons/fi";

import { MdOutlineGroup } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  return (
    <header className="flex justify-between px-10 py-2 items-center cursor-pointer z-10 sticky">
      <div onClick={() => router.push("/feed")} className="flex gap-5">
        <Image src="/image.png" alt="Nepal Sathi Logo" height={50} width={50} />
        <h1 className="font-bold text-xl text-indigo-400 mt-3">Nepal Saathi</h1>
      </div>
      <div className="flex gap-8">
        <FiHome className="h-6 w-6 text-indigo-500 cursor-pointer" />
        <MdOutlineGroup className="h-7 w-7 text-indigo-500 cursor-pointer" />
        <FaRegCompass className="h-6 w-6 text-indigo-500 cursor-pointer" />
      </div>
      <div className="flex gap-5">
        <FiBell className="h-6 w-6 cursor-pointer" />
        <div className="h-7 w-7 text-center rounded-full border-2 cursor-pointer">
          S
        </div>
      </div>
    </header>
  );
}

export default Navbar;
