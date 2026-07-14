"use client";

import { Card } from "@/components/ui/card";
import PendingRequest from "@/components/connection/PendingRequest";
import MyConnections from "@/components/connection/MyConnections";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useConnectionStore } from "@/lib/stores/Connection/connectionStore";
import { useConnectionUserStore } from "@/lib/stores/Connection/connectionUserStore";

function ConnectionPage() {
  const router = useRouter();
  const { fetchReceivedRequests } = useConnectionStore();
const { fetchConnectionUsers } = useConnectionUserStore();
  useEffect(() => {
    fetchReceivedRequests();
    fetchConnectionUsers();
  }, [fetchReceivedRequests, fetchConnectionUsers]);
  return (
    <section className="min-h-screen grid grid-cols-[70%_30%] gap-5 mt-5 mx-50">
      <div className="flex flex-col w-full gap-5">
        <PendingRequest />
        <MyConnections />
      </div>

      <Card className="sticky top-23 h-47 p-6 flex flex-col space-y-2">
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
