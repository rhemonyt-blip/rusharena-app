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

  // Copy text function
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("success", "Copied!");
    } catch {
      showToast("error", "Copy failed");
    }
  };

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
          params: { authId: value },
        });

        if (!res?.data?.success) {
          showToast("error", res?.data?.message || "Failed to fetch user.");
          return;
        }

        setLoggedAuth(res.data.data);
      } catch (error) {
        console.error("Error loading user:", error);
        showToast("error", "Failed to load user data.");
      } finally {
        setLoaded(false);
      }
    }

    loadUser();
  }, []);

  const onSubmit = async (formData) => {
    if (!authId) {
      showToast("error", "User not authenticated");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        authId,
      };

      const response = await axios.post(`/api/auth/changePassword`, payload);

      if (!response?.data?.success) {
        showToast(
          "error",
          response?.data?.message || "Failed to change password",
        );
        return;
      }

      reset();
      showToast("success", response.data.message);
    } catch (error) {
      console.error("Update error:", error);

      showToast(
        "error",
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
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
          <div className="loader h-16 w-16 rounded-full border-8 border-gray-200 border-t-blue-500 animate-spin"></div>
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

      {/* Details */}
      <div className="w-full max-w-md bg-white/10 rounded-2xl p-6 mb-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">
          Basic Details
        </h3>

        {/* Username with Copy */}
        <div className="mb-3">
          <p className="text-gray-400 text-sm">Username</p>
          <div className="flex items-center justify-between mt-1 border-b border-gray-500 p-2 rounded">
            <p className="text-white text-sm m-2">{loggedAuth.name}</p>
            <button
              onClick={() => copyToClipboard(loggedAuth.name || "")}
              className="ml-2 p-2 text-xs bg-blue-500  rounded text-white"
            >
              Copy Username
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-white text-sm break-all m-2">{loggedAuth.email}</p>
        </div>

        {/* Phone */}
        <div className="mb-3">
          <p className="text-gray-400 text-sm">Mobile Number</p>
          <p className="text-white text-sm m-2">{loggedAuth.phone}</p>
        </div>
      </div>

      {/* Password Change */}
      <div className="w-full max-w-md bg-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">
          Password Change
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Old Password */}
          <div className="relative">
            <Input
              type={showOldPassword ? "text" : "password"}
              placeholder="Current Password"
              {...register("oldpassword")}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showOldPassword ? <EyeOff /> : <Eye />}
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
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
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
            loading={loading}
            disabled={loading}
            className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
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
