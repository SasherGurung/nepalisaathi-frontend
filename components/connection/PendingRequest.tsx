import React from "react";
import { Card } from "@/components/ui/card";
import { RxCross2 } from "react-icons/rx";
import { useConnectionStore } from "@/lib/stores/Connection/connectionStore";
import Image from "next/image";
import { MdOutlineGroup } from "react-icons/md";

function PendingRquest() {
  const {
    receiveRequest,
    acceptConnection,
    declineConnection,
  } = useConnectionStore();
  return (
    <>
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
    </>
  );
}

export default PendingRquest;
