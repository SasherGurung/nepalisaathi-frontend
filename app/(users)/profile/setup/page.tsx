"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Step1 from "@/components/profiles/step1";
import Step2 from "@/components/profiles/step2";
import Step3 from "@/components/profiles/step3";
import { api } from "@/lib/api/config";
import { toast } from "react-hot-toast";
import { useProfileStore } from "@/lib/stores/profileStore";
import { step1Schema, step2Schema } from "@/app/schema/profileSchema";


export default function ProfileSetup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const progress = {
    1: 33,
    2: 67,
    3: 100,
  };
  const formData = useProfileStore((state) => state.formData);
  const profilePicture = useProfileStore((state) => state.profilePreview);
  const coverPicture = useProfileStore((state) => state.coverPreview);

  const handleNext = () => {
    if(step === 1) {
      const result = step1Schema.safeParse({
        homeCity: formData.homeCity,
      });
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }
      setStep(2);
      return;
    }

    if(step === 2) {
      const result = step2Schema.safeParse({
        status: formData.status,
        profession: formData.profession,
      });
      if(!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }
      setStep(3);
      return;
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("homeCity", formData.homeCity);
      data.append("status", formData.status);
      data.append("profession", formData.profession);
      data.append("bio", formData.bio);
      data.append("latitude", formData.latitude.toString());
      data.append("longitude", formData.longitude.toString());

      if (profilePicture) {
        data.append("profilePicture", profilePicture);
      }

      if (coverPicture) {
        data.append("coverPicture", coverPicture);
      }

      await api.post("/profile/edit");
      toast.success("Profile setup completed!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-zinc-50 flex items-center justify-center px-6 py-10">
      <Card className="w-full max-w-2xl rounded-3xl border shadow-sm p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Lets set up your profile
          </h1>

          <p className="text-muted-foreground">
            Help your community get to know you better.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Step {step} of 3</span>
            <span className="text-muted-foreground">
              {progress[step as 1 | 2 | 3]}%
            </span>
          </div>

          <Progress
            value={progress[step as 1 | 2 | 3]}
            className="h-2 rounded-full"
          />
        </div>

        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}

        <div className="flex justify-between pt-2">
          <Button
            onClick={() => {
              if (step === 1) return;
              setStep(step - 1);
            }}
            variant="outline"
            className="h-10 px-6 cursor-pointer"
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          <Button
            disabled={loading}
            onClick={handleNext}
            className="h-10 px-8 bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
          >
            {loading
              ? "Submitting..."
              : step === 3
                ? "Complete Profile"
                : "Next"}
          </Button>
        </div>
      </Card>
    </section>
  );
}
