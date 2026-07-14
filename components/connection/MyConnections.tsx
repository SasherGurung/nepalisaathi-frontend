import React from "react";
import { Card } from "@/components/ui/card";
import { MdOutlineGroup, MdOutlinePersonRemoveAlt1 } from "react-icons/md";
import { useConnectionUserStore } from "@/lib/stores/Connection/connectionUserStore";
import Image from "next/image";

function MyConnections() {
  const { connectionUsers, deleteConnection } = useConnectionUserStore();

  return (
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
              Build your network by connecting with people from your hometown
              and profession.
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
                    {connectionUser.profilePicture ? (
                      <Image
                        src={connectionUser.profilePicture}
                        alt={connectionUser.displayName}
                        width={30}
                        height={30}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-blue) text-xl font-semibold text-white">
                        {connectionUser.name.charAt(0).toUpperCase()}
                      </div>
                    )}

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
  );
}

export default MyConnections;
