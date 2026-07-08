"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/authStores";
import { useProfileStore } from "@/lib/stores/profileStore";
import toast from "react-hot-toast";
import { api } from "@/lib/api/config";
import Image from "next/image";
import { MdOutlineGroup } from "react-icons/md";
import { useRouter } from "next/navigation";
import { BiGroup } from "react-icons/bi";
import { usePostStore } from "@/lib/stores/postStores";
import { RxCross2 } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";

type Connections = {
  uid: string;
  name: string;
  displayName: string;
  profilePicture: string;
};

function ProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { formData } = useProfileStore();
  const [connections, setConnections] = useState<Connections[]>([]);
  const [loading, setLoading] = useState(false);
  const { posts, addPost, fetchPosts, handleLike, deletePost } = usePostStore();
  const [postPreview, setPostPreview] = useState<string | null>(null);
  const [postData, setPostData] = useState({
    body: "",
    image: null as File | null,
  });

  useEffect(() => {
    const getConnections = async () => {
      try {
        const res = await api.get("/connections");

        setConnections(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong! Please try again");
      }
    };
    getConnections();
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

      const { data } = await api.post("/posts", formData);

      addPost(data.post);

      setPostData({
        body: "",
        image: null,
      });

      console.log("Data:", data);
      toast.success(data.message || "Post created successfully");
      fetchPosts();
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
    <section className="min-h-screen my-5 mx-50">
      <Card className="overflow-hidden p-0">
        <div className="h-55 bg-red-700" />
        <div className="flex justify-between bg-white">
          <div className="px-6 pb-6">
            <div className="-mt-16">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-red-600 text-5xl font-bold text-white shadow-lg">
                S
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  {user?.name || user?.displayName}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {formData?.profession || user?.profession}, at Skybase
                </p>
              </div>

              <p className="max-w-xl text-sm text-muted-foreground">
                {formData?.bio || user?.bio}.
              </p>

              <div className="flex flex-wrap gap-5 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {user?.profession || formData?.profession}at Skybase
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {user?.homeCity ?? formData?.homeCity}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Joined {user?.is_new_arrival}
                </div>
              </div>

              <div className="flex gap-8 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Connection</p>
                    <p className="font-semibold">{user?.connectionsCount}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Posts</p>
                    <p className="font-semibold">{user?.postsCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="border border-red-600 h-10 w-30 text-red-600 rounded-2xl mt-5 mx-10 hover:bg-red-100 cursor-pointer">
            Edit Profile
          </button>
        </div>
      </Card>

      <div className="mt-5 grid grid-cols-[30%_70%]">
        <Card className="p-6 space-y-5 mr-5">
          <h2 className="text-2xl font-bold text-zinc-500">About</h2>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="h-6 w-6 text-zinc-500" />
              Works as, <br></br>Frontend Developer at Skybase
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-zinc-500" />
              Lives in, <br></br> Pokhara, Nepal
            </div>
          </div>
        </Card>
        <div className="flex flex-col">
          <div className="rounded-2xl border bg-white shadow-sm p-6">
            <div className="flex gap-3">
              {user?.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt="Profile Image"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                />
              ) : (
                <div className="bg-(--brand-maroon) h-11 w-11 font-bold rounded-full text-white text-center pt-2 cursor-pointer">
                  <span className="text-lg font-bold text-white">
                    {(user?.name || user?.displayName)?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-md">{user?.name}</p>
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
                className="w-full h-32 p-3 rounded-lg mt-3 border focus:outline-none focus:ring-1 focus:ring-red-400 text-sm shadow-sm"
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
                  <RxCross2 className="h-3 w-3 text-black" />
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
            <div className="mt-2 flex items-center justify-between pt-4">
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
                className="rounded-xl bg-(--brand-maroon) hover:bg-red-600 text-base px-8 py-5 cursor-pointer"
              >
                {loading ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
          <Card className="h-25 mb-5 mt-5">
            <h2 className="text-2xl font-bold text-zinc-500">Activity</h2>
          </Card>
        </div>

        <Card className="p-6 space-y-5 mr-5 mt-5">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-zinc-500">Connections</h2>
            <Button
              onClick={() => router.push("/connection")}
              variant="link"
              className="cursor-pointer text-md text-zinc-600"
            >
              See all
            </Button>
          </div>

          <div className="flex gap-3 space-y-4 text-sm">
            {connections.length > 0 ? (
              connections.slice(0, 3).map((connection) => (
                <div
                  key={connection.uid}
                  className="items-center text-center cursor-pointer"
                >
                  {connection.profilePicture ? (
                    <Image
                      src={connection.profilePicture}
                      alt="Profile Image"
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-md"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-red-700 shadow-md">
                      <span className="text-4xl font-bold text-white">
                        {(connection.name || connection.displayName)
                          ?.charAt(0)
                          .toUpperCase()}
                      </span>
                    </div>
                  )}

                  <p className="mt-1 text-sm text-zinc-500">
                    {connection.name || connection.displayName}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center flex-col text-center ">
                <MdOutlineGroup className="w-15 h-15 text-zinc-400" />
                <h1 className="font-bold text-xl">No User Found</h1>
                <p className="font-light text-zinc-500 text-sm line-clamp-4 w-xs">
                  You dont have any connections yet. Start connecting with
                  people to grow your network.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}

export default ProfilePage;
