"use client";

import { useEffect, useState } from "react";

export default function Countdown({ targetDate }) {
  const targetTime = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = targetTime - Date.now();
      setTimeLeft(difference > 0 ? difference : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  // Convert milliseconds
  const totalHours = Math.floor(timeLeft / (1000 * 60 * 60)); // includes days
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div>
      {timeLeft > 0 ? (
        <h2>
          Start In - {totalHours}h {minutes}m {seconds}s
        </h2>
      ) : (
        <h2>Will Start Very Soon</h2>
      )}
    </div>
  );
}
