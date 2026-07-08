  "use client";

  import React, { useEffect, useState } from "react";
  import { Card } from "@/components/ui/card";
  import { FaRegCompass } from "react-icons/fa6";
  import { api } from "@/lib/api/config";
  import { toast } from "react-hot-toast";
  import DiscoverUsers from "@/components/discover/DiscoverUser";

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
          <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-(--brand-maroon)/10 mb-4">
            <FaRegCompass className="text-(--brand-maroon) w-8 h-8" />
          </div>
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

          <DiscoverUsers users={filterUsers}/>
        </Card>
      </section>
    );
  }

  export default DiscoverPage;
