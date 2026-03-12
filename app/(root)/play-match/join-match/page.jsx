"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ButtonLoading from "@/app/component/buttonLoading";

import { showToast } from "@/app/component/application/tostify";
import { Preferences } from "@capacitor/preferences";

export default function MatchJoinPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const matchId = searchParams.get("matchId");

  const [match, setMatch] = useState({});
  const [mode, setMode] = useState("solo");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (!matchId) return;

    const fetchMatch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/matches/details`, {
          params: { matchId },
        });

        const data = res.data?.data;
        await setMatch(data);
        console.log(match);
      } catch (err) {
        console.error("Error fetching match:", err);
        showToast(false, "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [matchId]);
  // ✅ Format time properly
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      player1: null,
      player2: "",
      player3: "",
      player4: "",
    },
  });

  const onSubmit = async (data) => {
    const { value } = await Preferences.get({ key: "access_token" });

    if (!value) {
      showToast("error", "Please login to continue!");
      return;
    }
    const authId = value;

    const matchMap = match.map;
    const payload = { matchId, mode, matchMap, authId };

    // Include players based on mode
    payload.players = [data.player1];
    if (mode === "duo" || mode === "squad") payload.players.push(data.player2);
    if (mode === "squad") payload.players.push(data.player3, data.player4);

    const hasAnyValue = Object.values(payload.players).some(
      (value) => value !== "" && value !== null && value !== undefined
    );

    if (!hasAnyValue) {
      showToast("error", "Please insert player ids");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`/api/matches/join`, payload);
      if (res.data.success) {
        showToast("success", "Joined successfully!");

        reset();
        // Redirect back to previous page
        router.back();
      } else {
        showToast("error", res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to join match!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex flex-col items-center px-4">
      <div className="bg-[#1c1c2e] w-full max-w-md rounded-2xl shadow-lg p-5">
        <h2 className="text-lg font-semibold text-white text-center">
          {match.entryType} Time | Mobile | Regular
        </h2>
        <p className="text-gray-400 text-center mt-1 text-sm">
          {formatDate(match.startTime)}
        </p>
        <div className="flex justify-between text-sm text-gray-300 mt-3">
          <span>
            Win Prize:{" "}
            <span className="text-green-400 font-semibold">
              {match.winPrize}TK
            </span>
          </span>
          <span>
            Entry Fee:{" "}
            <span className="text-yellow-400 font-semibold">
              {match.entryFee}TK
            </span>
          </span>
        </div>

        <p className="text-center text-orange-400 text-sm mt-4 font-medium">
          *অবশ্যই এখানে আপনার গেমের নামটি দিয়ে জয়েন করবেন।
        </p>

        <div className="flex justify-center mt-5 gap-3">
          <button
            className={`px-5 py-2 rounded-lg font-medium transition ${
              mode === "solo"
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-gray-200"
            }`}
            onClick={() => setMode("solo")}
          >
            Solo
          </button>

          {match.entryType !== "Solo" && (
            <button
              className={`px-5 py-2 rounded-lg font-medium transition ${
                mode === "duo"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-700 text-gray-200"
              }`}
              onClick={() => setMode("duo")}
            >
              Duo
            </button>
          )}
          {match.entryType === "Squad" && (
            <button
              className={`px-5 py-2 rounded-lg font-medium transition ${
                mode === "squad"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-700 text-gray-200"
              }`}
              onClick={() => setMode("squad")}
            >
              Squad
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-3">
          {/* Player 1 */}
          <div>
            <input
              {...register("player1")}
              type="text"
              placeholder="Player 1 Name"
              className="w-full px-4 py-3 bg-[#2a2a3d] text-white rounded-lg outline-none placeholder-gray-400"
            />
            {errors.player1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.player1.message}
              </p>
            )}
          </div>

          {/* Player 2 */}
          {(mode === "duo" || mode === "squad") && (
            <div>
              <input
                {...register("player2")}
                type="text"
                placeholder="Player 2 Name"
                className="w-full px-4 py-3 bg-[#2a2a3d] text-white rounded-lg outline-none placeholder-gray-400"
              />
              {errors.player2 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.player2.message}
                </p>
              )}
            </div>
          )}

          {/* Player 3 & 4 */}
          {mode === "squad" && (
            <>
              <div>
                <input
                  {...register("player3")}
                  type="text"
                  placeholder="Player 3 Name"
                  className="w-full px-4 py-3 bg-[#2a2a3d] text-white rounded-lg outline-none placeholder-gray-400"
                />
                {errors.player3 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.player3.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("player4")}
                  type="text"
                  placeholder="Player 4 Name"
                  className="w-full px-4 py-3 bg-[#2a2a3d] text-white rounded-lg outline-none placeholder-gray-400"
                />
                {errors.player4 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.player4.message}
                  </p>
                )}
              </div>
            </>
          )}

          <ButtonLoading
            className="w-full mt-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition"
            text={"Join Now"}
            loading={loading}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
