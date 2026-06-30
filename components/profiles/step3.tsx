"use client";

import React, { useRef, useState } from "react";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FiUpload, FiImage } from "react-icons/fi";
import { useProfileStore } from "@/lib/stores/profileStore";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export default function Step3() {
  const {
    formData,
    setFormData,
    profilePreview,
    setProfilePreview,
    coverPreview,
    setCoverPreview,
    setDeleteProfilePreview,
    setDeleteCoverPreview,
  } = useProfileStore();

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [mapOpen, setMapOpen] = useState(false);

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData({ profilePicture: file });
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleProfileClick = () => {
    profileInputRef?.current?.click();
  };

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData({ coverPicture: file });
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleCoverClick = () => {
    coverInputRef?.current?.click();
  };

  const handleDeleteProfilePreview = () => {
    setDeleteProfilePreview();
  };

  const handleDeleteCoverPreview = () => {
    setDeleteCoverPreview();
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
          className="h-11 bg-zinc-50 border-zinc-200 focus-visible:ring-1 focus-visible:ring-indigo-500 cursor-pointer"
        />

        <FieldLabel className="text-zinc-500 text-sm">Short Bio</FieldLabel>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ bio: e.target.value })}
          placeholder="Tell the community a bit about yourself.."
          className="h-25 bg-zinc-50 border-zinc-200 focus-visible:ring-1 focus-visible:ring-indigo-500"
        />
      </Field>

      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <form>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Approximate Location</DialogTitle>
              <DialogDescription className="text-xs text-red-400">
              Location Privacy: We do not show your exact location. This is just used to connect you with people nearby.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              
            </FieldGroup>
            <DialogFooter>
              <Button type="submit" className="bg-indigo-500 text-white cursor-pointer hover:bg-indigo-600">Confirm Location</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
