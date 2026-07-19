"use client"

import React from "react";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useProfileStore } from "@/lib/stores/EditProfile/setupProfileStore";

export default function Step2() {

  const { formData, setFormData } = useProfileStore();

  return (
    <>
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold">What do you do?</h2>
        </div>

        <Field>
          <FieldLabel className="text-zinc-500 text-sm">
            Current Status
          </FieldLabel>

          <Select 
            value={formData.status}
            onValueChange={(value) => setFormData({
              status: value
            })}
          >
            <SelectTrigger className="w-full p-5">
              <SelectValue placeholder="Student" />
            </SelectTrigger>
            <SelectContent side="bottom">
              <SelectGroup>
                <SelectLabel>Current Status</SelectLabel>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Working Professonal">Working Professonal</SelectItem>
                <SelectItem value="Business Owner">Business Owner</SelectItem>
                <SelectItem value="Planning to Relocate">
                  Planning to Relocate
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel className="text-zinc-500 text-sm">
            Profession or Field of Study
          </FieldLabel>

          <Input
            id="profession"
            placeholder="e.g Software Engineer, Nursing, Acccounting..."
            value={formData.profession}
            onChange={(e) => setFormData({
              profession: e.target.value,
            })}
            className="h-11 bg-zinc-50 border-zinc-200 focus-visible:ring-1 focus-visible:ring-red-600"
          />
        </Field>
      </div>
    </>
  );
}

