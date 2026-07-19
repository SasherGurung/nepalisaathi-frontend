"use client";

import { useLocationStore } from "@/lib/stores/EditProfile/Locations/locationStore";
import { Field, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { MunicipalityType } from "@/lib/types/EditProfile/Locations/location.types";

export default function Step1() {
  const {
    provinces,
    districts,
    municipalities,
    fetchProvinces,
    fetchDistricts,
    fetchMunicipalities,
  } = useLocationStore();

  const [provinceId, setProvinceId] = useState<number>();
  const [districtId, setDistrictId] = useState<number>();
  const [type, setType] = useState<MunicipalityType>("Nagarpalika");

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

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

            <Select
              onValueChange={(value) => {
                const id = Number(value);

                setProvinceId(id);
                setDistrictId(undefined);

                fetchDistricts(id);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>

              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.id.toString()}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel className="text-zinc-500 text-sm">District</FieldLabel>

            <Select
              disabled={!provinceId}
              onValueChange={(value) => {
                const id = Number(value);

                setDistrictId(id);

                fetchMunicipalities(id, type);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>

              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.id} value={district.id.toString()}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel className="text-zinc-500 text-sm">
              Municipality Type
            </FieldLabel>

            <Select
              value={type}
              onValueChange={(value) => {
                const selectedType = value as MunicipalityType;

                setType(selectedType);

                if (districtId) {
                  fetchMunicipalities(districtId, selectedType);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Municipality Type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Nagarpalika">Nagarpalika</SelectItem>
                <SelectItem value="Gaupalika">Gaupalika</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel className="text-zinc-500 text-sm">
              Municipality
            </FieldLabel>

            <Select
              disabled={!districtId}
              onValueChange={(value) => {
                const municipalityId = Number(value);

                console.log("Selected Municipality ID:", municipalityId);

                // Save the municipality id here if needed
                // setMunicipalityId(municipalityId);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Municipality" />
              </SelectTrigger>

              <SelectContent>
                {municipalities.map((municipality) => (
                  <SelectItem
                    key={municipality.id}
                    value={municipality.id.toString()}
                  >
                    {municipality.name}
                  </SelectItem>
                ))}
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
