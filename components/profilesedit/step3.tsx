"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { FiUpload, FiImage } from "react-icons/fi";
import { XIcon } from "lucide-react";

import { Field, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { useImageStore } from "@/lib/stores/EditProfile/imageStore";
import { useProfileStepStore } from "@/lib/stores/EditProfile/profileStepsStore";
import { Switch } from "../ui/switch";

export default function Step3() {
  const { formData, setFormData } = useProfileStepStore();

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

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("Selected file:", file);

    const preview = URL.createObjectURL(file);

    setProfilePicture(file); // File -> image store
    setProfilePreview(preview); // Preview -> image store
    console.log(useImageStore.getState().profilePicture);

    setFormData({
      profilePicture: preview, // String -> persisted store
    });
  };

  const handleProfileClick = () => {
    profileInputRef?.current?.click();
  };

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setCoverPicture(file);
    setCoverPreview(preview);

    setFormData({
      coverPicture: preview,
    });
  };

  const handleCoverClick = () => {
    coverInputRef?.current?.click();
  };

  const handleDeleteProfilePreview = () => {
    clearProfileImage();

    setFormData({
      profilePicture: null,
    });
  };

  const handleDeleteCoverPreview = () => {
    clearCoverImage();

    setFormData({
      coverPicture: null,
    });
  };

  useEffect(() => {
    if (formData.profilePicture) {
      setProfilePreview(formData.profilePicture);
    }

    if (formData.coverPicture) {
      setCoverPreview(formData.coverPicture);
    }
  }, [
    formData.profilePicture,
    formData.coverPicture,
    setProfilePreview,
    setCoverPreview,
  ]);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">A bit more about you</h2>

      <div className="grid grid-cols-2 gap-3">
        <p className="text-zinc-500 text-base">Profile Image</p>
        <p className="text-zinc-500 text-base">Cover Image</p>
        <div className="flex gap-6">
          <div
            onClick={handleProfileClick}
            className="relative flex items-center justify-center w-70 h-35 border-3 border-dashed border-zinc-300 bg-zinc-50 hover:bg-zinc-100 duration-300 rounded-xl cursor-pointer"
          >
            {profilePreview ? (
              <>
                <div className="relative w-30 h-30 rounded-full overflow-hidden">
                  <Image
                    src={profilePreview}
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProfilePreview();
                  }}
                  className="absolute top-2 right-2 z-10 bg-white border-2 border-zinc-200 rounded-full p-1 hover:bg-zinc-50 cursor-pointer"
                >
                  <XIcon className="h-4 w-4 text-red-500" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-30 h-30 rounded-full border-3 border-dashed border-zinc-300">
                <FiUpload className="h-7 w-7 text-gray-400" />
                <p className="mt-2 text-gray-500 text-sm font-semibold text-center">
                  Upload Profile Picture
                </p>
              </div>
            )}

            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImage}
            />
          </div>
        </div>
        <div
          onClick={handleCoverClick}
          className="relative flex items-center justify-center w-70 h-35 border-3 border-dashed border-zinc-300 bg-zinc-50 hover:bg-zinc-100 duration-300 rounded-xl cursor-pointer overflow-hidden"
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCoverPreview();
                }}
                className="absolute top-2 right-2 z-10 bg-white border-2 border-zinc-200 rounded-full p-1 hover:bg-zinc-50 cursor-pointer"
              >
                <XIcon className="h-4 w-4 text-red-500" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FiImage className="h-7 w-7 text-gray-400" />
              <p className="mt-2 text-gray-500 text-sm font-semibold">
                Upload Cover Image
              </p>
            </div>
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
        <FieldLabel className="text-zinc-500 text-base">Short Bio</FieldLabel>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ bio: e.target.value })}
          placeholder="Tell the community a bit about yourself.."
          className="h-23 bg-zinc-50 border-zinc-200 focus-visible:ring-1 focus-visible:ring-red-600"
        />
      </Field>

      <div className="flex items-center justify-between p-5">
        <div className="pr-6">
          <h3 className="font-medium">Open to networking</h3>

          <p className="text-sm text-zinc-500 mt-1">
          Show an indicator on your profile that you are open to messages.
          </p>
        </div>

        <Switch className="cursor-pointer data-[state=checked]:bg-red-700" />
      </div>
    </div>
  );
}
