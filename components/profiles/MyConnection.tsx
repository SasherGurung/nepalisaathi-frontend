import React from "react";
import { Card } from "@/components/ui/card";
import { MdOutlineGroup } from "react-icons/md";
import { useConnectionUserStore } from "@/lib/stores/Connection/connectionUserStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

function MyConnection() {
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
          <div className="grid grid-cols-3 gap-2">
            {connectionUsers.map((connectionUser) => (
              <div key={connectionUser.uid}>
                {connectionUser.profilePicture ? (
                  <Image
                    src={connectionUser.profilePicture}
                    alt={connectionUser.displayName}
                    width={30}  
                    height={30}
                    className="h-25 w-25 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-25 w-25 items-center justify-center rounded-xl bg-(--brand-blue) text-4xl font-semibold text-white">
                    {connectionUser.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <p className="mt-3 text-lg font-semibold text-zinc-800 truncate">
                  {connectionUser.name || connectionUser.displayName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export default MyConnection;
