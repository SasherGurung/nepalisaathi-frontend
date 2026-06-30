"use client"

import React from "react";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useProfileStore } from "@/lib/stores/profileStore";

export default function Step1() {

  const { formData, setFormData } = useProfileStore();

  return (
    <>
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold">
            Where are you from in Nepal?
          </h2>
        </div>

        <Field>
          <FieldLabel className="text-zinc-500 text-sm">
            Home City or District
          </FieldLabel>

          <Input
            id="city"
            placeholder="e.g Kathmandu, Pokhara, Chitwan..."
            value={formData.homeCity}
            onChange={(e) => setFormData({
              homeCity: e.target.value
            })}
            className="h-11 bg-zinc-50 border-zinc-200 focus-visible:ring-1 focus-visible:ring-indigo-500"
          />
        </Field>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-700">
          We use this to help you connect with people from your hometown.
        </p>
      </div>
    </>
  );
}

