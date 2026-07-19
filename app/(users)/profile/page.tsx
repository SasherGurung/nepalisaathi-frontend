"use client";

import { Card } from "@/components/ui/card";
import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  MapPin,
  Users,
} from "lucide-react";
import { useProfileStore } from "@/lib/stores/EditProfile/setupProfileStore";
import { useRouter } from "next/navigation";
import FeedPost from "@/components/feed/(feedPost)/FeedPost";
import FeedPostContent from "@/components/feed/(feedPostContent)/FeedPostContent";
import { LuMessageSquareDashed } from "react-icons/lu";
import { usePostStore } from "@/lib/stores/Posts/postStores";
import { useAuthStore } from "@/lib/stores/Auth/authStores";
import MyConnection from "@/components/profiles/MyConnection";
import Image from "next/image";
import { useConnectionUserStore } from "@/lib/stores/Connection/connectionUserStore";
import { useEffect } from "react";
import { useConnectionStore } from "@/lib/stores/Connection/connectionStore";

function ProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { formData } = useProfileStore();;
  const { fetchReceivedRequests } = useConnectionStore();
  const { fetchConnectionUsers } = useConnectionUserStore();
    const { posts, fetchPosts } = usePostStore();
  useEffect(() => {
    fetchReceivedRequests();
    fetchConnectionUsers();
  }, [fetchReceivedRequests, fetchConnectionUsers]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section className="min-h-screen my-5 mx-50">
      <Card className="overflow-hidden p-0">
        <div className="h-55 bg-red-500" />
        <div className="flex justify-between bg-white">
          <div className="px-6 pb-6">
            <div className="-mt-16">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-(--brand-blue) text-5xl font-bold text-white shadow-lg">
                {user?.profilePicture ? (
                  <Image
                    src={user.profilePicture}
                    alt={user.displayName || user.name}
                    width={30}
                    height={30}
                    className="h-30 w-30 rounded-full object-fill"
                  />
                ) : (
                  <div>{user?.name.charAt(0).toUpperCase()}</div>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-wide">
                  {user?.name || user?.displayName}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {formData?.profession || user?.profession}
                </p>
              </div>

              <p className="max-w-xl text-sm text-muted-foreground">
                {formData?.bio || user?.bio}.
              </p>

              <div className="flex flex-wrap gap-5 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {user?.profession || formData?.profession}
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
          <button className="border h-10 w-30 text-(--brand-blue) rounded-lg mt-5 mx-10 shadow-sm hover:bg-zinc-100 cursor-pointer">
            Edit Profile
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-[35%_65%] gap-5 mt-5 sticky">
        <div className="flex flex-col gap-5">
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
          <MyConnection />
        </div>
        <div className="flex flex-col gap-5">
          <FeedPost />
          {posts.length === 0 ? (
            <div className="flex flex-col h-80 items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white p-20 shadow-xl">
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
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
