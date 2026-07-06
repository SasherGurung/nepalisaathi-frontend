"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api/config";
import { useAuthStore } from "@/lib/stores/authStores";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGroup } from "react-icons/md";
import Image from "next/image";
import { useProfileStore } from "@/lib/stores/profileStore";
import { usePostStore } from "@/lib/stores/postStores";
import { BiGroup } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

type DiscoverUser = {
  uid: string;
  name: string;
  profession: string;
  displayName: string;
  profilePicture: string | null;
};

function FeedClientPage() {
  const router = useRouter();
  const { formData } = useProfileStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [discoverUser, setDiscoverUser] = useState<DiscoverUser[]>([]);

  const { addPost } = usePostStore();
  const [postPreview, setPostPreview] = useState<string | null>(null);
  const [postData, setPostData] = useState({
    body: "",
    image: null as File | null,
  });

  useEffect(() => {
    const getDiscoverUser = async () => {
      try {
        const res = await api.get("/discover");

        setDiscoverUser(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong! Please try again");
      }
    };
    getDiscoverUser();
  }, []);

  const handlePost = async () => {
    try {
      setLoading(true);
      console.log(postData);
      const formData = new FormData();

      formData.append("body", postData.body);
      if (postData.image) {
        formData.append("imageUrl", postData.image);
      }

      const res = await api.post("/posts", formData);

      addPost(res.data.post);

      setPostData({
        body: "",
        image: null,
      });

      console.log("Data:", res.data);
      toast.success("Post Posted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const postInputRef = useRef<HTMLInputElement>(null);

  const handlePostImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPostData((prev) => ({
      ...prev,
      image: file,
    }));

    setPostPreview(URL.createObjectURL(file));
  };

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
                {formData?.profession || user?.profession}, at Skybase
              </p>
            </div>

            <div className="p-5">
              <div className="flex justify-between px-3">
                <p className="text-gray-500">Connections</p>
                <p className="text-gray-500">{user?.connectionsCount}</p>
              </div>

              <div className="flex justify-between px-3">
                <p className="text-gray-500">Total Posts</p>
                <p className="text-gray-500">{user?.postsCount}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm border p-5">
            <div className="flex justify-between">
              <h3 className="mb-5 text-lg font-semibold flex gap-2 items-center text-black line-clamp-2">
                <MdOutlineGroup className="h-8 w-8 text-zinc-500" /> Suggested
                for you
              </h3>
              <Button
                onClick={() => router.push("/discover")}
                variant="link"
                className="text-sm cursor-pointer text-zinc-500"
              >
                See All
              </Button>
            </div>

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
                discoverUser.slice(0, 6).map((user) => (
                  <div
                    key={user.uid}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gray-300">
                        <Image
                          src={user.profilePicture || "/logo.png"}
                          alt={user.name || user.displayName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          {user.profession}
                        </p>
                      </div>
                    </div>

                    <button className="text-blue-600 hover:text-blue-700 px-4 py-1.5 text-sm transition cursor-pointer">
                      Follow
                    </button>
                  </div>
                ))
              )}
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
                <p className="text-zinc-400 text-sm flex items-center">
                  <BiGroup className="h-4 w-4" /> Friends
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <textarea
                value={postData.body}
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    body: e.target.value,
                  }))
                }
                placeholder={`What's on your mind, ${user?.name || user?.displayName}?`}
                className="w-full h-32 p-3 rounded-lg mt-3 border focus:outline-none focus:ring-1 focus:ring-red-400"
              />
            </div>

            {postPreview && (
              <div className="relative mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setPostPreview(null);
                    setPostData((prev) => ({
                      ...prev,
                      image: null,
                    }));

                    if (postInputRef.current) {
                      postInputRef.current.value = "";
                    }
                  }}
                  className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 shadow hover:bg-gray-100 cursor-pointer"
                >
                  <RxCross2 className="h-4 w-4 text-black" />
                </button>

                <Image
                  src={postPreview}
                  alt="Selected image"
                  width={500}
                  height={300}
                  className="w-full max-h-80 rounded-lg border object-cover"
                />
              </div>
            )}
            <div className="mt-2 flex items-center justify-between pt-5">
              <input
                ref={postInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handlePostImage}
              />
              <button
                type="button"
                onClick={() => postInputRef.current?.click()}
                className="cursor-pointer hover:bg-zinc-100 text-zinc-400 px-3 py-2 rounded-xl flex items-center gap-1"
              >
                <CiImageOn className="h-5 w-5 text-green-400" />
                Photos
              </button>
              <Button
                onClick={handlePost}
                disabled={loading}
                className="rounded-full bg-blue-600 px-8 py-4 cursor-pointer"
              >
                {loading ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--brand-maroon) font-bold text-white">
                S
              </div>

              <div>
                <p className="font-semibold text-xl">{user?.name}</p>
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
