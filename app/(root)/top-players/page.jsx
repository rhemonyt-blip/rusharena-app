"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

/* -------- Rank based trophy/medal avatars -------- */
const getAvatarByRank = (rank) => {
  if (rank === 1) return "/images/assets/rank-1.png";
  if (rank === 2) return "/images/assets/rank-2.png";
  if (rank === 3) return "/images/assets/rank-3.png";

  // Default player icon for ranks 4+
  return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
};

export default function topPlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchtopPlayers = async () => {
      try {
        const res = await axios.get("/api/topPlayers");
        setPlayers(res.data);
      } catch (error) {
        console.error("Failed to load topPlayers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchtopPlayers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
        Loading topPlayers...
      </div>
    );
  }

  const topThree = players.slice(0, 3);
  const restPlayers = players.slice(3);

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 pb-10">
      {/* Top 3 */}
      <div className="flex justify-center gap-6 mt-6">
        {topThree[1] && <TopCard rank={2} player={topThree[1]} size="sm" />}
        {topThree[0] && <TopCard rank={1} player={topThree[0]} size="lg" />}
        {topThree[2] && <TopCard rank={3} player={topThree[2]} size="sm" />}
      </div>

      {/* Rest list */}
      <div className="mt-8 space-y-3">
        {restPlayers.map((player, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-zinc-800 rounded-xl px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm w-6 text-zinc-400">#{index + 4}</span>

              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src={getAvatarByRank(index + 4)}
                  alt={player.username}
                  fill
                  className="object-cover"
                />
              </div>

              <span className="font-medium">{player.username}</span>
            </div>

            <span className="font-semibold">{player.amount} TK</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function TopCard({ rank, player, size }) {
  const sizes = size === "lg" ? "w-28 h-28 text-lg" : "w-20 h-20 text-sm";

  return (
    <div className="flex flex-col items-center gap-2 mt-12">
      <div
        className={`relative ${sizes} rounded-full overflow-hidden bg-zinc-800`}
      >
        <Image
          src={getAvatarByRank(rank)}
          alt={player.username}
          fill
          className="object-cover"
        />
      </div>

      <span className="font-semibold text-center">{player.username}</span>
      <span className="text-zinc-400 text-sm">{player.amount} TK</span>
    </div>
  );
}
