"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineGroup, MdOutlinePersonRemoveAlt1 } from "react-icons/md";
import { useConnectionStore } from "@/lib/stores/Discover/connectionStore";
import { useEffect } from "react";
import { useConnectionUserStore } from "@/lib/stores/Discover/connectionUserStore";

function ConnectionPage() {
  const router = useRouter();
  const {
    receiveRequest,
    fetchReceivedRequests,
    acceptConnection,
    declineConnection,
  } = useConnectionStore();
  const { connectionUsers } = useConnectionUserStore();

  useEffect(() => {
    fetchReceivedRequests();
  }, [fetchReceivedRequests]);

  return (
    <section className="min-h-screen grid grid-cols-[70%_30%] gap-5 mt-5 mx-50">
      <div className="flex flex-col w-full gap-5">
        <Card className="h-auto w-full">
          <div className="flex justify-between mx-3">
            <h1 className="text-xl text-zinc-600 font-bold tracking-wide">
              Pending Requests
            </h1>
            <p className="border bg-zinc-100 h-6 w-6 text-center text-xs pt-1 rounded-full font-semibold">
              {receiveRequest.length}
            </p>
          </div>
          <div className="flex flex-col items-center justify-between mt-5 w-full">
            {receiveRequest.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow mt-5 w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 text-xl font-semibold text-white">
                    {request.senderName.charAt(0).toUpperCase()}
                  </div>
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
                    onClick={() => declineConnection(request.id)}
                    className="border-red-600 rounded-full h-7 w-7 flex justify-center text-red-500 items-center transition-colors hover:bg-red-50 cursor-pointer"
                  >
                    <RxCross2 />
                  </button>

                  <button
                    onClick={() => {
                      console.log(request.id);
                      acceptConnection(request.id);
                    }}
                    className="rounded-2xl hover:bg-blue-600 px-5 py-2 text-white transition-colors bg-(--brand-blue) text-sm cursor-pointer"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
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
                <h1 className="font-bold text-2xl text-zinc-500">No Connections yet</h1>
                <p className="font-light text-zinc-500 text-sm line-clamp-3 w-sm">
                  Build your network by connecting with people from your
                  hometown and profession.
                </p>
              </div>
            ) : (
              connectionUsers.map((connectionUser) => (
                <div key={connectionUser.id} className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center justify-between w-full">
                    <div className="flex items-center justify-between rounded-xl border p-3 shadow-sm hover:shadow-md transition-shadow mt-5 w-full">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 text-xl font-semibold text-white">
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

                      <button className="border-red-600 rounded-full h-7 w-7 flex justify-center items-center text-red-500 hover:bg-red-50">
                        <MdOutlinePersonRemoveAlt1 />
                      </button>
                    </div>
                  </div>
                </div>
              ))
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
