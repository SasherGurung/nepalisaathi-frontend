"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { BiGroup } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/authStores";
import { api } from "@/lib/api/config";
import toast from "react-hot-toast";
import { usePostStore } from "@/lib/stores/postStores";

export default function FeedPost() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { addPost, fetchPosts } = usePostStore();
  const [postPreview, setPostPreview] = useState<string | null>(null);
  const [postData, setPostData] = useState({
    body: "",
    image: null as File | null,
  });

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

  const isPostEmpty = postData.body.trim() === "" && postData.image === null;
  return (
    <div className="rounded-2xl border bg-white shadow-sm p-6">
      <div className="flex gap-3">
        {user?.profilePicture ? (
          <Image
            src={user.profilePicture}
            alt="Profile Image"
            width={90}
            height={90}
            className="rounded-full border-4 border-white object-cover shadow-md"
          />
        ) : (
          <div className="bg-(--brand-maroon) h-10 w-10 font-bold rounded-full text-white text-center pt-1.5 cursor-pointer">
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
          className="cursor-pointer hover:bg-zinc-100 text-zinc-500 px-3 py-2 rounded-xl flex items-center gap-1 text-md"
        >
          <CiImageOn className="h-5 w-5 text-green-500" />
          Photos
        </button>
        <Button
          onClick={handlePost}
          disabled={loading || isPostEmpty}
          className="rounded-lg bg-(--brand-maroon) hover:bg-red-600 text-md px-8 py-5 cursor-pointer"
        >
          {loading ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
}
