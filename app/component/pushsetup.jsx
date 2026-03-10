"use client";

import { useEffect, useRef } from "react";
import { initPush, onToken } from "../component/push";
import axios from "axios";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";

export default function AppInit() {
  const lastTokenRef = useRef(null);

  useEffect(() => {
    // Only run on native platforms (Android / iOS)
    if (!Capacitor.isNativePlatform()) return;

    initPush();

    const unsubscribe = onToken(async (token) => {
      if (!token) return;

      // Prevent duplicate saves
      if (lastTokenRef.current === token) return;
      lastTokenRef.current = token;

      await saveToken(token);
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const saveToken = async (token) => {
    try {
      const { value: userId } = await Preferences.get({ key: "access_token" });
      if (!userId) return;

      await axios.post("/api/saveToken", {
        token,
        userId,
        platform: Capacitor.getPlatform(),
      });

      console.log("✅ Push token saved:", token);
    } catch (err) {
      console.error("❌ Failed to save push token", err);
    }
  };

  return null;
}
