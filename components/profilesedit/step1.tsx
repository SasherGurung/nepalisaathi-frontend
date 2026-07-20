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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { MunicipalityType } from "@/lib/types/EditProfile/Locations/location.types";
import MapLocation from "../map/locationMarker";
import { Input } from "../ui/input";
import { useProfileStepStore } from "@/lib/stores/EditProfile/profileStepsStore";

export default function Step1() {
  const {
    provinces,
    districts,
    municipalities,
    fetchProvinces,
    fetchDistricts,
    fetchMunicipalities,
  } = useLocationStore();

  const { formData, setFormData } = useProfileStepStore();

  const [provinceId, setProvinceId] = useState<number>();
  const [districtId, setDistrictId] = useState<number>();
  const [municipalityId, setMunicipalityId] = useState<number>();
  const [municipalityType, setMunicipalityType] = useState<
    MunicipalityType | undefined
  >();

  const [mapOpen, setMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  useEffect(() => {
    if (provinceId) {
      fetchDistricts(provinceId);
    }
  }, [provinceId, fetchDistricts]);

  useEffect(() => {
    if (districtId && municipalityType) {
      fetchMunicipalities(districtId, municipalityType);
    }
  }, [districtId, municipalityType, fetchMunicipalities]);

  const handleConfirm = () => {
    if (!selectedLocation) return;

    setFormData({
      approximateLocation: `Lat: ${selectedLocation.lat.toFixed(
        4,
      )}, Lng: ${selectedLocation.lng.toFixed(4)}`,
    });

    setMapOpen(false);
  };

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
                const selected = provinces.find((p) => p.id === id);

                setProvinceId(id);
                setDistrictId(undefined);
                setMunicipalityType(undefined);
                setMunicipalityId(undefined);

                setFormData({
                  province: selected?.name ?? "",
                  district: "",
                  municipalityType: "",
                  municipality: "",
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>
              <SelectContent side="bottom">
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
                const selected = districts.find((d) => d.id === id);

                setDistrictId(id);
                setMunicipalityId(undefined);

                setFormData({
                  district: selected?.name ?? "",
                  municipality: "",
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent side="bottom">
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
              disabled={!districtId}
              value={municipalityType}
              onValueChange={(value) => {
                setMunicipalityType(value as MunicipalityType);
                setMunicipalityId(undefined);

                setFormData({
                  municipalityType: value,
                  municipality: "",
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Municipality Type" />
              </SelectTrigger>
              <SelectContent side="bottom">
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
              disabled={!municipalityType}
              value={municipalityId?.toString()}
              onValueChange={(value) => {
                const id = Number(value);
                const selected = municipalities.find((m) => m.id === id);

                setMunicipalityId(id);

                setFormData({
                  municipality: selected?.name ?? "",
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Municipality" />
              </SelectTrigger>
              <SelectContent side="bottom">
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

      <Field className="mt-6">
        <FieldLabel className="text-zinc-500 text-sm">
          Current City (Abroad)
        </FieldLabel>

        <Input
          readOnly
          value={formData.approximateLocation}
          onClick={() => setMapOpen(true)}
          placeholder="Select location on map"
          className="h-11 bg-zinc-50 cursor-pointer"
        />
      </Field>

      <AlertDialog open={mapOpen} onOpenChange={setMapOpen}>
        <AlertDialogContent className="max-w-5xl w-3/4 h-[65  vh]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-semibold">
              Approximate Location
            </AlertDialogTitle>
            <AlertDialogDescription className="text-(--brand-maroon)">
              We do not show your exact location. This is only used to connect
              you with people nearby.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <MapLocation
            onLocationSelect={(lat, lng) => {
              setSelectedLocation({ lat, lng });
            }}
          />

          <AlertDialogFooter>
            <AlertDialogCancel className="p-5 cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="p-5 bg-red-700 hover:bg-red-600 cursor-pointer"
              onClick={handleConfirm}
            >
              Confirm Location
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
