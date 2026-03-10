"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const MarqueeText = () => {
  const marqueeRef = useRef(null);
  const [duration, setDuration] = useState(30);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [text, setText] = useState(
    "Welcome to Rush Arena! Welcome to Rush Arena! Welcome to Rush Arena!"
  );

  // Fetch marquee message from API
  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const res = await axios.get("/api/massage", {
          params: { type: "msg" },
        });

        if (res?.data?.msg) {
          setText(res.data.msg);
        } else {
          console.warn("No message found in API response.");
        }
      } catch (err) {
        console.error("Error fetching marquee message:", err);
      }
    };

    fetchMsg();
  }, []);

  // Dynamically calculate scroll duration
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const width = el.scrollWidth / 3; // more smoothness
    setScrollWidth(width);

    const speed = 60; // pixels per second
    const calculatedDuration = width / speed;

    setDuration(calculatedDuration || 30);
  }, [text]);

  return (
    <div className="w-full overflow-hidden mt-[-15px] bg-amber-100 rounded p-3 relative">
      {/* Marquee Container */}
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap text-md text-gray-800 font-semibold"
        style={{
          animation: `marquee ${duration}s linear infinite`,
        }}
      >
        {/* Duplicate text multiple times for true infinite effect */}
        <span className="pr-10 ps-6">{text}</span>
        <span className="pr-10">{text}</span>
        <span className="pr-10">{text}</span>
        <span className="pr-10">{text}</span>
      </div>

      {/* Fade Gradient Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-amber-100 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-amber-100 to-transparent" />

      {/* Inline Animation Style */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${scrollWidth}px);
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeText;
