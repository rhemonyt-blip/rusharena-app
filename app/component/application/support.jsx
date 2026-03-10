"use client";

import { telegramlink } from "@/config";
import Image from "next/image";

export default function SupportImg() {
  return (
    <div className="fixed bottom-25 right-4 bg-[#d6caee] flex justify-around p-3 rounded-full z-50">
      <a href={telegramlink}>
        <Image
          src="/images/assets/support.png"
          alt="support"
          width={50}
          height={50}
        />{" "}
      </a>
    </div>
  );
}
