"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, ClipboardList, Trophy, User } from "lucide-react";

export default function FooterNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "Play", icon: Gamepad2, href: "/" },
    { name: "My Matches", icon: ClipboardList, href: "/my-matches" },
    { name: "Top Players", icon: Trophy, href: "/top-players" },
    { name: "Profile", icon: User, href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 h-[80] left-0 right-0 bg-[#0A0020] flex justify-around py-3 shadow-[0_-1px_10px_rgba(0,0,0,0.4)] z-50">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`flex flex-col items-center text-xs font-medium transition-all duration-200 ${
              active ? "text-purple-400" : "text-gray-400"
            }`}
          >
            <div
              className={`p-2 rounded-full transition-all ${
                active ? "bg-purple-900/40" : "bg-transparent"
              }`}
            >
              <Icon size={22} />
            </div>
            <span className="mt-1">{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
