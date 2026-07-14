"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineGroup, MdOutlinePersonRemoveAlt1 } from "react-icons/md";
import { useConnectionStore } from "@/lib/stores/Discover/connectionStore";
import { useEffect } from "react";
import { useConnectionUserStore } from "@/lib/stores/Discover/connectionUserStore";
import Image from "next/image";

function ConnectionPage() {
  const router = useRouter();
  const {
    receiveRequest,
    fetchReceivedRequests,
    acceptConnection,
    declineConnection,
  } = useConnectionStore();
  const { connectionUsers, fetchConnectionUsers, deleteConnection } =
    useConnectionUserStore();

  useEffect(() => {
    fetchReceivedRequests();
  }, [fetchReceivedRequests]);

  useEffect(() => {
    fetchConnectionUsers();
  }, [fetchConnectionUsers]);

  return (
    <section className="min-h-screen grid grid-cols-[70%_30%] gap-5 mt-5 mx-50">
      <div className="flex flex-col w-full gap-5">
        <Card className="h-auto w-full">
          <div className="flex justify-between mx-3 border-b pb-3">
            <h1 className="text-xl text-zinc-600 font-bold tracking-wide">
              Pending Requests
            </h1>
            <p className="border bg-zinc-100 h-6 w-6 text-center text-xs pt-1 rounded-full font-semibold">
              {receiveRequest.length}
            </p>
          </div>
          {receiveRequest.length === 0 ? (
            <div className="flex justify-center items-center flex-col text-center p-5">
              <MdOutlineGroup className="w-17 h-17 text-zinc-300" />
              <h1 className="font-medium text-xl text-zinc-500">
                No pending requests
              </h1>
              <p className="font-light text-zinc-500 text-sm line-clamp-3 w-sm">
                You are all caught up! Explore the Discover page to find more
                people.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-between mt-5 w-full">
              {receiveRequest.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between rounded-xl border py-4 px-5 shadow-sm hover:shadow-md transition-shadow mt-4 w-full"
                >
                  <div className="flex items-center gap-4">
                    {request.otherUser.profilePicture ? (
                      <Image
                        src={request.otherUser.profilePicture}
                        alt={request.senderName}
                        width={96}
                        height={96}
                        className="h-10 w-10 rounded-full object-cover shadow-md"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-blue) text-xl font-semibold text-white">
                        {request.senderName.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-zinc-800">
                        {request.senderName}
                      </h3>
                      <p className="text-sm text-zinc-500">
                        {request.senderProfession}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => declineConnection(request.senderId)}
                      className="border-red-600 rounded-full h-7 w-7 flex justify-center text-red-500 items-center transition-colors hover:bg-red-50 cursor-pointer"
                    >
                      <RxCross2 />
                    </button>

                    <button
                      onClick={() => acceptConnection(request.senderId)}
                      className="rounded-2xl hover:bg-blue-600 px-5 py-2 text-white transition-colors bg-(--brand-blue) text-sm cursor-pointer"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="h-auto w-full">
          <div className="flex justify-between mx-3 border-b pb-5">
            <h1 className="text-xl text-zinc-600 font-bold tracking-wide">
              My Connections
            </h1>
            <p className="border bg-zinc-200 h-6 w-6 text-center rounded-full font-semibold text-xs pt-1">
              {connectionUsers.length}
            </p>
          </div>
          <div>
            {connectionUsers.length === 0 ? (
              <div className="flex justify-center items-center flex-col text-center mt-17">
                <MdOutlineGroup className="w-20 h-20 text-zinc-300" />
                <h1 className="font-medium text-xl text-zinc-500">
                  No Connections yet
                </h1>
                <p className="font-light text-zinc-500 text-sm line-clamp-3 w-sm">
                  Build your network by connecting with people from your
                  hometown and profession.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {connectionUsers.map((connectionUser) => (
                  <div
                    key={connectionUser.uid}
                    className="flex flex-col items-center w-full"
                  >
                    <div className="flex items-center justify-between rounded-xl border p-3 shadow-sm hover:shadow-md transition-shadow mt-5 w-full">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-blue) text-xl font-semibold text-white">
                          {connectionUser.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-zinc-800">
                            {connectionUser.name || connectionUser.displayName}
                          </h3>

                          <p className="text-sm text-zinc-500">
                            {connectionUser.profession}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          deleteConnection(connectionUser.connectionId)
                        }
                        className="border-red-600 rounded-full h-7 w-7 flex justify-center items-center text-red-500 hover:bg-red-50 cursor-pointer"
                      >
                        <MdOutlinePersonRemoveAlt1 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="sticky top-20 h-47 p-6 flex flex-col space-y-2">
        <h2 className="text-xl font-bold tracking-wide text-zinc-600">
          Grow Your Network
        </h2>

        <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
          Connecting with more people helps you discover new opportunities and
          stay updated.
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
