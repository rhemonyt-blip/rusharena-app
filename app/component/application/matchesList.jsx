"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Countdown from "@/app/component/countdown";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MatchType1,
  MatchType2,
  MatchType3,
  MatchType4,
  MatchType5,
  MatchType6,
  MatchType1Img,
  MatchType2Img,
  MatchType3Img,
  MatchType4Img,
  MatchType5Img,
  MatchType6Img,
} from "@/config";
import PrizePopup from "./prizePopup";
import { Preferences } from "@capacitor/preferences";
import { showToast } from "./tostify";
import axios from "axios";
import { RotateCcw } from "lucide-react";

// ✅ helper to get image based on type
const getMatchImage = (matchType) => {
  switch (matchType) {
    case MatchType1:
      return MatchType1Img;
    case MatchType2:
      return MatchType2Img;
    case MatchType3:
      return MatchType3Img;
    case MatchType4:
      return MatchType4Img;
    case MatchType5:
      return MatchType5Img;
    case MatchType6:
      return MatchType6Img;
    default:
      return "/images/logo.jpg";
  }
};

const PlayMatch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const matchType = searchParams.get("type");

  const [matches, setMatches] = useState([]);
  const [joinedMatch, setJoinedMatch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popUpType, setPopUpType] = useState(null);
  const [matchId, setMatchId] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

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

  // ✅ Fetch matches and user's joined matches

  useEffect(() => {
    if (!matchType) return;

    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`/api/matches`, {
          params: { type: matchType },
        });

        const data = res.data;
        const allMatches = data?.data || [];

        // JUST SORT BY DATE (ASC)

        const filtered = allMatches.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );

        // CHECK LOGGED USER

        const { value: authId } = await Preferences.get({
          key: "access_token",
        });

        if (!authId) {
          setJoinedMatch([]);
        } else {
          const joined = filtered.filter((match) =>
            match.joinedPlayers.some((p) => p.authId === authId)
          );
          setJoinedMatch(joined);
        }

        setMatches(filtered);
      } catch (err) {
        console.error("Error fetching matches:", err);
        const message =
          err.response?.data?.message || err.message || "No matches found!";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [matchType]);

  // ✅ Handle navigation
  const handleCardClick = (id) => {
    router.push(`/play-match/details?matchId=${id}`);
  };

  // ✅ Handle popup
  const handlePopup = (id, type) => {
    setShowPopup(true);
    setMatchId(id);
    setPopUpType(type);
  };

  // ✅ Derived matches (not joined)
  const availableMatches = useMemo(() => {
    return matches.filter((m) => !joinedMatch.some((jm) => jm._id === m._id));
  }, [matches, joinedMatch]);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ✅ Error or invalid type
  if (error || !matchType) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-4">
        <h1 className="text-3xl font-extrabold mb-4 text-center">
          {error || "Something went wrong!"}
        </h1>
      </div>
    );
  }

  // ✅ No matches
  if (!matches.length) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          No Matches Found
        </h1>
        <p className="text-lg text-center">
          Sorry, there are no matches available for <strong>{matchType}</strong>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-gray-400 min-h-screen p-4 sm:flex sm:flex-col gap-4">
      <div className="flex items-center justify-around">
        <h1 className="text-center text-2xl text-fuchsia-50 font-bold mb-6">
          {matchType}
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-3  ">
        {/* ✅ Joined Matches */}
        {joinedMatch.map((match) => (
          <Card
            key={match._id}
            className="bg-gray-800 text-white border border-gray-700 sm:w-full hover:bg-gray-700 transition cursor-pointer"
            onClick={() => handleCardClick(match._id)}
          >
            <CardHeader>
              <div className="flex gap-4 justify-start">
                <div className="w-16 h-16 min-w-16 rounded-full overflow-hidden relative">
                  <Image
                    src={getMatchImage(match.matchType)}
                    alt={match.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="flex flex-col justify-center gap-1">
                  <strong>{match.title}</strong>
                  <p className="text-sm text-gray-300">
                    {formatDate(match.startTime)}
                  </p>
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* ✅ Prize Details */}
              <div className="flex justify-around">
                <div className="text-green-500 font-bold flex flex-col items-center">
                  <strong>+ WIN PRIZE</strong>
                  <span>{match.winPrize} TK</span>
                </div>
                <div className="text-blue-500 font-bold flex flex-col items-center">
                  <strong>+ PER KILL</strong>
                  <span>{match.perKill} TK</span>
                </div>
                <div className="text-red-500 font-bold flex flex-col items-center">
                  <strong>ENTRY FEE</strong>
                  <span>{match.entryFee} TK</span>
                </div>
              </div>

              {/* ✅ Match Info */}
              <div className="flex justify-between text-gray-300 mt-2">
                <div className="flex flex-col items-center w-full">
                  <strong>ENTRY TYPE</strong>
                  <span>{match.entryType}</span>
                </div>
                <div className="flex flex-col items-center border-x-4 border-amber-600 w-full">
                  <strong>MAP</strong>
                  <span>{match.map}</span>
                </div>
                <div className="flex flex-col items-center w-full">
                  <strong>VERSION</strong>
                  <span>MOBILE</span>
                </div>
              </div>

              {/* ✅ Joined UI */}
              <div className="flex justify-between items-center my-4 gap-3">
                <div className="w-2/3">
                  <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-green-500 h-4"
                      style={{
                        width: `${
                          match.totalSpots
                            ? (match.joinedPlayers.length / match.totalSpots) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    Only {match.totalSpots - match.joinedPlayers.length} spots
                    left ({match.joinedPlayers.length}/{match.totalSpots})
                  </p>
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast("success", "Already Joined!");
                  }}
                  className="w-1/3 bg-blue-900 hover:bg-blue-800"
                >
                  Joined
                </Button>
              </div>

              {/* ✅ Buttons */}
              <div className="flex justify-between mt-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsJoined(true);
                    handlePopup(match._id, "room");
                  }}
                  variant="outline"
                  className="border-gray-600 text-black"
                >
                  Room Details
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePopup(match._id, "prize");
                  }}
                  variant="outline"
                  className="border-gray-600 text-black"
                >
                  Total Prize Details
                </Button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="w-2/3 p-2 bg-green-600 rounded text-center font-bold">
                  <Countdown targetDate={match.startTime} />
                </div>
                <strong className="w-1/3 p-2 bg-green-800 rounded text-center font-bold">
                  #{match.serialNumber}
                </strong>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* ✅ Available Matches */}
        {availableMatches.map((match) => {
          const isFull = match.joinedPlayers.length >= match.totalSpots;
          const isOver =
            new Date(match.startTime).getTime() <= new Date().getTime();
          const buttonText = isFull ? "Full" : isOver ? "Started" : "Join Now";
          const isDisabled = isFull || isOver;

          return (
            <Card
              key={match._id}
              className="bg-gray-800 text-white border border-gray-700 sm:w-full hover:bg-gray-700 transition cursor-pointer"
              onClick={() => handleCardClick(match._id)}
            >
              <CardHeader>
                <div className="flex gap-4 justify-start">
                  <div className="w-16 h-16 min-w-16 rounded-full overflow-hidden relative">
                    <Image
                      src={getMatchImage(match.matchType)}
                      alt={match.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle className="flex flex-col justify-center gap-1">
                    <strong>{match.title}</strong>
                    <p className="text-sm text-gray-300">
                      {formatDate(match.startTime)}
                    </p>
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* ✅ Prize Info */}
                <div className="flex justify-around">
                  <div className="text-green-500 font-bold flex flex-col items-center">
                    <strong>+ WIN PRIZE</strong>
                    <span>{match.winPrize} TK</span>
                  </div>
                  <div className="text-blue-500 font-bold flex flex-col items-center">
                    <strong>+ PER KILL</strong>
                    <span>{match.perKill} TK</span>
                  </div>
                  <div className="text-red-500 font-bold flex flex-col items-center">
                    <strong>ENTRY FEE</strong>
                    <span>{match.entryFee} TK</span>
                  </div>
                </div>

                <div className="flex justify-between text-gray-300 mt-2">
                  <div className="flex flex-col items-center w-full">
                    <strong>ENTRY TYPE</strong>
                    <span>{match.entryType}</span>
                  </div>
                  <div className="flex flex-col items-center border-x-4 border-amber-600 w-full">
                    <strong>MAP</strong>
                    <span>{match.map}</span>
                  </div>
                  <div className="flex flex-col items-center w-full">
                    <strong>VERSION</strong>
                    <span>MOBILE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center my-4 gap-3">
                  <div className="w-2/3">
                    <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-green-500 h-4"
                        style={{
                          width: `${
                            match.totalSpots
                              ? (match.joinedPlayers.length /
                                  match.totalSpots) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-400">
                      Only {match.totalSpots - match.joinedPlayers.length} spots
                      left ({match.joinedPlayers.length}/{match.totalSpots})
                    </p>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/play-match/join-match?matchId=${match._id}`
                      );
                    }}
                    disabled={isDisabled}
                    className={`w-1/3 ${
                      isDisabled
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {buttonText}
                  </Button>
                </div>

                <div className="flex justify-between mt-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsJoined(false);
                      handlePopup(match._id, "room");
                    }}
                    variant="outline"
                    className="border-gray-600 text-black"
                  >
                    Room Details
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePopup(match._id, "prize");
                    }}
                    variant="outline"
                    className="border-gray-600 text-black"
                  >
                    Total Prize Details
                  </Button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="w-2/3 p-2 bg-green-600 rounded text-center font-bold">
                    <Countdown targetDate={match.startTime} />
                  </div>
                  <strong className="w-1/3 p-2 bg-green-800 rounded text-center font-bold">
                    #{match.serialNumber}
                  </strong>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* ✅ Popup */}
        {showPopup && (
          <PrizePopup
            matchId={matchId}
            popUpType={popUpType}
            isJoined={isJoined}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PlayMatch;
