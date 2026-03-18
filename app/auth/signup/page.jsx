"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Preferences } from "@capacitor/preferences";
import { web_login } from "@/routes/websiteRoute";
import { signupSchema } from "@/lib/zodSchema";
import Logo from "@/public/images/logo.jpg";

import { showToast } from "@/app/component/application/tostify";
import ButtonLoading from "@/app/component/buttonLoading";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // Remove spaces from username
  const sanitizeUsername = (name) => {
    if (!name) return "";
    return name.replace(/\s+/g, "");
  };

  // Autofill Google data
  useEffect(() => {
    if (session?.user) {
      const cleanName = sanitizeUsername(session.user.name);
      if (cleanName) {
        setValue("name", cleanName);
      }
      if (session.user.email) {
        setValue("email", session.user.email);
      }
    }
  }, [session, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Force email from session
      const email = session?.user?.email;
      if (!email) throw new Error("Email not available");

      const payload = {
        ...data,
        email, // trusted session email
        name: sanitizeUsername(data.name),
      };

      const res = await axios.post("/api/auth/signup", payload);
      const signupResponse = res.data;

      if (!signupResponse?.success) {
        showToast("error", signupResponse?.message || "Signup failed");
        return;
      }

      const token = signupResponse.token;
      if (token) {
        await Preferences.set({ key: "access_token", value: token });
        await Preferences.set({ key: "user_email", value: email });
      }

      reset();
      showToast("success", signupResponse.message || "Signup successful");
      router.push("https://www.rusharena.club/");
    } catch (error) {
      console.error("Signup error:", error);
      showToast(
        "error",
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <Image
              src={Logo.src}
              width={Logo.width}
              height={Logo.height}
              alt="logo"
              className="max-w-[150px] rounded-full"
            />
          </div>

          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>

          <p className="text-sm text-muted-foreground">
            Fill in your details to create a new account
          </p>
        </CardHeader>

        <CardContent>
          {/* Google Sign In */}
          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full border p-2 rounded-md flex items-center justify-center gap-2 mb-4 bg-cyan-500 hover:bg-cyan-700 transition transform hover:scale-105 animate-pulse"
          >
            Continue with Google
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name">User Name</Label>
              <Input
                id="name"
                placeholder="JohnDoe"
                autoComplete="name"
                {...register("name")}
                onChange={(e) =>
                  setValue("name", sanitizeUsername(e.target.value))
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>

              {/* Hidden input to satisfy react-hook-form */}
              <input
                type="hidden"
                value={session?.user?.email || ""}
                {...register("email")}
              />

              {/* Display only */}
              <div className="p-2 border rounded-md bg-gray-100 text-gray-700">
                {session?.user?.email}
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                autoComplete="tel"
                placeholder="01xxxxxxxxx"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  autoComplete="new-password"
                  {...register("password")}
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label="toggle password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label="toggle confirm password"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <ButtonLoading
              type="submit"
              text="Sign up"
              className="w-full"
              loading={loading}
            />
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href={web_login} className="text-primary underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
