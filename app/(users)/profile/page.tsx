"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  MapPin,
  Users,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/authStores";

function ProfilePage() {

  const { user } = useAuthStore();

  return (
    <section className="min-h-screen my-5 mx-10">
      <Card className="overflow-hidden">
        <div className="h-36 bg-red-700" />
        <div className="flex justify-between">
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
                  {user?.profession}, at Skybase
                </p>
              </div>

              <p className="max-w-xl text-sm text-muted-foreground">
                {user?.bio}.
              </p>

              <div className="flex flex-wrap gap-5 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4" />
                  Skybase
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />``
                  {user?.homeCity}
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
                    <p className="font-semibold">1</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Posts</p>
                    <p className="font-semibold">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="border border-red-600 h-13 w-35 text-red-600 rounded-2xl mt-10 hover:bg-red-100 cursor-pointer">
            Edit Button
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
        <Card className="h-25 mb-5">
          <h2 className="text-2xl font-bold text-zinc-500">Activity</h2>
        </Card>

        <Card className="p-6 space-y-5 mr-5 mt-5">
          <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-zinc-500">Connections</h2>
          <Button variant="link" className="cursor-pointer text-md text-zinc-600">See all</Button>
          </div>

          <div className="flex gap-3 space-y-4 text-sm">
            <div className="flex h-15 w-15 items-center justify-center rounded-full border-4 border-zinc-100 bg-red-600 text-2xl font-bold text-white shadow-lg cursor-pointer">
              <HoverCard>
                <HoverCardTrigger>S</HoverCardTrigger>
                <HoverCardContent side="top" align="start" className="w-25 text-red-600" >Sasher</HoverCardContent>
              </HoverCard>
            </div>
            <div className="flex h-15 w-15 items-center justify-center rounded-full border-4 border-zinc-100 bg-indigo-500 text-2xl font-bold text-white shadow-lg">
              M
            </div>
          </div>
        </Card>
        <Card className="">Post Section</Card>
      </div>
    </section>
  );
}

export default ProfilePage;
