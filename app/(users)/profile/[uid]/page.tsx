"use client";

import { Card } from "@/components/ui/card";
import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  MapPin,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { LuMessageSquareDashed } from "react-icons/lu";
import Image from "next/image";
import { useEffect } from "react";
import { useSingleUserStore } from "@/lib/stores/Users/singleUserStore";
import SingleUserConnection from "@/components/profiles/MyConnection";
import SingleUserPostContent from "@/components/profiles/singleProfile/SingleUserPosts";

export default function SingleProfilePage() {
  const { fetchSingleUser, selectedUser } = useSingleUserStore();
  const params = useParams();
  const uid = params.uid as string;

  const router = useRouter();

  useEffect(() => {
    fetchSingleUser(uid);
  }, [uid, fetchSingleUser]);

  return (
    <section className="min-h-screen my-5 mx-50">
      <Card className="overflow-hidden p-0">
        <div className="h-55 bg-red-500" />
        <div className="flex justify-between bg-white">
          <div className="px-6 pb-6">
            <div className="-mt-16">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-(--brand-blue) text-5xl font-bold text-white shadow-lg">
                {selectedUser?.profilePicture ? (
                  <Image
                    src={selectedUser.profilePicture}
                    alt={selectedUser.displayName || selectedUser.name}
                    width={30}
                    height={30}
                    className="h-30 w-30 rounded-full object-fill"
                  />
                ) : (
                  <div>{selectedUser?.name.charAt(0).toUpperCase()}</div>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-wide">
                  {selectedUser?.name || selectedUser?.displayName}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {selectedUser?.profession}
                </p>
              </div>

              <p className="max-w-xl text-sm text-muted-foreground">
                {selectedUser?.bio}.
              </p>

              <div className="flex flex-wrap gap-5 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {selectedUser?.profession}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {selectedUser?.homeCity}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Joined {selectedUser?.is_new_arrival}
                </div>
              </div>

              <div className="flex gap-8 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Connection</p>
                    <p className="font-semibold">
                      {selectedUser?.connectionsCount}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Posts</p>
                    <p className="font-semibold">{selectedUser?.postsCount}</p>
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

      <div className="grid grid-cols-[35%_64%] gap-5 mt-5 sticky">
        <div className="flex flex-col gap-5">
          <Card className="p-6 space-y-5 mr-5">
            <h2 className="text-2xl font-bold text-zinc-500">About</h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-6 w-6 text-zinc-500" />
                Works as, <br></br>
                {selectedUser?.profession} at skybase
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-zinc-500" />
                Lives in, <br></br> {selectedUser?.approximateLocation}
              </div>
            </div>
          </Card>
          <SingleUserConnection />
        </div>
        <div className="flex flex-col gap-5">
          {selectedUser?.postsCount === 0 ? (
            <div className="flex flex-col h-80 items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white p-20 shadow-xl">
              <div className="flex flex-col text-center items-center">
                <LuMessageSquareDashed className="w-18 h-18 text-zinc-400" />
                <h2 className="text-3xl font-bold tracking-tight text-zinc-700 m-2">
                  No posts yet
                </h2>
                <p className="text-sm text-zinc-400 line-clamp-3 w-xs tracking-wide">
                This user has not posted anything yet.
                </p>
              </div>
            </div>
          ) : (
            <SingleUserPostContent />
          )}
        </div>
      </div>
    </section>
  );
}
