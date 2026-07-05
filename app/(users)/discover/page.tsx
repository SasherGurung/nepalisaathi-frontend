"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { FaRegCompass } from "react-icons/fa6";
import { api } from "@/lib/api/config";
import { toast } from "react-hot-toast";
import { MdOutlineGroup } from "react-icons/md";

type DiscoverUser = {
  id: number;
  uid: string;
  name: string;
  displayName: string | null;
  profession: string | null;
  profilePicture: string | null;
  status: string | null;
};

function DiscoverPage() {
  const [discoverUsers, setDiscoverUsers] = useState<DiscoverUser[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const getDiscoverUsers = async () => {
      try {
        const res = await api.get("/discover");

        setDiscoverUsers(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong! Please try again");
      }
    };
    getDiscoverUsers();
  }, []);

  const filterUsers =
    selectedStatus === "All"
      ? discoverUsers
      : discoverUsers.filter((user) => user.status === selectedStatus);

  return (
    <section className="min-h-screen flex justify-center">
      <Card className="w-7xl mt-6">
        <div className="items-center flex justify-center flex-col mb-3">
          <FaRegCompass className="text-gray-400 w-15 h-15 mb-3" />
          <div className="flex flex-col justify-center text-center gap-2">
            <h1 className="text-3xl text-zinc-500 font-bold">
              Discover New Connection
            </h1>
            <p className="line-clamp-3 w-lg text-zinc-500 text-sm">
              Find people from your hometown, discover new groups, and expand
              your professional network on Nepali Saathi.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => setSelectedStatus("All")}
            className={
              selectedStatus === "All"
                ? "border bg-(--brand-maroon) text-white px-4 py-1 rounded-3xl cursor-pointer"
                : "border bg-zinc-100 text-zinc-500 hover:bg-zinc-200 duration-300 transition-all px-4 py-1 rounded-3xl cursor-pointer"
            }
          >
            All
          </button>
          <button
            onClick={() => setSelectedStatus("Student")}
            className={
              selectedStatus === "Student"
                ? "border bg-(--brand-maroon) text-white px-4 py-1 rounded-3xl cursor-pointer"
                : "border bg-zinc-100 text-zinc-500 hover:bg-zinc-200 duration-300 transition-all px-4 py-1 rounded-3xl cursor-pointer"
            }
          >
            Student
          </button>
          <button
            onClick={() => setSelectedStatus("Working Professonal")}
            className={
              selectedStatus === "Working Professonal"
                ? "border bg-(--brand-maroon) text-white px-4 py-1 rounded-3xl cursor-pointer"
                : "border bg-zinc-100 text-zinc-500 hover:bg-zinc-200 duration-300 transition-all px-4 py-1 rounded-3xl cursor-pointer"
            }
          >
            Working Professonal
          </button>
          <button
            onClick={() => setSelectedStatus("Business Owner")}
            className={
              selectedStatus === "Business Owner"
                ? "border bg-(--brand-maroon) text-white px-4 py-1 rounded-3xl cursor-pointer"
                : "border bg-zinc-100 text-zinc-500 hover:bg-zinc-200 duration-300 transition-all px-4 py-1 rounded-3xl cursor-pointer"
            }
          >
            Business Owner
          </button>
          <button
            onClick={() => setSelectedStatus("Planning To Relocate")}
            className={
              selectedStatus === "Planning To Relocate"
                ? "border bg-(--brand-maroon) text-white px-4 py-1 rounded-3xl cursor-pointer"
                : "border bg-zinc-100 text-zinc-500 hover:bg-zinc-200 duration-300 transition-all px-4 py-1 rounded-3xl cursor-pointer"
            }
          >
            Planning To Relocate
          </button>
        </div>

        {filterUsers.length <= 3 ? (
          <div className="flex justify-center items-center flex-col text-center mt-17">
            <MdOutlineGroup className="w-20 h-20 text-zinc-400" />
            <h1 className="font-bold text-3xl">No User Found</h1>
            <p className="font-light text-zinc-500 text-sm line-clamp-3 w-sm">
              We couldnt find any new people to connect with right now. Check
              back later as our community grows!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 mt-5">
            {filterUsers.map((user) => (
              <div
                key={user.uid}
                className="w-sm rounded-2xl bg-white border border-zinc-200 overflow-hidden transition-all duration-100 hover:shadow-md"
              >
                <div className="h-20 bg-(--brand-maroon)"></div>

                <div className="flex flex-col items-center px-6 pb-6 -mt-12">
                  <Image
                    src={user.profilePicture || "/logo.png"}
                    alt="Profile Image"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                  />

                  <h3 className="mt-3 text-lg font-semibold text-zinc-900">
                    {user.name || user.displayName}
                  </h3>

                  <p className="text-sm text-zinc-500">{user.profession}</p>

                  <button className="mt-5 w-full rounded-full text-red-600 py-2.5 font-medium border border-red-600 hover:bg-red-100 transition-all cursor-pointer">
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </section>
  );
}

export default DiscoverPage;
