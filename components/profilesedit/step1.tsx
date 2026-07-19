"use client";

import { useLocationStore } from "@/lib/stores/EditProfile/Locations/locationStore";
import { Field, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

export default function Step1() {

  const { provinces, districts, municipalities, fetchProvinces, fetchDistricts, fetchMunicipalities } = useLocationStore();


  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">
            Where are you from in Nepal?
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            Select your permanent address in Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field>
            <FieldLabel className="text-zinc-500 text-sm">Province</FieldLabel>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Province</SelectLabel>

                  <SelectItem value="koshi">Koshi</SelectItem>
                  <SelectItem value="madhesh">Madhesh</SelectItem>
                  <SelectItem value="bagmati">Bagmati</SelectItem>
                  <SelectItem value="gandaki">Gandaki</SelectItem>
                  <SelectItem value="lumbini">Lumbini</SelectItem>
                  <SelectItem value="karnali">Karnali</SelectItem>
                  <SelectItem value="sudurpaschim">Sudurpashchim</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel className="text-zinc-500 text-sm">District</FieldLabel>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>District</SelectLabel>

                  <SelectItem value="kathmandu">Kathmandu</SelectItem>
                  <SelectItem value="lalitpur">Lalitpur</SelectItem>
                  <SelectItem value="bhaktapur">Bhaktapur</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel className="text-zinc-500 text-sm">
              Municipality
            </FieldLabel>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Municipality" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Municipality</SelectLabel>

                  <SelectItem value="kmc">
                    Kathmandu Metropolitan City
                  </SelectItem>
                  <SelectItem value="lmc">
                    Lalitpur Metropolitan City
                  </SelectItem>
                  <SelectItem value="bmc">Bhaktapur Municipality</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 mt-6">
        <p className="text-sm text-blue-700">
          Your hometown helps us connect you with people from your area and
          personalize your experience.
        </p>
      </div>
    </>
  );
}
