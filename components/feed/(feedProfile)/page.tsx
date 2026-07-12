import React from "react";
import Image from "next/image";
import { useAuthStore } from "@/lib/stores/authStores";
import { useProfileStore } from "@/lib/stores/profileStore";
import { Card } from "@/components/ui/card";

function FeedProfile() {
  const { user } = useAuthStore();
  const { formData } = useProfileStore();
  return (
    <div className="w-[320px] space-y-6 sticky top-28 self-start">
      <div className="overflow-hidden rounded-2xl h-74 bg-white shadow-sm border">
        <div className="h-24 bg-red-400" />

        <div className="-mt-12 flex justify-center">
          {user?.profilePicture ? (
            <Image
              src={user.profilePicture}
              alt="Profile Image"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-zinc-100 bg-(--brand-maroon) text-3xl font-bold text-white shadow cursor-pointer">
              <span className="text-4xl font-bold text-white">
                {(user?.name || user?.displayName)?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-md tracking-wider font-bold text-gray-900">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-500">
            {formData?.profession || user?.profession}
          </p>
        </div>

        <div className="p-2">
          <Card className="shadow-sm flex flex-col">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Connections</p>
              <p className="text-gray-500">{user?.connectionsCount}</p>
            </div>

            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Total Posts</p>
              <p className="text-gray-500">{user?.postsCount}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FeedProfile;
