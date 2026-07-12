"use client";

import { api } from "@/lib/api/config";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuMessageSquareDashed } from "react-icons/lu";
import SuggestedUsers from "@/components/feed/(suggestedUser)/SuggestedUser";
import FeedPost from "@/components/feed/(feedPost)/FeedPost";
import { usePostStore } from "@/lib/stores/postStores";
import FeedProfile from "@/components/feed/(feedProfile)/page";
import FeedPostContent from "@/components/feed/(feedPostContent)/FeedPostContent";

type DiscoverUser = {
  uid: string;
  name: string;
  profession: string;
  displayName: string;
  profilePicture: string | null;
};  

export default function FeedPage() {
  const router = useRouter();
  const [discoverUsers, setDiscoverUsers] = useState<DiscoverUser[]>([]);

  const { posts, fetchPosts } = usePostStore();


  useEffect(() => {
    const getDiscoverUsers = async () => {
      try {
        const { data } = await api.get("/discover");

        setDiscoverUsers(data.data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong! Please try again");
      }
    };
    getDiscoverUsers();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);


  return (
    <section className="min-h-screen py-10">
      <div className="mx-auto flex max-w-7xl gap-8">
        <FeedProfile />

        <section className="flex-1 max-w-3xl space-y-6">
          <FeedPost />

          {posts.length === 0 ? (
            <div className="flex flex-col h-80 items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white p-20">
              <div className="flex flex-col text-center items-center">
                <LuMessageSquareDashed className="w-20 h-20 text-zinc-400" />
                <h2 className="text-3xl font-bold tracking-tight text-zinc-700 m-2">
                  No posts yet
                </h2> 
                <p className="mt-1 text-sm text-zinc-400 line-clamp-3 w-xs">
                  Your feed is empty. Be the first to share your thoughts, or
                  connect with more people to see their updates!
                </p>
                <button
                  onClick={() => router.push("/discover")}
                  className="px-4 py-3 bg-(--brand-blue) rounded-xl text-sm text-white mt-3 cursor-pointer hover:bg-blue-900"
                >
                  Find Connections
                </button>
              </div>
            </div>
          ) : (
            <FeedPostContent />
          )}
        </section>
        <SuggestedUsers users={discoverUsers} />
      </div>
    </section>
  );
}
