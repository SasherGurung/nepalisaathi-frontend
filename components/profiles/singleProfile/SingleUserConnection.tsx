"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineGroup } from "react-icons/md";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useConnectionUserStore } from "@/lib/stores/Connection/connectionUserStore";

export default function SingleUserConnection() {
  const router = useRouter();
  const { connectionUsers } = useConnectionUserStore();

  return (
    <Card className="p-6 space-y-5 mr-5 h-auto">
      <div className="flex justify-between mx-3 border-b pb-5">
        <h1 className="text-xl text-zinc-600 font-bold tracking-wide">
          My Connections
        </h1>

        <Button
          onClick={() => router.push("/connection")}
          variant="link"
          className="border font-semibold text-lg text-zinc-500 cursor-pointer"
        >
          All
        </Button>
      </div>

      <div>
        {connectionUsers.length === 0 ? (
          <div className="flex justify-center items-center flex-col text-center mt-17">
            <MdOutlineGroup className="w-20 h-20 text-zinc-300" />

            <h1 className="font-medium text-xl text-zinc-500">
              No Connections yet
            </h1>

            <p className="font-light text-zinc-500 text-sm line-clamp-3 w-sm">
              Build your network by connecting with people from your hometown
              and profession.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {connectionUsers.map((connectionUser) => (
              <div
                key={connectionUser.otherUser.uid}
                className="flex flex-col items-center"
              >
                {connectionUser.otherUser.profilePicture ? (
                  <Image
                    src={connectionUser.otherUser.profilePicture}
                    alt={connectionUser.otherUser.name}
                    width={100}
                    height={100}
                    onClick={() =>
                      router.push(`/profile/${connectionUser.otherUser.uid}`)
                    }
                    className="h-25 w-25 rounded-xl object-cover cursor-pointer hover:opacity-90 transition"
                  />
                ) : (
                  <div
                    onClick={() =>
                      router.push(`/profile/${connectionUser.otherUser.uid}`)
                    }
                    className="flex h-25 w-25 items-center justify-center rounded-xl bg-(--brand-blue) text-4xl font-semibold text-white cursor-pointer"
                  >
                    {connectionUser.otherUser.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                <Button
                  variant="link"
                  onClick={() =>
                    router.push(`/profile/${connectionUser.otherUser.uid}`)
                  }
                  className="mt-2 p-0 h-auto text-lg font-semibold text-zinc-800 truncate cursor-pointer"
                >
                  {connectionUser.otherUser.name ||
                    connectionUser.otherUser.displayName}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}