"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "@/app/component/application/tostify";
import { useSearchParams } from "next/navigation";

export default function MatchDetails() {
  const searchParams = useSearchParams();
  const matchId = searchParams.get("matchId");

  const [match, setMatch] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!matchId) return;

    const fetchMatch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/matches/details`, {
          params: { matchId },
        });

        const data = res.data?.data;
        await setMatch(data || null);
        await setPlayers(data?.joinedPlayers || []);
      } catch (err) {
        console.error("Error fetching match:", err);
        showToast(false, "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [matchId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#1f1f2e] to-[#0b0620] text-white text-lg font-semibold">
        Loading match details...
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#1f1f2e] to-[#0b0620] text-white text-lg font-semibold">
        Match not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f1f2e] to-[#0b0620] text-white px-6 py-8 space-y-6">
      {/* Match Info */}
      <div className=" p-6 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-4">{match.title}</h2>
        <div className="grid  grid-cols-2 lg:grid-cols-3 gap-4 text-white/90">
          <p>
            <span className="font-semibold">Match Type:</span> {match.matchType}
          </p>
          <p>
            <span className="font-semibold">Entry Type:</span> {match.entryType}
          </p>
          <p>
            <span className="font-semibold">Map:</span> {match.map}
          </p>

          <p>
            <span className="font-semibold">Total Spots:</span>{" "}
            {match.totalSpots}
          </p>
          <p>
            <span className="font-semibold">Win Prize:</span>{" "}
            <span className="text-yellow-400 font-bold">
              {match.winPrize} Taka
            </span>
          </p>
          <p>
            <span className="font-semibold">Per Kill:</span>{" "}
            <span className="text-green-400 font-bold">
              {match.perKill} Taka
            </span>
          </p>
          <p>
            <span className="font-semibold">Entry Fee:</span> {match.entryFee}{" "}
            Taka
          </p>
          <p className="font-semibold bg-amber-800 text-center p-3">
            {"#"}
            {match.serialNumber}
          </p>
        </div>
        <p className="font-semibold text-green-500 ">
          {new Date(match.startTime).toLocaleString()}
        </p>
      </div>

      {/* Prize Details */}
      {Array.isArray(match.prizeDetails) && match.prizeDetails.length > 0 && (
        <div className="bg-[#1f1f2e] p-5 rounded-xl shadow-md border border-gray-700">
          <h3 className="font-bold text-xl mb-3 text-white text-center">
            Prize Details
          </h3>
          <ul className="list-disc list-inside text-white/90 text-sm md:text-base space-y-1">
            {match.prizeDetails.map((prize, index) => {
              const titles = [
                "First Prize",
                "Second Prize",
                "Third Prize",
                "Fourth Prize",
                "Fifth Prize",
              ];
              const label = titles[index] || `Position ${index + 1}`;
              return (
                <li key={index}>
                  <span className="font-semibold text-yellow-300">{label}</span>{" "}
                  -{" "}
                  <span className="text-green-300 font-medium">
                    {prize} Taka
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Joined Players */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700">
        <h3 className="font-bold mb-4 text-xl text-center text-white">
          Joined Players
        </h3>
        {Array.isArray(players) && players.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full t text-sm md:text-base border border-gray-700 rounded-xl">
              <thead>
                <tr className="bg-gray-800 text-gray-300 uppercase text-xs md:text-sm">
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-start">Player Name</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr
                    key={player._id || index}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4 font-medium text-yellow-400">
                      {player.name || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400">No players joined yet.</p>
        )}
      </div>
    </div>
  );
}
