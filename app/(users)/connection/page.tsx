"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";
import { RxCross2 } from "react-icons/rx";

function ConnectionPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen grid grid-cols-[70%_30%] gap-5 mt-5 mx-50">
      <div className="flex flex-col w-full border gap-5">
        <Card className="h-auto w-full">
          <div className="flex justify-between mx-3">
            <h1 className="text-xl text-zinc-600 font-bold tracking-wide">
              Pending Requests
            </h1>
            <p className="border bg-zinc-100 h-6 w-6 text-center text-xs pt-1 rounded-full font-semibold">
              0
            </p>
          </div>
          <div className="flex flex-col items-center justify-between mt-5 w-full">
            <div className="flex items-center justify-between rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow mt-5 w-full">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 text-xl font-semibold text-white">
                  S
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-zinc-800">
                    Sasher
                  </h3>
                  <p className="text-sm text-zinc-500">Frontend Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="border-red-600 rounded-full h-7 w-7 flex justify-center text-red-500 items-center transition-colors hover:bg-red-50 cursor-pointer">
                  <RxCross2 />
                </button>

                <button className="rounded-2xl hover:bg-blue-600 px-5 py-2 text-white transition-colors bg-(--brand-blue) text-sm cursor-pointer">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="h-auto w-full">
          <div className="flex justify-between mx-3">
            <h1 className="text-xl text-zinc-600 font-bold tracking-wide">
              My Connections
            </h1>
            <p className="border bg-zinc-200 h-10 w-10 text-center pt-2 rounded-full font-semibold">
              0
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center justify-between w-full">
              <div className="flex items-center justify-between rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow mt-5 w-full">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 text-xl font-semibold text-white">
                    S
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-zinc-800">
                      Sasher
                    </h3>
                    <p className="text-sm text-zinc-500">Frontend Developer</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="border-red-600 rounded-full h-7 w-7 flex justify-center text-red-500 items-center transition-colors hover:bg-red-50 cursor-pointer">
                    <RxCross2 />
                  </button>

                  <button className="rounded-2xl hover:bg-blue-600 px-5 py-2 text-white transition-colors bg-(--brand-blue) text-sm cursor-pointer">
                    Accept
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between w-full">
              <div className="flex items-center justify-between rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow mt-5 w-full">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 text-xl font-semibold text-white">
                    S
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-zinc-800">
                      Sasher
                    </h3>
                    <p className="text-sm text-zinc-500">Frontend Developer</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="border-red-600 rounded-full h-7 w-7 flex justify-center text-red-500 items-center transition-colors hover:bg-red-50 cursor-pointer">
                    <RxCross2 />
                  </button>

                  <button className="rounded-2xl hover:bg-blue-600 px-5 py-2 text-white transition-colors bg-(--brand-blue) text-sm cursor-pointer">
                    Accept
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between w-full">
              <div className="flex items-center justify-between rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow w-full">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 text-xl font-semibold text-white">
                    S
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-zinc-800">
                      Sasher
                    </h3>
                    <p className="text-sm text-zinc-500">Frontend Developer</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="border-red-600 rounded-full h-7 w-7 flex justify-center text-red-500 items-center transition-colors hover:bg-red-50 cursor-pointer">
                    <RxCross2 />
                  </button>

                  <button className="rounded-2xl hover:bg-blue-600 px-5 py-2 text-white transition-colors bg-(--brand-blue) text-sm cursor-pointer">
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="sticky top-20 h-47 p-6 flex flex-col space-y-2">
        <h2 className="text-xl font-bold tracking-wide text-zinc-600">
          Grow Your Network
        </h2>

        <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
        Connecting with more people helps you discover new opportunities and stay updated.
        </p>

        <button
          onClick={() => router.push("/discover")}
          className="mt-2 rounded-lg border border-(--brand-blue) px-8 py-2 font-medium text-(--brand-blue) transition-colors duration-200 hover:bg-blue-50 cursor-pointer"
        >
          Grow Your Network
        </button>
      </Card>
    </section>
  );
}

export default ConnectionPage;
