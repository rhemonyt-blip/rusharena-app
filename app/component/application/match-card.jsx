"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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

const matches = [
  {
    title: MatchType1,
    link: `/play-match/?type=${MatchType1}`,
    image: MatchType1Img,
  },
  {
    title: MatchType2,
    link: `/play-match/?type=${MatchType2}`,
    image: MatchType2Img,
  },
  {
    title: MatchType3,
    link: `/play-match/?type=${MatchType3}`,
    image: MatchType3Img,
  },
  {
    title: MatchType4,
    link: `/play-match/?type=${MatchType4}`,
    image: MatchType4Img,
  },
  {
    title: MatchType5,
    link: `/play-match/?type=${MatchType5}`,
    image: MatchType5Img,
  },
  {
    title: MatchType6,
    link: `/play-match/?type=${MatchType6}`,
    image: MatchType6Img,
  },
];

export default function MatchCards() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get("/api/matchFound");

        await setCounts(res?.data?.data);
      } catch (err) {
        console.error("Failed to fetch match counts:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">BR, LONE, CS MATCHES</h2>
      <div className="grid grid-cols-2 gap-4">
        {matches.map((match, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow pt-0"
          >
            <Link href={match.link}>
              <CardHeader className="p-0">
                <div className="relative w-full h-32">
                  <Image
                    src={match.image}
                    alt={match.title}
                    fill
                    className="object-fill rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-sm font-bold">
                  {match.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {counts[match.title] !== undefined ? counts[match.title] : 0}{" "}
                  matches found
                </CardDescription>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
