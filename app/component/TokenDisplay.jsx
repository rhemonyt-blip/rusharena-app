"use client";

import { useState } from "react";

export default function TokenDisplay({ token }) {
  const [copied, setCopied] = useState(false);

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Copy failed: " + err.message);
    }
  };

  if (!token) return null;

  return (
    <div
      style={{
        padding: "20px",
        background: "#f5f5f5",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h3>Your FCM Token</h3>
      <textarea
        value={token}
        readOnly
        style={{
          width: "100%",
          height: "120px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={copyToken}
        style={{
          padding: "10px 20px",
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
        }}
      >
        Copy Token
      </button>

      {copied && <p style={{ color: "green", marginTop: "10px" }}>Copied!</p>}
    </div>
  );
}
