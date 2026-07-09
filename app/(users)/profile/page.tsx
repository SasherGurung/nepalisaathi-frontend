"use client";

import React, { useEffect, useState } from "react";
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
import FeedPost from "@/components/feed/(feedPost)/FeedPost";

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
                <h2 className="text-2xl font-bold tracking-wide">
                  {user?.name || user?.displayName}
                </h2>
                <p className="text-xl text-muted-foreground">
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
          <FeedPost />
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
