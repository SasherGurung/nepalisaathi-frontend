"use client";

import * as React from "react";
import { format } from "date-fns";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { X } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { GraduationCap, Plane } from "lucide-react";
import { useProfileStepStore } from "@/lib/stores/EditProfile/profileStepsStore";

const visaTypes = [
  {
    title: "Temporary",
    description: "(Student, Work)",
  },
  {
    title: "Permanent",
    description: "(Dependent, Family sponsored, Asylum)",
  },
  {
    title: "Diplomatic",
    description: "(Diplomatic/Official Visas)",
  },
];

type Education = {
  level: string;
  institution: string;
};

function Step4() {
  const { formData, setFormData } = useProfileStepStore();
  const [educations, setEducations] = useState<Education[]>([]);
  const selectedDate = formData.arrival_date
    ? new Date(formData.arrival_date)
    : undefined;

  const addEducation = () => {
    setEducations((prev) => [
      ...prev,
      {
        level: "",
        institution: "",
      },
    ]);
  };

  const updateEducation = (
    index: number,
    field: "level" | "institution",
    value: string,
  ) => {
    setEducations((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const removeEducation = (index: number) => {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
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

          <Button
            type="button"
            variant="outline"
            className="cursor-pointer p-4"
            onClick={addEducation}
          >
            Add Education
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          {educations.length === 0 ? (
            <div className="text-sm text-zinc-400 px-5">
              No education added yet.
            </div>
          ) : (
            educations.map((education, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border p-4"
              >
                <Select
                  value={education.level}
                  onValueChange={(value) =>
                    updateEducation(index, "level", value)
                  }
                >
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Select Education Level" />
                  </SelectTrigger>

                  <SelectContent side="bottom">
                    <SelectItem value="SLC/SEE">SLC/SEE</SelectItem>
                    <SelectItem value="+2">+2</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="Bachelor">Bachelor</SelectItem>
                    <SelectItem value="Master">Master</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Institution Name"
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  className="flex-1"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                className="cursor-pointer"
                  onClick={() => removeEducation(index)}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))
          )}
        </div>
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
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                defaultMonth={selectedDate}
                onSelect={(date) => {
                  if (!date) return;

                  setFormData({
                    arrival_date: date.toISOString(),
                  });
                }}
              />
            </PopoverContent>
          </Popover>
        </Field>
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold">Visa Type</h2>

        <div className="grid gap-4 grid-cols-3">
          {visaTypes.map((visa) => (
            <div
              key={visa.title}
              onClick={() =>
                setFormData({
                  visa_type: visa.title,
                })
              }
              className={`rounded-2xl border p-5 cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
                formData.visa_type === visa.title
                  ? "border-red-700 bg-red-50 ring-1 ring-red-700"
                  : "hover:border-red-700 hover:bg-red-50"
              }`}
            >
              <h3 className="font-semibold">{visa.title}</h3>
              <p className="text-sm text-zinc-500">{visa.description}</p>
            </div>
          ))}
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

          <Switch
            checked={formData.is_new_arrival}
            onCheckedChange={(checked) =>
              setFormData({
                is_new_arrival: checked,
              })
            }
            className="cursor-pointer data-[state=checked]:bg-red-700"
          />
        </div>

        <div className="flex items-center justify-between p-5">
          <div className="pr-6">
            <h3 className="font-medium">Open to helping newcomers?</h3>

            <p className="text-sm text-zinc-500 mt-1">
              Let new Nepalis know you are available to answer questions or
              provide guidance.
            </p>
          </div>

          <Switch
            checked={formData.open_to_helping_newcomers}
            onCheckedChange={(checked) =>
              setFormData({
                open_to_helping_newcomers: checked,
              })
            }
            className="cursor-pointer data-[state=checked]:bg-red-700"
          />
        </div>
      </div>
    </div>
  );
}

export default Step4;
