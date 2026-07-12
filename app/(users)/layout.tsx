"use client"

import Navbar from "@/components/layouts/Navbar";
import { useAuthStore } from "@/lib/stores/authStores";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  // const token = useAuthStore((state) => state.token);

  // useEffect(() => {
  //   if (!token) {
  //     router.push("/login");
  //   }
  // }, [token, router]);

  // if (!token) {
  //   return null;
  // }
  return (
    <>
      <Navbar />
      <div className="bg-zinc-100 min-h-screen">{children}</div>
    </>
  );
}
