"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { FaRegCompass } from "react-icons/fa6";
import { api } from "@/lib/api/config";
import { toast } from "react-hot-toast";
import DiscoverUsers from "@/components/discover/DiscoverUser";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { MdFilterList } from "react-icons/md";

import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DiscoverUser = {
  id: number;
  uid: string;
  name: string;
  displayName: string | null;
  profession: string | null;
  profilePicture: string | null;
  status: string | null;
};

const countries = [
  "All Countries",
  "Nepal",
  "Australia",
  "Canada",
  "Japan",
  "Qatar",
  "Saudi Arabia",
  "UAE",
  "UK",
  "USA",
];

const statuses = [
  "All",
  "Student",
  "Working Professional",
  "Business Owner",
  "Planning To Relocate",
];

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
    <section className="min-h-screen px-52 py-5">
      <div className="flex flex-col items-center">
        <Card className="w-full gap-5">
          <div>
            <h1 className="text-2xl font-bold">Explore</h1>
            <p className="text-md text-zinc-400">
              Find new connections and community members
            </p>
          </div>

          <div className="flex mt-5 justify-end w-full gap-3">
            <Field className="w-60">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-(--brand-maroon)" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Search by name, status and country"
                  className="pl-9 h-9 bg-gray-50 focus-visible:ring-1 
                   border-gray-300 focus-visible:border-red-600 focus-visible:outline-none"
                />
              </div>
            </Field>
            <Dialog>
              <DialogTrigger className="bg-red-50 text-(--brand-maroon) w-9 h-9 rounded-lg flex justify-center items-center">
                <MdFilterList className="h-6 w-6" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col gap-3 mb-3">
            <h1 className="text-zinc-400 font-semibold text-sm">COUNTRY</h1>
            <div className="flex items-center gap-3">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedStatus(country)}
                  className={
                    selectedStatus === country
                      ? "border bg-(--brand-maroon) text-white px-4 py-2 rounded-3xl text-xs cursor-pointer"
                      : "border text-(--brand-maroon) bg-red-50 duration-300 transition-all text-xs px-4 py-2 rounded-3xl cursor-pointer hover:bg-red-100"
                  }
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-zinc-400 font-semibold text-sm">STATUS</h1>
            <div className="flex items-center gap-3">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={
                    selectedStatus === status
                      ? "border bg-(--brand-maroon) text-white px-4 py-2 rounded-3xl text-xs cursor-pointer"
                      : "border text-(--brand-maroon) bg-red-50 duration-300 transition-all text-xs px-4 py-2 rounded-3xl cursor-pointer"
                  }
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </Card>
        <Card className="w-7xl mt-6">
          <div className="flex gap-2 mb-3 items-center">
            <div className="flex h-5 w-5 rounded-2xl bg-(--brand-maroon)/10 mb-4">
              <FaRegCompass className="text-(--brand-maroon) w-8 h-8" />
            </div>
            <p className="text-md text-zinc-400">12 Newcomers matched</p>
          </div>

          <DiscoverUsers users={filterUsers} />
        </Card>
      </div>
    </section>
  );
}

export default DiscoverPage;
