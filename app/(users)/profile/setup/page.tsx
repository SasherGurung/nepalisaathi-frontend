"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Step1 from "@/components/profilesedit/step1";
import Step2 from "@/components/profilesedit/step2";
import Step3 from "@/components/profilesedit/step3";
import { toast } from "react-hot-toast";
import { step1Schema, step2Schema } from "@/app/schema/profileSchema";
import { useImageStore } from "@/lib/stores/EditProfile/imageStore";
import { useRouter } from "next/navigation";
import { useSetupProfileStore } from "@/lib/stores/EditProfile/setupProfileStore";
import Step4 from "@/components/profilesedit/step4";

export default function ProfileSetup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const progress = {
    1: 33,
    2: 67,
    3: 100,
  };

  const { postSetupProfile } = useSetupProfileStore();

  const profilePicture = useImageStore((state) => state.profilePicture);
  const coverPicture = useImageStore((state) => state.coverPicture);

  const handleNext = async () => {
    if (step === 1) {
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

    if (step === 2) {
      const result = step2Schema.safeParse({
        status: formData.status,
        profession: formData.profession,
      });

      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }

      setStep(3);
      return;
    }

    if (step === 3) {
      await handleSetupProfile();
    }
  };

  const handleSetupProfile = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("province", FormData.province);

    } catch (error) {
      console.log(error);
      toast.error(data.message || "Failed to setup Profile");
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
              {progress[step as keyof typeof progress]}%
            </span>
          </div>

          <Progress
            value={progress[step as keyof typeof progress]}
            className="h-2 rounded-full"
          />
        </div>

        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}

        <div className="flex justify-between pt-2">
          <Button
            variant="outline"
            className="h-10 px-6 cursor-pointer"
            onClick={() => {
              if (step === 1) return;
              setStep(step - 1);
            }}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          <Button
            disabled={loading}
            onClick={handleNext}
            className="h-10 px-8 bg-(--brand-maroon) hover:bg-red-600 cursor-pointer"
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
