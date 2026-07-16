"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FiUpload, FiImage } from "react-icons/fi";
import { XIcon } from "lucide-react";

import { Field, FieldLabel, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useProfileStore } from "@/lib/stores/EditProfile/profileStore";
import { useImageStore } from "@/lib/stores/EditProfile/imageStore";

const MapLocation = dynamic(() => import("@/components/map/locationMarker"), {
  ssr: false,
});

export default function Step3() {
  const { formData, setFormData, setLocation } = useProfileStore();

  const {
    profilePreview,
    coverPreview,
    setProfilePicture,
    setCoverPicture,
    setProfilePreview,
    setCoverPreview,
    clearProfileImage,
    clearCoverImage,
  } = useImageStore();

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [mapOpen, setMapOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleConfirm = () => {
    if (!selectedLocation) return;

    const { lat, lng } = selectedLocation;

    setLocation(
      lat,
      lng,
      `Latitude: ${lat.toFixed(5)} | Longitude: ${lng.toFixed(5)}`,
    );

    setMapOpen(false);
  };

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfilePicture(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleProfileClick = () => {
    profileInputRef?.current?.click();
  };

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverPicture(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleCoverClick = () => {
    coverInputRef?.current?.click();
  };

  const handleDeleteProfilePreview = () => {
    clearProfileImage();
  };

  const handleDeleteCoverPreview = () => {
    clearCoverImage();
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">A bit more about you</h2>

      <div className="grid grid-cols-2 gap-5">
        <p>Profile Image</p>
        <p>Cover Image</p>
        <div
          onClick={handleProfileClick}
          className="relative flex flex-col items-center justify-center border-3 border-dashed border-zinc-300 w-70 h-30 bg-zinc-50 hover:bg-zinc-100 duration-300 rounded-xl cursor-pointer overflow-hidden"
        >
          {profilePreview ? (
            <>
              <Image
                src={profilePreview}
                alt="Profile Picture"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={handleDeleteProfilePreview}
                className="absolute top-1 right-1 z-10 bg-zinc-200 rounded-full p-0.5 hover:bg-zinc-300"
              >
                <XIcon className="h-4 w-4 text-red-500 cursor-pointer" />
              </button>
            </>
          ) : (
            <>
              <FiUpload className="h-7 w-7 text-gray-400" />
              <p className="text-gray-500 text-sm font-semibold">
                Upload Profile Picture
              </p>
            </>
          )}
          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImage}
          />
        </div>

        <div
          onClick={handleCoverClick}
          className="relative flex flex-col items-center justify-center border-3 border-dashed border-zinc-300 w-70 h-30 bg-zinc-50 hover:bg-zinc-100 duration-300 rounded-xl cursor-pointer overflow-hidden"
        >
          {coverPreview ? (
            <>
              <Image
                src={coverPreview}
                alt="Cover Picture"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={handleDeleteCoverPreview}
                className="absolute top-1 right-1 z-10 bg-zinc-200 rounded-full p-0.5 hover:bg-zinc-300"
              >
                <XIcon className="h-4 w-4 text-red-500 cursor-pointer" />
              </button>
            </>
          ) : (
            <>
              <FiImage className="h-7 w-7 text-gray-400" />
              <p className="text-gray-500 text-sm font-semibold">
                Upload Cover Image
              </p>
            </>
          )}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverImage}
          />
        </div>
      </div>

      <Field>
        <FieldLabel className="text-zinc-500 text-sm">
          Current City (Abroad)
        </FieldLabel>
        <Input
          readOnly
          value={formData.approximateLocation}
          onClick={() => setMapOpen(true)}
          placeholder="Select location on map"
          className="h-11 bg-zinc-50 border-zinc-200 focus-visible:ring-1 focus-visible:ring-red-600 cursor-pointer"
        />

        <FieldLabel className="text-zinc-500 text-sm">Short Bio</FieldLabel>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ bio: e.target.value })}
          placeholder="Tell the community a bit about yourself.."
          className="h-25 bg-zinc-50 border-zinc-200 focus-visible:ring-1 focus-visible:ring-red-600"
        />
      </Field>

      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Approximate Location</DialogTitle>

            <DialogDescription className="text-xs text-red-400">
              Location Privacy: We do not show your exact location. This is only
              used to connect you with people nearby.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="flex justify-center">
            <MapLocation
              onLocationSelect={(lat, lng) => {
                setSelectedLocation({ lat, lng });
              }}
            />
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              onClick={handleConfirm}
              className="bg-(--) hover:bg-indigo-600 cursor-pointer rounded-2xl p-5"
            >
              Confirm Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
