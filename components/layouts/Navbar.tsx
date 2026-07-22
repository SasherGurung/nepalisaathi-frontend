"use client";

import React from "react";
import Image from "next/image";
import { FiHome } from "react-icons/fi";

import { MdOutlineGroup } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { RiChat3Line } from "react-icons/ri";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/lib/stores/Auth/authStores";
import { useConnectionStore } from "@/lib/stores/Connection/connectionStore";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { clearUser } = useAuthStore();
  const { user } = useAuthStore();
  const { receiveRequest } = useConnectionStore();

  return (
    <header className="flex justify-between px-30 py-1 items-center cursor-pointer sticky top-0 z-50 bg-white backdrop-blur-md border-b shadow-sm">
      <div onClick={() => router.push("/feed")} className="flex gap-5">
        <Image
          src="/logo.png"
          alt="Nepali Saathi Logo"
          height={50}
          width={50}
        />
        <h1 className="font-bold text-xl text-(--brand-maroon) mt-3">
          Nepal Saathi
        </h1>
      </div>
      <div className="flex items-center justify-between gap-3 bg-white px-5 py-2 w-2xs mr-30">
        <button
          onClick={() => router.push("/feed")}
          className={`flex h-11 w-11 items-center justify-center transition-all duration-300 cursor-pointer ${
            pathname === "/feed"
              ? "border-b-2 border-(--brand-maroon) text-(--brand-maroon)"
              : " hover:bg-zinc-100 text-zinc-500 hover:text-(--brand-maroon)"
          }`}
        >
          <FiHome className="h-6 w-6" />
        </button>

        <div className="relative">
          <button
            onClick={() => router.push("/connection")}
            className={`flex h-11 w-11 items-center justify-center transition-all duration-200 cursor-pointer ${
              pathname === "/connection"
                ? "border-b-2 border-(--brand-maroon) text-(--brand-maroon)"
                : "hover:bg-zinc-100 text-zinc-500 hover:text-(--brand-maroon)"
            }`}
          >
            <MdOutlineGroup className="h-7 w-7" />
          </button>

          {receiveRequest.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-sm font-semibold text-white">
              {receiveRequest.length}
            </span>
          )}
        </div>

        <button
          onClick={() => router.push("/chat")}
          className={`flex h-11 w-11 items-center justify-center transition-all duration-200 cursor-pointer ${
            pathname === "/chat"
              ? "border-b-2 border-(--brand-maroon) text-(--brand-maroon)"
              : "hover:bg-zinc-100 text-zinc-500 hover:text-(--brand-maroon)"
          }`}
        >
          <RiChat3Line className="h-6 w-6" />
        </button>

        <button
          onClick={() => router.push("/discover")}
          className={`flex h-11 w-11 items-center justify-center transition-all duration-200 cursor-pointer ${
            pathname === "/discover"
              ? "border-b-2 border-(--brand-maroon) text-(--brand-maroon)"
              : "hover:bg-zinc-100 text-zinc-500 hover:text-(--brand-maroon)"
          }`}
        >
          <FaRegCompass className="h-6 w-6" />
        </button>
      </div>
      <div className="flex gap-5 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FiBell className="h-6 w-6 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-lg">
                Notifications
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-8 w-8 text-center rounded-full border-2 cursor-pointer bg-(--brand-maroon) text-white pt-px"
            >
              S
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-50">
            <DropdownMenuGroup className="p-1">
              <p className="text-base font-semi-bold text-zinc-600">
                {user?.name}
              </p>
              <p className="text-sm font-light text-zinc-600 mb-1 tracking-wide">
                {user?.email}
              </p>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push("/profile")}
                className="cursor-pointer text-md font-light text-zinc-600"
              >
                <CgProfile className="w-6 h-6" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/change-password")}
                className="cursor-pointer text-md font-light text-zinc-600"
              >
                <RiLockPasswordLine /> Change Password
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer text-md font-light"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <IoLogOutOutline /> Log out
                  </DropdownMenuItem>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">
                      Log out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to log out of your account?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogAction
                      variant="outline"
                      className="cursor-pointer"
                    >
                      Cancel
                    </AlertDialogAction>

                    <AlertDialogAction
                      variant={"destructive"}
                      className="cursor-pointer"
                      onClick={() => {
                        clearUser();
                        router.replace("/login");
                      }}
                    >
                      Log out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Navbar;
