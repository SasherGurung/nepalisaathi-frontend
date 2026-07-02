"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
          <form className="space-y-5">
            <FieldGroup className="space-y-1">
              <div className="relative">
                <FieldLabel htmlFor="currentPassword">
                  Current Password
                </FieldLabel>
                <Input
                  id="currentpassword"
                  className="h-10 bg-gray-100 focus-visible:ring-1 
                   border-gray-300 focus-visible:border-red-600 focus-visible:outline-none mt-2"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-12 -translate-y-1/2 text-md hover:text-zinc-500 text-zinc-400 cursor-pointer "
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              <div className="relative">
                <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                <Input
                  id="currentpassword"
                  className="h-10 bg-gray-100 focus-visible:ring-1 
                   border-gray-300 focus-visible:border-red-600 focus-visible:outline-none mt-2"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-12 -translate-y-1/2 text-md hover:text-zinc-500 text-zinc-400 cursor-pointer"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              <div className="relative">
                <FieldLabel htmlFor="cofirmNewPassword">
                  Confirm New Password
                </FieldLabel>
                <Input
                  id="confirmnewpassword"
                  className="h-10 bg-gray-100 focus-visible:ring-1 
                   border-gray-300 focus-visible:border-red-600 focus-visible:outline-none mt-2"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-12 -translate-y-1/2 text-md hover:text-zinc-500 text-zinc-400 cursor-pointer"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </FieldGroup>

            <div className="flex justify-between gap-5 ">
              <Button
                type="button"
                variant="outline"
                className="w-45 h-10 cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="w-45 h-10 bg-(--brand-maroon) hover:bg-red-600 cursor-pointer"
              >
                Change Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default ChangePassword;
