"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Step1 from "@/components/profilesedit/step1";
import Step2 from "@/components/profilesedit/step2";
import Step3 from "@/components/profilesedit/step3";
import { toast } from "react-hot-toast";
import {
  step1Schema,
  step2Schema,
  step4Schema,
} from "@/app/schema/profileStepSchema";
import { useSetupProfileStore } from "@/lib/stores/EditProfile/setupProfileStore";
import Step4 from "@/components/profilesedit/step4";
import { useProfileStepStore } from "@/lib/stores/EditProfile/profileStepsStore";
import { useImageStore } from "@/lib/stores/EditProfile/imageStore";
import { useRouter } from "next/navigation";

const progress = {
  1: 25,
  2: 50,
  3: 75,
  4: 100,
};

export default function ProfileSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { formData } = useProfileStepStore();

  const { postSetupProfile } = useSetupProfileStore();

  const handleNext = async () => {
    if (step === 1) {
      console.log(formData);
      const result = step1Schema.safeParse({
        province: formData.province,
        district: formData.district,
        municipality: formData.municipality,
      });

      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }

      setStep(2);
      return;
    }
    if (step === 2) {
      console.log(formData);
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
      console.log(formData);
      const result = step2Schema.safeParse({
        status: formData.status,
        profession: formData.profession,
      });

      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }
      setStep(4);
      return;
    }

    if (step === 4) {
      console.log(formData);
      const result = step4Schema.safeParse({
        arrival_date: formData.arrival_date,
        visa_type: formData.visa_type,
      });

      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }
      await handleSetupProfile();
    }
  };

  const handleSetupProfile = async () => {
    try {
      setLoading(true);

      const { profilePicture, coverPicture } = useImageStore.getState();

      const data = new FormData();

      // Step1
      data.append("province", formData.province);
      data.append("district", formData.district);
      data.append("municipality", formData.municipality);
      data.append("municipalityType", formData.municipalityType);
      data.append("approximateLocation", formData.approximateLocation);

      // Step2
      data.append("status", formData.status);
      data.append("profession", formData.profession);

      // Step3
      data.append("bio", formData.bio);
      if (profilePicture) {
        data.append("profilePicture", profilePicture);
      }
      if (coverPicture) {
        data.append("coverPicture", coverPicture);
      }

      // Step 4
      if (formData.arrival_date) {
        data.append("arrival_date", formData.arrival_date);
      }
      if (formData.visa_type) {
        data.append("visa_type", formData.visa_type);
      }
      data.append("is_new_arrival", formData.is_new_arrival ? "1" : "0");
      data.append(
        "open_to_helping_newcomers",
        formData.open_to_helping_newcomers ? "1" : "0",
      );

      const success = await postSetupProfile(data);

      if (success) {
        router.push("/profile/preferences");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-zinc-50 flex items-center justify-center py-10">
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
            <span className="font-medium">Step {step} of 4</span>

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
              : step === 4
                ? "Complete Profile"
                : "Next"}
          </Button>
        </div>
      </Card>
    </section>
  );
}
