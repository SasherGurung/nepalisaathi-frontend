"use client";

import { api } from "@/lib/api/config";
import { useAuthStore } from "@/lib/stores/authStores";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGroup } from "react-icons/md";

type DiscoverUser = {
  uid: string;
  name: string;
  profession: string;
};

function FeedClientPage() {
  const { user } = useAuthStore();
  const [discoverUser, setDiscoverUser] = useState<DiscoverUser[]>([]);

  useEffect(() => {
    const getDiscoverUser = async () => {
      try {
        const { data } = await api.get("/discover");

        setDiscoverUser(data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong! Please try again");
      }
    };
    getDiscoverUser();
  }, []);

  return (
    <section className="min-h-screen py-8">
      <div className="mx-auto flex max-w-7xl gap-8 px-6">
        <div className="w-[320px] space-y-6 sticky top-25 self-start">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm border">
            <div className="h-24 bg-red-400" />

            <div className="-mt-10 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-zinc-100 bg-(--brand-maroon) text-3xl font-bold text-white shadow cursor-pointer">
                S
              </div>
            </div>

            <div className="px-5 pb-2 text-center">
              <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-sm text-gray-500">
                {user?.profession}, at Skybase
              </p>
            </div>

            <div className="p-5">
              <div className="flex justify-between px-3">
                <p className="text-gray-500">Connections</p>
                <p className="text-gray-500">0</p>``
              </div>

              <div className="flex justify-between px-3">
                <p className="text-gray-500">Profile Views</p>
                <p className="text-gray-500">1</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm border p-5">
            <h3 className="mb-5 text-lg font-semibold flex gap-2 items-center text-black">
              <MdOutlineGroup className="h-6 w-6 text-zinc-500" /> People you
              may know
            </h3>

            <div className="space-y-5">
              {discoverUser.length <= 3 ? (
                <div className="flex justify-center items-center flex-col text-center mt-10">
                  <MdOutlineGroup className="w-15 h-15 text-zinc-400" />
                  <h1 className="font-bold text-2xl">No User Found</h1>
                  <p className="font-light text-zinc-500 text-sm line-clamp-4 w-xs">
                    We couldnt find any new people to connect with right now.
                    Check back later as our community grows!
                  </p>
                </div>
              ) : (
                discoverUser.slice(0, 3).map((user) => (
                  <div
                    key={user.uid}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gray-300" />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          {user.profession}
                        </p>
                      </div>
                    </div>
                    <button className=" text-blue-600 hover:text-blue-700 px-4 py-1.5 text-sm transition cursor-pointer">
                      Follow
                    </button>
                  </div>
                ))
              )}
              {}
            </div>
          </div>
        </div>

        <main className="flex-1 max-w-3xl space-y-6">
          <div className="rounded-2xl border bg-white shadow-sm p-6">
            <div className="flex gap-3">
              <p className="bg-(--brand-maroon) h-11 w-11 text-lg font-bold rounded-full text-white text-center pt-2 cursor-pointer">
                S
              </p>
              <div>
                <p className="font-bold text-lg">{user?.name}</p>
                <p className="text-zinc-400 text-sm">Friends</p>
              </div>
            </div>
            <div className="flex gap-4">
              <textarea
                placeholder="What's on your mind, Sasher?"
                className="w-full h-32 p-3 rounded-lg mt-3 border focus:outline-none focus:ring-1 focus:ring-red-400"
              />
            </div>
            <div className="mt-2 flex items-center justify-between pt-5">
              <button className="cursor-pointer hover:bg-zinc-100 text-zinc-400 px-3 py-2 rounded-xl flex items-center gap-1">
                <CiImageOn className="h-5 w-5 text-green-400" /> Photos
              </button>
              <button className="rounded-full bg-blue-600 px-8 py-2 font-medium text-white hover:bg-blue-700 transition cursor-pointer">
                Post
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--brand-maroon) font-bold text-white">
                S
              </div>

              <div>
                <p className="font-semibold">{user?.name}</p>
              </div>
            </div>

            <p className="px-5 pb-5 text-gray-800">
              Just finished building my social media app with Next.js, Tailwind
              CSS, Zustand, and Node.js
            </p>

            <div className="h-96 w-full bg-gray-200 flex items-center justify-center text-gray-500">
              Post Image
            </div>
            <div className="flex justify-around border-t py-4">
              <button className="rounded-lg px-6 py-2 hover:bg-gray-100 transition">
                Like
              </button>

              <button className="rounded-lg px-6 py-2 hover:bg-gray-100 transition">
                Comment
              </button>

              <button className="rounded-lg px-6 py-2 hover:bg-gray-100 transition">
                Share
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default FeedClientPage;
