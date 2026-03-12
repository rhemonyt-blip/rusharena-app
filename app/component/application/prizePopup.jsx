"use client";

import React, { useEffect, useState } from "react";
import { showToast } from "./tostify";
import axios from "axios";

import { Preferences } from "@capacitor/preferences";

export default function PrizePopup({ matchId, popUpType, onClose, isJoined }) {
  const [loading, setLoading] = useState(true);
  const [matchData, setMatchData] = useState(null);

  // Change this dynamically from API
  const roomIds = false;

  useEffect(() => {
    if (!matchId) return;
    const fetchMatches = async () => {
      setLoading(true);
      const { value } = await Preferences.get({ key: "access_token" });

      try {
        const res = await axios.get(`/api/matches/details`, {
          params: { matchId: matchId, matchAuth: value },
        });

        setMatchData(res.data?.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
        showToast(false, "Somthing Went Wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast("success", "Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (!matchData) return null;

  return (
    <div
      className="fixed inset-0 mb-20 bg-black/30 backdrop-blur-sm flex items-end justify-center z-50"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-[400px] p-5 mb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gray-900 text-gray-100 rounded-t-3xl shadow-lg border border-gray-700 animate-fadeInUp">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-9 right-1/2 translate-x-1/2 bg-gray-800 hover:bg-gray-700 rounded-full p-3 shadow-md z-50"
          >
            ✖
          </button>

          {/* Header */}
          <div className="text-center">
            <div className="bg-yellow-500 text-black rounded-t-xl py-2 font-bold">
              {popUpType === "room" ? "Room Details" : "TOTAL WIN PRIZE"}
            </div>
            <p className="mt-2 text-lg font-bold text-gray-400">
              {matchData.title}
            </p>
          </div>

          {/* Content */}
          {loading ? (
            <p className="text-center text-gray-400 mt-4">Loading...</p>
          ) : (
            <div className="mt-4 space-y-2 pb-8 text-center text-sm">
              {popUpType === "room" && (
                <>
                  {!isJoined ? (
                    <p className="font-bold my-4 text-yellow-400">
                      Sorry! আপনি এখনো এই ম্যাচে জয়েন হন নি।
                    </p>
                  ) : matchData.roomId !== "" && matchData.roomPass !== "" ? (
                    <>
                      <div className="flex justify-center items-center gap-2 my-2">
                        <p>🔥 Room ID: {matchData.roomId}</p>
                        <button
                          onClick={() => copyToClipboard(matchData.roomId)}
                          className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="flex justify-center items-center gap-2 my-2">
                        <p>🔑 Password: {matchData.roomPass}</p>
                        <button
                          onClick={() => copyToClipboard(matchData.roomPass)}
                          className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                        >
                          Copy
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="font-bold my-4 text-yellow-400">
                      ম্যাচ শুরু হওয়ার ৫-১০ মিনিট আগে Room ID শেয়ার করা হবে।
                    </p>
                  )}
                </>
              )}

              {popUpType === "prize" && (
                <>
                  {matchData.prizeDetails &&
                    matchData.prizeDetails.map((amount, i) => {
                      const titles = [
                        "👑 First Prize",
                        "🥈 Second Prize",
                        "🥉 Third Prize",
                        "🏅 Fourth Prize",
                        "🎖️ Fifth Prize",
                      ];
                      const label = titles[i] || `Position ${i + 1}`;
                      return (
                        <p key={i}>
                          <span className=" text-green-500">{label} -</span>{" "}
                          {amount} Taka
                        </p>
                      );
                    })}

                  <p>🔥 Per Kill: {matchData.perKill} Taka</p>
                  <p className="font-bold my-4 text-yellow-400">
                    🏆 Total Prize Pool: {matchData.winPrize} Taka
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
