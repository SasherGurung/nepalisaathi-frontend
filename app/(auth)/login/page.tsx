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
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api/config";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/app/schema/authSchema";
import { useAuthStore } from "@/lib/stores/authStores";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerm, setAcceptedTerm] = useState(false);

  const setUser = useAuthStore((state) => state.setUser)

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setAcceptedTerm(false);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse({
      email,
      password,
    })

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    if (!acceptedTerm) {
      toast.error("Please accept the Terms and Conditions.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
        acceptedTerm,
      });

      console.log(res.data);
      setUser(res.data.user);
      toast.success(res.data.message);
      
      resetForm();
      router.push("/feed");
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
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-200 bg-gray-100">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    priority
                  />
                </div>
              </div>
              <CardTitle className="text-2xl">Namaste, Saathi!</CardTitle>
              <CardDescription className="m-5 text-zinc-500">
                Welcome back. Sign in to continue connecting with the Nepali
                community around the world.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <div className="relative">
                    <MdOutlineMail className="absolute left-3 top-3 h-4 w-4 text-(--brand-maroon)" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 h-10 bg-gray-100 focus-visible:ring-1 
                   border-gray-300 focus-visible:border-red-600 focus-visible:outline-none"
                    />
                  </div>
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-(--brand-maroon) hover:text-red-600"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="relative">
                    <MdLockOutline className="absolute left-3 top-3 h-4.5 w-4.5 text-(--brand-maroon)" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 h-10 bg-gray-100 focus-visible:ring-1 
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
                  <div className="flex gap-2">
                    <Input
                      id="terms"
                      type="checkbox"
                      checked={acceptedTerm}
                      onChange={(e) => setAcceptedTerm(e.target.checked)}
                      className="mt-1 h-3 w-3 border-zinc-700 cursor-pointer accent-red-600"
                    />

                    <FieldLabel
                      htmlFor="terms"
                      className="text-xs text-zinc-400"
                    >
                      By logging in, you agree to out Terms and Conditions and
                      Privacy Policy
                    </FieldLabel>
                  </div>
                  <Field>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="cursor-pointer bg-(--brand-maroon) hover:bg-red-600 rounded-2xl p-5"
                    >
                      {loading ? "Login..." : "Login"}
                    </Button>
                  </Field>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-(--brand-maroon) hover:text-red-600"
                    >
                      Register here
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </CardContent>
          </form>
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-(--brand-maroon) text-white">

            <div className="relative z-10 mb-8">
              <div className="flex h-50 w-50 items-center justify-center rounded-tr-4xl rounded-bl-4xl p-4 shadow-[0_0_25px_0px]">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="rounded-tl-4xl rounded-full w-full h-full object-cover shadow-[0_0_20px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>

            <div className="relative z-10 max-w-sm text-center text-base">
              <h1 className="text-3xl font-bold leading-wide">
                Your Companion
                Across Nepal
              </h1>

              <p className="mt-4 text-sm text-indigo-100">
                Connect with your community, discover opportunities, and make
                every journey feel like home.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
