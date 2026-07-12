import Image from "next/image";
import { MdOutlineGroup } from "react-icons/md";
import { DiscoverUser } from "./types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type SuggestedUsersProps = {
  users: DiscoverUser[];
};

export default function SuggestedUsers({ users }: SuggestedUsersProps) {

  const router = useRouter();

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm  w-xs h-full sticky top-28">
     
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-md font-semibold text-black tracking-wide">
          <MdOutlineGroup className="h-6 w-6 text-zinc-500" />
          Suggested for you
        </h3>
        <div>
          <Button variant="link" onClick={() => router.push("/discover")} className="cursor-pointer text-sm text-zinc-500">
              See all
          </Button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center text-center">
          <MdOutlineGroup className="h-15 w-15 text-zinc-400" />

          <h2 className="mt-2 text-2xl font-bold">No Users Found</h2>

          <p className="mt-2 text-sm text-zinc-500">
            We could not find any new people to connect with right now. Check
            back later as our community grows!
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {users.slice(0, 5).map((user) => (
            <div key={user.uid} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gray-300">
                  <Image
                    src={user.profilePicture || "/logo.png"}
                    alt={user.name || user.displayName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm truncate max-w-full">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.profession}</p>
                </div>
              </div>

              <button className="cursor-pointer px-5 py-1.5 border border-(--brand-blue) rounded-2xl text-sm text-(--brand-blue) hover:bg-blue-50 ml-3">
                Connect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
