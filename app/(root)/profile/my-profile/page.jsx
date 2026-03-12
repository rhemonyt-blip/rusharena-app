"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Preferences } from "@capacitor/preferences";
import axios from "axios";

import { Input } from "@/components/ui/input";
import ButtonLoading from "@/app/component/buttonLoading";
import { showToast } from "@/app/component/application/tostify";

import { passwordSchema } from "@/lib/zodSchema";

import { Eye, EyeOff } from "lucide-react";

export default function ProfilePage() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loggedAuth, setLoggedAuth] = useState({});
  const [authId, setAuthId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    async function loadUser() {
      setLoaded(true);
      try {
        const { value } = await Preferences.get({ key: "access_token" });

        if (!value) {
          showToast("error", "Please login to continue!");
          return;
        }
        setAuthId(value);

        const res = await axios.get(`/api/getuser`, {
          params: { authId: value }, // Axios handles encoding automatically
        });

        if (!res) {
          showToast("error", res?.data?.message || "Failed to fetch user.");
          return;
        }

        const data = await res.data;
        setLoggedAuth(data.data);
      } catch (error) {
        console.error("Error loading user data:", error);
        showToast("error", "Failed to load user data.");
      } finally {
        setLoaded(false);
      }
    }

    loadUser();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.authId = loggedAuth._id;
      const response = await axios.post(`/api/auth/changePassword`, data);

      if (!response.success) {
        showToast(
          "error",
          response?.data?.message || "Failed to change password"
        );

        return;
      }

      reset();
      showToast(
        "success",
        response?.data?.message || "Password changed successfully"
      );
    } catch (error) {
      console.error("Update error:", error);
      showToast(
        "error",
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0127] flex flex-col items-center text-white px-4 py-6">
      {/* Loader */}
      {loaded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      )}

      {/* Profile Card */}
      <div className="w-full max-w-md bg-white/10 rounded-2xl p-6 mb-4">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#3B82F6"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A8 8 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">{loggedAuth.name}</h2>
          <p className="text-gray-300 text-sm break-all">{loggedAuth.email}</p>
        </div>
      </div>

      {/* Basic Details */}
      <div className="w-full max-w-md bg-white/10 rounded-2xl p-6 mb-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-300">
          Basic Details
        </h3>

        {/* Username */}
        <div className="mb-3">
          <p className="text-gray-400 text-sm">Username</p>
          <div className="flex items-center mt-1">
            <div className="bg-gray-300/10 p-2 rounded-full mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-white text-sm">{loggedAuth.name}</p>
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <p className="text-gray-400 text-sm">Email</p>
          <div className="flex items-center mt-1">
            <div className="bg-gray-300/10 p-2 rounded-full mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 text-gray-300"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M22,6l-10,7L2,6" />
              </svg>
            </div>
            <p className="text-white text-sm break-all">{loggedAuth.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div>
          <p className="text-gray-400 text-sm">Mobile Number</p>
          <div className="flex items-center mt-1">
            <div className="bg-gray-300/10 p-2 rounded-full mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 text-gray-300"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.12.81.3 1.61.57 2.39a2 2 0 01-.45 2.11L9.91 10.09a16.06 16.06 0 006 6l1.87-1.18a2 2 0 012.11-.45c.78.27 1.58.45 2.39.57A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <p className="text-white text-sm">{loggedAuth.phone}</p>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div className="w-full max-w-md bg-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-300">
          Password Change
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          {/* Current Password */}
          <div className="relative">
            <Input
              id="oldpassword"
              label="Current Password"
              type={showOldPassword ? "text" : "password"}
              placeholder="********"
              {...register("oldpassword")}
              className="pr-10"
            />
            <button
              type="button"
              aria-label={showOldPassword ? "Hide password" : "Show password"}
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showOldPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
            {errors.oldpassword && (
              <p className="text-red-500 text-sm">
                {errors.oldpassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <Input
            label="New Password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              {...register("password")}
              className="pr-10"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
            label="Confirm Password"
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              {...register("confirmPassword")}
              className="pr-10"
            />
            <button
              type="button"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <ButtonLoading
            type="submit"
            text="Save Changes"
            className="w-full bg-gray-700 hover:bg-gray-600 mt-4 text-white font-semibold py-2 rounded-lg"
            loading={loading}
          />
        </form>
      </div>

      {/* Loader animation */}
      <style jsx>{`
        .loader {
          border-top-color: #3b82f6;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
