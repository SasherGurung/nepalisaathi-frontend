"use client";

import React from "react";
import Image from "next/image";
import { FiHome } from "react-icons/fi";

import { MdOutlineGroup } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { useAuthStore } from "@/lib/stores/authStores";

function Navbar() {
  const router = useRouter();

  const { clearUser } = useAuthStore();
  const { user } = useAuthStore();

  return (
    <header className="flex justify-between px-10 py-2 items-center cursor-pointer sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
      <div onClick={() => router.push("/feed")} className="flex gap-5">
        <Image
          src="/image.png"
          alt="Nepali Saathi Logo"
          height={50}
          width={50}
        />
        <h1 className="font-bold text-xl text-(--brand-maroon) mt-3">
          Nepal Saathi
        </h1>
      </div>
      <div className="flex gap-8 mr-30 ">
        <FiHome
          onClick={() => router.push("/feed")}
          className="h-6 w-6 text-(--crimson) cursor-pointer hover:scale-110 transition-all duration-200"
        />
        <MdOutlineGroup
          onClick={() => router.push("/connection")}
          className="h-7 w-7 text-(--crimson) cursor-pointer rounded-full hover:scale-110 transition-all duration-200"
        />
        <FaRegCompass
          onClick={() => router.push("/discover")}
          className="h-6 w-6 text-(--crimson) cursor-pointer hover:scale-110 transition-all duration-200"
        />
      </div>
      <div className="flex gap-5 items-center">
        <FiBell className="h-6 w-6 cursor-pointer" />
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
            <DropdownMenuGroup>
              <p className="text-base mb-1 font-semi-bold text-zinc-600">
                {user?.name}
              </p>
              <p className="text-sm font-light text-zinc-600 mb-2">
                {user?.email}
              </p>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer text-base font-light text-zinc-600">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/change-password")}
                className="cursor-pointer text-base font-light text-zinc-600"
              >
                Change Password
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer text-base font-light"
                    onSelect={(e) => e.preventDefault()} // Prevents the dropdown from closing immediately
                  >
                    Log out
                  </DropdownMenuItem>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">Log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to log out of your account?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogAction variant="outline" className="cursor-pointer">Cancel</AlertDialogAction>

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
