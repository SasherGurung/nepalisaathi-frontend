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
        <Image src="/image.png" alt="Nepali Saathi Logo" height={50} width={50} />
        <h1 className="font-bold text-xl text-(--brand-maroon) mt-3">Nepal Saathi</h1>
      </div>
      <div className="flex gap-8">
        <FiHome onClick={() => router.push("/feed")} className="h-6 w-6 text-(--crimson) cursor-pointer hover:scale-110 transition-all duration-200" />
        <MdOutlineGroup onClick={() => router.push("/connection")} className="h-7 w-7 text-(--crimson) cursor-pointer rounded-full hover:scale-110 transition-all duration-200" />
        <FaRegCompass onClick={() => router.push("/discover")} className="h-6 w-6 text-(--crimson) cursor-pointer hover:scale-110 transition-all duration-200" />
      </div>
      <div className="flex gap-5 items-center">
        <FiBell className="h-6 w-6 cursor-pointer" />
        <div className="h-8 w-8 text-center rounded-full border-2 cursor-pointer bg-(--brand-maroon) text-white pt-[1px]">
          S
        </div>
      </div>
    </header>
  );
}

export default Navbar;
