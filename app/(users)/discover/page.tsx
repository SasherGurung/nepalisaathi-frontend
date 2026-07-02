import React from 'react'
import {
  Card,

} from "@/components/ui/card"
import Image from "next/image";
import { FaRegCompass } from "react-icons/fa6";

function DiscoverPage() {
  return (
    <section className="min-h-screen flex justify-center">
        <Card className="w-7xl mt-6">
            <div className="items-center flex justify-center flex-col">
              <FaRegCompass className="text-gray-400 w-20 h-20 mb-3" />
              <div className="flex flex-col justify-center text-center gap-2">
                <h1 className="text-3xl text-zinc-500 font-bold">Discover New Connection</h1>
                <p className="line-clamp-3 w-lg text-zinc-500 text-sm">Find people from your hometown, discover new groups, and expand your professional network on Nepali Saathi.</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
                <button className="border bg-(--)">
                  All
                </button>
                <button>
                  Student
                </button>
                <button>
                  Working Professonal
                </button>
                <button>
                  Business Owner
                </button>
                <button>
                  Planning To Relocate
                </button>

            </div>
            <div>

            </div>
        </Card>
    </section>
  )
}

export default DiscoverPage