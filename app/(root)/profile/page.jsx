"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  User,
  Wallet,
  Award,
  CreditCard,
  ClipboardList,
  Share2,
  Copy,
} from "lucide-react";
import { depositPage, transection, withdrawPage } from "@/config";
import ButtonLoading from "@/app/component/buttonLoading";
import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { showToast } from "@/app/component/application/tostify";
import axios from "axios";

export default function ProfileSidebar() {
  const [loading, setLoading] = useState(false);
  const [total, setTotals] = useState({});

  // Fetch Profile Info
  useEffect(() => {
    (async () => {
      try {
        const { value } = await Preferences.get({ key: "access_token" });
        const { data } = await axios.get(`/api/mymatch/?authId=${value}`);
        if (data.success) {
          setTotals(data.data);
        }
      } catch {
        showToast("error", "Failed to fetch Profile Info!");
      }
    })();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await Preferences.remove({ key: "access_token" });
      document.cookie =
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      showToast("success", "Logged out successfully!");
      window.location.href = `/`;
    } catch (error) {
      console.error("Error during logout:", error);
      showToast("error", "Failed to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="bg-[#0f0720] text-white shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center cursor-pointer">
              <h3 className="text-lg font-semibold">{total.userName}</h3>
            </div>

            <div className="w-full mt-3 bg-white/8 rounded-xl py-3 px-2 flex justify-between text-center">
              <div className="flex-1">
                <div className="text-2xl font-bold">
                  {total.totalMatches || 0}
                </div>
                <div className="text-xs text-white/70">Match Played</div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold">
                  {total.totalKills || 0}
                </div>
                <div className="text-xs text-white/70">Total Kill</div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold">{total.totalWins || 0}</div>
                <div className="text-xs text-white/70">Won</div>
              </div>
            </div>
          </div>
        </CardContent>

        <div className="divide-y divide-white/6">
          <MenuItem href="wallet" icon={<Wallet size={20} />} label="Wallet" />
          <MenuItem
            href={depositPage}
            icon={<CreditCard size={20} />}
            label="Deposit"
          />
          <MenuItem
            href={withdrawPage}
            icon={<Award size={20} />}
            label="Withdraw"
          />
          <MenuItem
            href={transection}
            icon={<CreditCard size={20} />}
            label="Transaction History"
          />
          <MenuItem
            href="profile/my-profile"
            icon={<User size={20} />}
            label="My Profile"
          />
          <MenuItem
            href="profile/rules"
            icon={<ClipboardList size={20} />}
            label="All Rules"
          />
          <MenuItem
            href="profile/share"
            icon={<Share2 size={20} />}
            label="Share This App"
          />

          <div className="p-4">
            <ButtonLoading
              className="w-full rounded-full bg-red-600 hover:bg-red-700"
              onclick={handleLogout}
              text="Logout"
              loading={loading}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

function MenuItem({ icon, label, href }) {
  return (
    <Link href={href} className="w-full block">
      <button className="w-full text-left p-4 flex items-center gap-4 hover:bg-white/3">
        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/6">
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">{label}</div>
        </div>
        <ChevronRight size={18} className="text-white/70" />
      </button>
    </Link>
  );
}
