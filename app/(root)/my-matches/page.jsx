"use client";
import { showToast } from "@/app/component/application/tostify";
import { Preferences } from "@capacitor/preferences";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MyMatches() {
  const [matches, setmatches] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { value } = await Preferences.get({ key: "access_token" });

        const { data } = await axios.get(
          `/api/mymatch/?authId=${value}&matchList=true`
        );
        if (data.success) {
          setmatches(data?.data?.matches);
          // console.log(data.data.matches);
        }
      } catch {
        showToast("error", "Failed to fetch Profile Info!");
      }
    })();
  }, []);
  return (
    <div className="min-h-screen  bg-[#0a0a1a] text-white p-4">
      <h1 className="text-center text-2xl font-bold  mb-6">My Matches</h1>

      <div className="space-y-3">
        {matches.map((match) => (
          <div
            key={match._id}
            className="bg-gray-900 rounded-2xl border shadow-md p-4 flex justify-between items-center hover:bg-gray-800 transition-all"
          >
            {/* Left section: title + time */}
            <div className="w-fit">
              <h2 className="text-base font-semibold">{match.title}</h2>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(match.time).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>

            {/* Right section: My Kills + My Win */}
            <div className="flex  items-center justify-around text-center gap-6 w-fit ">
              <div className="  flex flex-col items-center justify-center ">
                <strong className="text-yellow-400 font-semibold">
                  My Kills
                </strong>
                <span>{match.myKills}</span>
              </div>
              <div className="flex flex-col items-center justify-center ">
                <strong className="text-gray-200 font-semibold">My Win</strong>
                <span>{match.myWin}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
