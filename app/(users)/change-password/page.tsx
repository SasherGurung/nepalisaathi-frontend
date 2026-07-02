"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { api } from "@/lib/api/config";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/lib/stores/authStores";
import { ChangePasswordSchema } from "@/app/schema/changepasswordSchema";

function ChangePassword() {
  const { token } = useAuthStore();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/auth/change-password",
        {
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      console.log("Error:", err);
      toast.error((err as ErrorEvent)?.message || "Something went wrong! Please try again")
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-svh flex items-center justify-center bg-zinc-50 px-4">
      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Change Password</h1>

          <CardDescription className="mb-5">
            Secure your account with a new password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <FieldGroup className="space-y-4">
              <div className="relative">
                <FieldLabel htmlFor="currentPassword">
                  Current Password
                </FieldLabel>

                <Input
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type={showCurrentPassword ? "text" : "password"}
                  className="mt-2 h-10 bg-gray-50 border-gray-300 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-[42px] text-zinc-400 hover:text-zinc-600  cursor-pointer"
                >
                  {showCurrentPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              <div className="relative">
                <FieldLabel htmlFor="newPassword">New Password</FieldLabel>

                <Input
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type={showNewPassword ? "text" : "password"}
                  className="mt-2 h-10 bg-gray-50 border-gray-300 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-[42px] text-zinc-400 hover:text-zinc-600  cursor-pointer"
                >
                  {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              <div className="relative">
                <FieldLabel htmlFor="confirmPassword">
                  Confirm New Password
                </FieldLabel>

                <Input
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirmPassword ? "text" : "password"}
                  className="mt-2 h-10 bg-gray-50 border-gray-300 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[42px] text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </FieldGroup>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-10 cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="flex-1 h-10 bg-(--brand-maroon) hover:bg-red-600 cursor-pointer"
              >
                {loading ? "Changing Password..." : "Change Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default ChangePassword;
