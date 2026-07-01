"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdOutlineMail, MdPersonOutline, MdLockOutline } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api/config";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    password_confirmation: "",
    acceptedTerm: false,
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.password.trim() ||
      !formData.password_confirmation.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!formData.acceptedTerm) {
      toast.error("Please accept the Terms and Conditions.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/register", formData);

      console.log(res.data);
      toast.success(res.data.message);
      router.push("/profile/setup");
    } catch (err: unknown) {
      console.log("Error:", err);
      toast.error(
        (err as ErrorEvent)?.message ||
          "Something went wrong! Please try again",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <form onSubmit={handleRegister}>
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-(--brand-maroon) text-white">
              <div className="relative z-10 mb-8">
                <div className="flex h-50 w-50 items-center justify-center rounded-tr-4xl rounded-bl-4xl p-4 shadow-[0_0_25px_0px]">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="rounded-tr-4xl rounded-full w-full h-full object-cover shadow-[0_0_20px_5px_rgba(0,0,0,0.1)]"
                  />
                </div>
              </div>

              <div className="relative z-10 max-w-sm text-center text-base">
                <h1 className="text-3xl font-bold leading-tight">
                  Join the Namaste Saathi Community
                </h1>

                <p className="mt-8 text-sm text-indigo-100">
                Create your account to connect with fellow Nepalis, discover opportunities,
                and build meaningful connections wherever you are.
                </p>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl mb-3">
                  Join the Global Family
                </CardTitle>
                <CardDescription className="mb-3">
                  Create your profile to find and help fellow Nepalis abroad.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <div className="relative">
                      <MdPersonOutline className="absolute left-3 top-2 text-(--brand-maroon) h-5 w-5" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="e.g John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        className="pl-9 bg-gray-100 focus-visible:ring-1 
                   border-gray-300 focus-visible:border-red-600 focus-visible:outline-none"
                      />
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <div className="relative">
                      <MdOutlineMail className="absolute left-3 top-2 h-4 w-4 text-(--brand-maroon)" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="pl-9 bg-gray-100 focus-visible:ring-1 
                   border-gray-300 focus-visible:border-red-600 focus-visible:outline-none"
                      />
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">
                      Phone Number (Optional)
                    </FieldLabel>
                    <div className="relative">
                      <LuPhone className="absolute left-3 top-2 h-4 w-4 text-(--brand-maroon)" />
                      <Input
                        id="phone"
                        type="phone"
                        placeholder="e.g. 98XXXXXXXX"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                        className="pl-9 bg-gray-100 focus-visible:ring-1 
                   border-gray-300 focus-visible:border-red-600 focus-visible:outline-none"
                      />
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <MdLockOutline className="absolute left-3 top-2 text-(--brand-maroon)" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        className="pl-9 bg-gray-100 focus-visible:ring-1 
                   border-gray-300 focus-visible:border-red-600 focus-visible:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-md hover:text-zinc-500 text-zinc-400 cursor-pointer"
                      >
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <MdLockOutline className="absolute left-3 top-2 text-(--brand-maroon)" />
                      <Input
                        id="password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password_confirmation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password_confirmation: e.target.value,
                          })
                        }
                        className="pl-9 bg-gray-100 focus-visible:ring-1 
                   border-gray-300 focus-visible:border-red-600 focus-visible:outline-none"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-md hover:text-zinc-500 text-zinc-400 cursor-pointer"
                      >
                        {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                  </Field>
                  <Field>
                    <div className="flex gap-2">
                      <Input
                        id="terms"
                        type="checkbox"
                        checked={formData.acceptedTerm}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            acceptedTerm: e.target.checked,
                          })
                        }
                        className="mt-1 h-3 w-3 rounded-b-full border-zinc-700 cursor-pointer accent-red-600"
                      />

                      <FieldLabel
                        htmlFor="terms"
                        className="text-sm text-zinc-400"
                      >
                        I agree to the guideline of kindness, support, sharing
                        and connecting respectfully with the community.
                      </FieldLabel>
                    </div>
                  </Field>
                  <FieldGroup>
                    <Field>
                      <Button
                        type="submit"
                        disabled={false}
                        className="cursor-pointer bg-(--brand-maroon) hover:bg-red-600 rounded-2xl p-5"
                      >
                        {loading ? "Creating Account..." : "Create My Account"}
                      </Button>
                      <FieldDescription className="px-6 text-center">
                        Already have an account?{" "}
                        <Link
                          href="/login"
                          className="text-(--brand-maroon) hover:text-red-600"
                        >
                          Sign in
                        </Link>
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </FieldGroup>
              </CardContent>
            </Card>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
