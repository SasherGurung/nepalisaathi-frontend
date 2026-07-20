"use client";

import * as React from "react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { GraduationCap, Plane } from "lucide-react";

function Step4() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Additional Details</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Help others know more about your journey and background.
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-5 text-zinc-600" />
            <h2 className="font-semibold">Education History</h2>
          </div>

          <Button variant="outline" className="cursor-pointer">
            Add Education
          </Button>
        </div>
        <div className="text-sm text-zinc-400 px-5">No education added yet.</div>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <Field className="w-full">
          <FieldLabel htmlFor="date-picker-simple">
            Arrival Date to Current Country
          </FieldLabel>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker-simple"
                className="w-full justify-start text-left font-normal mt-2"
              >
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>
        </Field>
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold">Visa Type</h2>

        <div className="grid gap-4 grid-cols-3">
          <div className="rounded-2xl border p-5 cursor-pointer transition-all hover:border-red-700 hover:bg-red-50 hover:shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="font-semibold">Temporary</h3>
            <p className="text-sm text-zinc-500">(Student, Work)</p>
          </div>

          <div className="rounded-2xl border p-5 cursor-pointer transition-all hover:border-red-700 hover:bg-red-50 hover:shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="font-semibold">Permanent</h3>
            <p className="text-sm text-zinc-500">
              (Dependent, Family sponsored, Asylum)
            </p>
          </div>

          <div className="rounded-2xl border p-5 cursor-pointer transition-all hover:border-red-700 hover:bg-red-50 hover:shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="font-semibold">Diplomatic</h3>
            <p className="text-sm text-zinc-500">(Diplomatic/Official Visas)</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white divide-y">
        <div className="flex items-center justify-between p-5">
          <div className="pr-6">
            <div className="flex items-center gap-2">
              <Plane className="size-4 text-zinc-500" />
              <h3 className="font-medium">Are you a new arrival?</h3>
            </div>

            <p className="text-sm text-zinc-500 mt-1">
              Toggle on if you recently moved to your current location.
            </p>
          </div>

          <Switch className="cursor-pointer data-[state=checked]:bg-red-700" />
        </div>

        <div className="flex items-center justify-between p-5">
          <div className="pr-6">
            <h3 className="font-medium">Open to helping newcomers?</h3>

            <p className="text-sm text-zinc-500 mt-1">
              Let new Nepalis know you are available to answer questions or
              provide guidance.
            </p>
          </div>

          <Switch className="cursor-pointer data-[state=checked]:bg-red-700" />
        </div>
      </div>
    </div>
  );
}

export default Step4;
