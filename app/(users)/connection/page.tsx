"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlinePersonRemove } from "react-icons/md";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function ConnectionPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen grid grid-cols-[70%_30%] gap-5 mt-5 mx-15">
      <div className="flex flex-col w-full border gap-5">
        <Card className="h-3/8 w-full">
          <div className="flex justify-between mx-3">
            <h1 className="text-2xl text-zinc-600 font-bold tracking-wide">
              Pending Requests
            </h1>
            <p className="border bg-zinc-200 h-10 w-10 text-center pt-2 rounded-full font-semibold">
              0
            </p>
          </div>
          <div className="flex flex-col items-center justify-between mt-5 w-full">
            <div className="flex items-center justify-between rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow mt-5 w-full">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--brand-maroon) text-2xl font-semibold text-white">
                  S
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-zinc-800">
                    Sasher
                  </h3>
                  <p className="text-lg text-zinc-500">Frontend Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-3xl border border-red-500 px-6 py-2 font-medium text-red-500 transition-colors hover:bg-red-100 cursor-pointer">
                  Reject
                </button>

                <button className="rounded-3xl hover:bg-blue-600 px-6 py-2 font-medium text-white transition-colors bg-(--brand-blue) cursor-pointer">
                  Accept
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow mt-5 w-full">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--brand-maroon) text-2xl font-semibold text-white">
                  S
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-zinc-800">
                    Sasher Gurung
                  </h3>
                  <p className="text-lg text-zinc-500">Frontend </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-3xl border border-red-500 px-6 py-2 font-medium text-red-500 transition-colors hover:bg-red-100 cursor-pointer">
                  Reject
                </button>

                <button className="rounded-3xl hover:bg-blue-600 px-6 py-2 font-medium text-white transition-colors bg-(--brand-blue) cursor-pointer">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="h-3/8 w-full">
          <div className="flex justify-between mx-3">
            <h1 className="text-2xl text-zinc-600 font-bold tracking-wide">
              My Connections
            </h1>
            <p className="border bg-zinc-200 h-10 w-10 text-center pt-2 rounded-full font-semibold">
              0
            </p>
          </div>
          <div className="flex flex-col items-center justify-between mt-5 w-full">
            <div className="flex items-center justify-between rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow mt-5 w-full">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--brand-maroon) text-2xl font-semibold text-white">
                  S
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-zinc-800">
                    Sasher
                  </h3>
                  <p className="text-lg text-zinc-500">Frontend Developer</p>
                </div>
              </div>

              <button className="rounded-3xl border border-red-500 px-6 py-2 font-medium text-red-500 transition-colors hover:bg-red-100 cursor-pointer flex items-center gap-2">
                <MdOutlinePersonRemove className="h-5 w-5" />
                <HoverCard>
                  <HoverCardTrigger>Remove</HoverCardTrigger>
                  <HoverCardContent side="top" align="start" className="w-38 text-red-600">
                    Remove Connection
                  </HoverCardContent>
                </HoverCard>
              </button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="sticky top-22 h-fit p-6 flex flex-col items-center text-center space-y-3">
        <h2 className="text-2xl font-bold tracking-wide text-zinc-600">
          Grow Your Network
        </h2>

        <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
          Connect with more people to expand your professional network, discover
          new opportunities and stay updated with the latest activities.
        </p>

        <button
          onClick={() => router.push("/discover")}
          className="mt-2 rounded-full border border-red-500 px-8 py-2.5 font-medium text-red-500 transition-colors duration-200 hover:bg-red-50 hover:border-red-600 cursor-pointer"
        >
          Discover Your Network
        </button>
      </Card>
    </section>
  );
}

export default ConnectionPage;
