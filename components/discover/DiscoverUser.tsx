import Image from "next/image";
import { MdOutlineGroup } from "react-icons/md";
import { DiscoverUser } from "./types";
import { useConnectionStore } from "@/lib/stores/Connection/connectionStore";

type DiscoverUserProps = {
  users: DiscoverUser[];
};

export default function DiscoverUsers({ users }: DiscoverUserProps) {

  const { postConnection } = useConnectionStore();

  const handleConnectionRequest = async (receiverId: string) => {
    await postConnection(receiverId);
  }


  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col text-center mt-17">
        <MdOutlineGroup className="w-20 h-20 text-zinc-400" />
        <h1 className="font-bold text-3xl">No User Found</h1>
        <p className="font-light text-zinc-500 text-sm line-clamp-3 w-sm">
          We could not find any people matching this category. Try selecting a
          different category to discover more connections.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 mt-5">
      {users.map((user) => (
        <div
          key={user.uid}
          className="w-sm  rounded-2xl bg-white border border-zinc-200 transition-all duration-100 hover:shadow-md"
        >
          <div className="flex flex-col items-center px-6 py-6 pb-6">
            {user.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt="Profile Image"
                width={96}
                height={96}
                className="h-15 w-15 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="w-15 h-15 rounded-full bg-blue-100 shadow-md flex justify-center items-center">
                <span className="text-4xl font-bold text-white">
                  {(user.name || user.displayName)?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <h3 className="mt-3 text-lg font-semibold text-zinc-900">
              {user.name || user.displayName}
            </h3>

            <p className="text-sm text-zinc-500">{user.profession}</p>
            <p className="text-sm text-zinc-500">{user.status}</p>

            <button onClick={() => handleConnectionRequest(user.uid)} className="mt-5 w-full rounded-2xl text-(--brand-blue) py-1.5 font-medium border border-(--brand-blue) hover:bg-blue-50 transition-all cursor-pointer">
              Connect
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
