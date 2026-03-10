
import {
  MatchType1,
 MatchType2,
 MatchType3,
 MatchType4,
 MatchType5,
 MatchType6,
 MatchType7,
 MatchType8,
 MatchType9,
 MatchType10,
} from "@/config";

export default function MatchRule({ matchType }) {
  const MatchTypes = {
    MatchType1:  MatchType1 ,
    MatchType2:  MatchType2 ,
    MatchType3:  MatchType3 ,
    MatchType4:  MatchType4 ,
    MatchType5:  MatchType5 ,
    MatchType6:  MatchType6 ,
    MatchType7:  MatchType7 ,
    MatchType8:  MatchType8 ,
    MatchType9:  MatchType9 ,
    MatchType10: MatchType10 ,
  };

  function getMatchTypeNumber(value) {
    const entry = Object.entries(MatchTypes).find(([key, val]) => val === value);
    if (!entry) return null;
    return entry[0].replace("MatchType", "");
  }
 
    
  const contents = [
    // --- BR Match Rules (example same as your image) ---
    <>
      <p className="text-yellow-400 mt-3">
        ⚠️ অ্যাপের মধ্যে আপনি যত নাম্বারে জয়েন হবেন গেমের মধ্যেও ঠিক একই নাম্বার
        স্লটে আপনাকে থাকতে হবে। অন্যথায় কিক দেওয়া হবে।
      </p>

      <p className="text-red-400 mt-3">
        📸 ম্যাচের মধ্যে কমপক্ষে ৩টা থেকে ৪টা স্ক্রিনশট নিবেন আলাদা আলাদা সময়ের।
        প্রয়োজনবশত স্ক্রিনশটগুলো চাওয়া হতে পারে। Screenshot না দিলে রিওয়ার্ড
        দেওয়া হবে না।
      </p>

      <p className="text-yellow-300 mt-3">
        🚫 কোনো Female Character ব্যাবহার করা যাবেনা। এখন সবার Gameplay Fair
        হবে। – ধন্যবাদ
      </p>

      <p className="text-blue-400 mt-3">
        🎥 Room ID এবং Password Collect থেকে শুরু করে প্লেন পর্যন্ত Video Screen
        Record করে রাখতে হবে।
      </p>

      <p className="text-green-400 mt-3">
        🕵️ যদি কোন প্লেয়ার হ্যাক বা টিমিং করেছে এরকম প্রমাণ দিতে পারেন তাহলে
        Rush Arena এর পক্ষ থেকে আপনাকে রিওয়ার্ড দেয়া হবে।
      </p>

      <p className="text-red-400 mt-3">
        ❌ কোনো প্রকার স্নাইপার, ডাবল ভেক্টর ও M590 ইউজ করা যাবে না। করলে
        রিওয়ার্ড দেয়া হবে না।
      </p>

      <p className="text-red-400 mt-3">
        🚗 কোনো ধরনের গাড়ি চালানো যাবে না। চালালে রিওয়ার্ড দেওয়া হবেনা।
      </p>

      <p className="text-yellow-400 mt-3">
        🔫 BR ম্যাচে কেউ ৭ কিলের অধিক কিল করলে তাকে ৭ কিলের টাকাই দেওয়া হবে।
      </p>

      <p className="text-red-400 mt-3">
        🚷 আপনার ফ্রি ফায়ার আইডি লেভেল ৪০ এর নিচে হলে রুম থেকে কিক দেয়া হবে এবং
        কোনো রকম রিফান্ড দেয়া হবে না।
      </p>

      <p className="text-red-400 mt-3">
        🔒 রুম আইডি এবং পাসওয়ার্ড Unregistered কারো সাথে শেয়ার করবেন না।
      </p>

      <p className="text-red-400 mt-3">
        🧨 কেও যদি হ্যাক বা টিমিং করার সময় ধরা পরে তাকে অ্যাপ থেকে ব্যান করে
        দেয়া হবে এবং Full Map এ Heal Battle করলে কোন রিওয়ার্ড পাবেন না।
      </p>

      <p className="text-yellow-400 mt-3">
        👥 Duo এবং Squad এ আপনার টিমমেট না থাকলে রুমে গিয়ে Random প্লেয়ার এর
        সাথে খেলতে হবে। রুমের মধ্যে অন্য টিমকে বিরক্ত করলে সাথে সাথে রুম থেকে
        বের করে দেয়া হবে এবং আপনার টাকা ফেরত দেয়া হবে না।
      </p>

      <p className="text-blue-400 mt-3">
        🕐 রুম আইডি এবং পাসওয়ার্ড ম্যাচ টাইমের ০৫ থেকে ০৭ মিনিট আগে দেয়া হবে।
        আপনি যদি না জানেন কিভাবে রুমে জয়েন করতে হয় তাহলে আমাদের অ্যাপ থেকে ভিডিও
        দেখে নিতে পারেন।
      </p>

      <p className="text-yellow-400 mt-3">
        💬 যেকোনো সমস্যায় টেলিগ্রাম এডমিনের সাথে যোগাযোগ করুন।
      </p>

      <p className="text-green-400 mt-3">
        ✅ “ADMIN” এর সিদ্ধান্তই চূড়ান্ত সিদ্ধান্ত।
      </p>
    </>,
    
    <>
      <p className="text-yellow-400 font-semibold text-lg mt-3">
        ⚙️ CS এর নিয়মাবলি:
      </p>

      <p className="text-blue-400 mt-3">
        🎯 <span className="font-semibold">Solo Match এর নিয়ম:</span> (1, 3, 5,
        7 হলে আপনি থাকবেন টিম ১। যদি অ্যাপে জয়েন দেন 2, 4, 6, 8 এতে আপনি থাকবেন
        টিম ২)। কাস্টমে রুমে গিয়ে সেই টিমে বসবেন। না হলে কিক খেলে টাকা ফেরত
        পাবেন না।
      </p>

      <p className="text-red-400 mt-3">
        🚫 ইমোট দেওয়া যাবে না, দিলে Winning এড হবে না।
      </p>

      <p className="text-yellow-400 font-semibold mt-5">
        📋 নিয়মের সমস্ত বিবরণ:
      </p>

      <p className="text-blue-400 mt-2">🎮 CS এ 9 ROUND থাকবে।</p>
      <p className="text-blue-400 mt-2">💰 Coin 9500 থাকবে।</p>
      <p className="text-blue-400 mt-2">
        🧱 CLASS SQUAD MATCH UNLIMITED WALL এ খেলা হবে।
      </p>
      <p className="text-blue-400 mt-2">⚔️ Character Skill Off থাকবে।</p>
      <p className="text-blue-400 mt-2">🔫 Gun Skin Off থাকবে।</p>
      <p className="text-blue-400 mt-2">📦 Air Drop Off থাকবে।</p>
      <p className="text-blue-400 mt-2">🎒 Loadout Yes থাকবে।</p>

      <p className="text-green-400 mt-3">
        🖼️ Cs এর ফাস্ট উইনিং পাওয়ার জন্য টেলিগ্রামে ম্যাচের রেজাল্টের স্ক্রিনশট
        দিতে পারেন।
      </p>

      <p className="text-yellow-400 font-semibold mt-5">
        ⚠️ গুরুত্বপূর্ণ নিয়ম:
      </p>

      <p className="text-red-400 mt-2">
        🎥 CS 4v4 এ রিপ্লে ভিডিও On রাখতে হবে বাধ্যতামূলক। অ্যাডমিন চাইলে দিতে
        হবে।
      </p>
      <p className="text-red-400 mt-2">
        📹 Class Squad Match এ সন্দেহজনক মনে হলে ক্লিন রেকর্ড ভিডিও দিতে হবে।
      </p>
      <p className="text-yellow-400 mt-2">
        👥 CLASH SQUAD ম্যাচে প্রথম চারজন এক টিমে এবং পরের চারজন অন্য টিমে থাকতে
        হবে। এটি বাধ্যতামূলক।
      </p>
      <p className="text-red-400 mt-2">
        📸 CLASH SQUAD এর প্রতি ম্যাচে ৪ থেকে ৫ টি SCREENSHOT দিতে হবে। প্রয়োজন
        হলে স্ক্রিনশটগুলো চাওয়া হতে পারে। SCREENSHOT অ্যাডমিনের কাছে SUBMIT করতে
        না পারলে কোন REWARD দেওয়া হবে না।
      </p>

      <p className="text-red-400 mt-3">
        🚫 Victor, Mag7, M90, Change Buster, Sniper নেওয়া যাবে না।
      </p>
      <p className="text-red-400 mt-2">
        🧨 CS এ বোম এবং ফ্ল্যাশবোম ব্যবহার করা যাবে না। করলে বিপরীত দলকে "উইন"
        করে দেয়া হবে।
      </p>
      <p className="text-red-400 mt-2">
        🧍‍♂️ CLASH SQUAD ম্যাচে PC প্লেয়াররা ALLOW না।
      </p>
      <p className="text-red-400 mt-2">
        ❤️ ক্ল্যাশ স্কোয়াডে হিল ব্যাটেল নিষিদ্ধ।
      </p>

      <p className="text-yellow-400 mt-3">
        🌐 নেট সমস্যার কারণে কাস্টম থেকে বের করে দিলে বা গেমে না ঢুকলে কোনো রকম
        রিফান্ড দেওয়া হবে না।
      </p>
      <p className="text-yellow-400 mt-2">
        🕐 ক্ল্যাশ স্কোয়াড ম্যাচে জয়েন করার পর কোনো রকম রিফান্ড হবে না।
      </p>

      <p className="text-blue-400 mt-3">
        🧾 প্লেয়ারের নাম পরিবর্তন করতে হলে কমপক্ষে ২০-৩০ মিনিট আগে সাপোর্টে
        জানাতে হবে এবং প্লেয়ার লিস্ট দিতে হবে। না জানালে রুম থেকে কিক দেয়া হবে
        (বাধ্যতামূলক)।
      </p>

      <p className="text-red-400 mt-3">
        🚷 আপনার FREE FIRE আইডি ৪০ লেভেলের কম হলে খেলতে পারবেন না।
      </p>

      <p className="text-yellow-400 mt-3">
        🔑 রুম আইডি এবং পাসওয়ার্ড ম্যাচ টাইমের ৪-৬ মিনিট আগে দেওয়া হবে।
      </p>
      <p className="text-red-400 mt-2">
        ⏰ সঠিক সময়ে রুমে জয়েন করতে না পারলে টাকা রিফান্ড করা হবে না।
      </p>
      <p className="text-red-400 mt-2">
        🔒 রুম আইডি এবং পাসওয়ার্ড "UN-REGISTERED" দের সাথে শেয়ার করবেন না।
      </p>

      <p className="text-yellow-400 mt-3">
        👥 কোনো ম্যাচে ৭ জন প্লেয়ার হলে এক্ষেত্রে "3V3" করানো হবে এবং ১ জনকে
        রিফান্ড দেওয়া হবে।
      </p>

      <p className="text-red-400 mt-3">
        🧨 যদি হ্যাক ইউজ করার সময় ধরা পরে তাহলে "Rush Arena" থেকে ব্যান করে
        দেওয়া হবে।
      </p>

      <p className="text-yellow-400 mt-3">
        👤 SOLO অথবা SQUAD ম্যাচে "UN-REGISTERED" টিমমেট নিয়ে খেলা যাবে না।
      </p>

      <p className="text-green-400 mt-3">
        💰 ম্যাচ "WINNING" এর টাকা ম্যাচ শেষ হওয়ার ৩০-৪০ মিনিটের মধ্যে দিয়ে
        দেওয়া হবে।
      </p>
      <p className="text-green-400 mt-2">
        💳 "WITHDRAW" নির্দিষ্ট সময়ের মধ্যে দেওয়া হয়।
      </p>

      <p className="text-yellow-300 font-semibold mt-4">
        ✨ "ADMIN" এর সিদ্ধান্তই চূড়ান্ত সিদ্ধান্ত।
      </p>
    </>,
    <>
      <p className="text-yellow-400 font-semibold text-lg mt-3">
        ⚙️ Lone Wolf ম্যাচের নিয়ম:
      </p>

      <p className="text-red-400 mt-3">
        🚫 ইমোট দেওয়া যাবে না, দিলে Winning এড হবে না।
      </p>

      <p className="text-blue-400 mt-3">🎯 ম্যাচটি ৯ রাউন্ডের হবে।</p>

      <p className="text-blue-400 mt-2">🧱 সীমিত প্রাচীর থাকবে।</p>

      <p className="text-yellow-400 mt-2">
        💣 LOAN WOLF যেহেতু Limited Ammo তে খেলানো হবে, সেহেতু সবকিছু ALLOW —
        গ্রেনেডও ব্যবহার করতে পারবেন।
      </p>

      <p className="text-red-400 mt-3">
        📸 প্রতি ম্যাচে ৪ থেকে ৫ টি SCREENSHOT দিতে হবে। প্রয়োজন হলে
        স্ক্রিনশটগুলো চাওয়া হতে পারে। SCREENSHOT অ্যাডমিনের কাছে SUBMIT করতে না
        পারলে কোন REWARD দেওয়া হবে না।
      </p>

      <p className="text-green-400 mt-3">
        🔫 Lone Wolf এ সব ধরনের Gun নেওয়া যাবে।
      </p>

      <p className="text-red-400 mt-3">🧍‍♂️ ম্যাচে PC প্লেয়াররা ALLOW না।</p>

      <p className="text-yellow-400 mt-3">
        🌐 নেট সমস্যার কারণে কাস্টম থেকে বের করে দিলে বা গেমে না ঢুকলে কোনো রকম
        রিফান্ড দেওয়া হবে না।
      </p>

      <p className="text-yellow-400 mt-2">
        🕐 Lone Wolf ম্যাচে জয়েন করার পর কোনো রকম রিফান্ড হবে না।
      </p>

      <p className="text-blue-400 mt-3">
        🧾 প্লেয়ারের নাম পরিবর্তন করতে হলে কমপক্ষে ২০-৩০ মিনিট আগে সাপোর্টে
        জানাতে হবে এবং প্লেয়ার লিস্ট দিতে হবে। না জানালে রুম থেকে কিক দেয়া হবে।
        (বাধ্যতামূলক)
      </p>

      <p className="text-red-400 mt-3">
        🚷 আপনার FREE FIRE আইডি ৪০ লেভেলের কম হলে খেলতে পারবেন না।
      </p>

      <p className="text-yellow-400 mt-3">
        🔑 রুম আইডি এবং পাসওয়ার্ড ম্যাচ টাইমের ৪-৫ মিনিট আগে দেওয়া হবে।
      </p>

      <p className="text-red-400 mt-2">
        ⏰ সঠিক সময়ে রুমে জয়েন করতে না পারলে টাকা রিফান্ড করা হবে না।
      </p>

      <p className="text-red-400 mt-2">
        🔒 রুম আইডি এবং পাসওয়ার্ড "UN-REGISTERED" দের সাথে শেয়ার করবেন না।
      </p>

      <p className="text-yellow-400 mt-3">
        👥 কোনো ম্যাচে ৩ জন প্লেয়ার হলে এক্ষেত্রে "2v2" করানো হবে এবং ১ জনকে
        রিফান্ড দেওয়া হবে।
      </p>

      <p className="text-red-400 mt-3">
        🧨 যদি হ্যাক ইউজ করার সময় ধরা পরে তাহলে "Rush Arena" থেকে ব্যান করে
        দেওয়া হবে।
      </p>

      <p className="text-green-400 mt-3">
        💰 ম্যাচ "WINNING" এর টাকা ম্যাচ শেষ হওয়ার ৫-১০ মিনিটের মধ্যে দিয়ে দেওয়া
        হবে।
      </p>

      <p className="text-green-400 mt-2">
        💳 "WITHDRAW" প্রতিদিন রাত ১২:০০ টায় দেওয়া হয়।
      </p>

      <p className="text-yellow-300 font-semibold mt-4">
        ✨ "ADMIN" এর সিদ্ধান্তই চূড়ান্ত সিদ্ধান্ত।
      </p>
    </>,
    <>
      <p className="text-yellow-400 font-semibold text-lg mt-3">
        ⚙️ CS এর নিয়মাবলি:
      </p>

      <p className="text-red-400 mt-3">
        🚫 ইমোট দেওয়া যাবে না, দিলে Winning এড হবে না।
      </p>

      <p className="text-yellow-400 font-semibold mt-5">📋 নিয়মের সকল বিবরণ:</p>

      <p className="text-blue-400 mt-2">🎮 CS এ 9 ROUND থাকবে।</p>
      <p className="text-blue-400 mt-2">💰 Coin 9500 থাকবে।</p>
      <p className="text-blue-400 mt-2">
        🧱 CLASS SQUAD MATCH UNLIMITED WALL এ খেলা হবে।
      </p>
      <p className="text-blue-400 mt-2">⚔️ Character Skill Off থাকবে।</p>
      <p className="text-blue-400 mt-2">🔫 Gun Skin Off থাকবে।</p>
      <p className="text-blue-400 mt-2">📦 Air Drop Off থাকবে।</p>
      <p className="text-blue-400 mt-2">🎒 Loadout Yes থাকবে।</p>

      <p className="text-green-400 mt-3">
        🖼️ CS এর ফাস্ট উইনিং পাওয়ার জন্য টেলিগ্রামে ম্যাচের রেজাল্টের স্ক্রিনশট
        দিতে পারেন।
      </p>

      <p className="text-yellow-400 mt-3">
        👥 CLASH SQUAD ম্যাচে প্রথম চারজন এক টিমে এবং পরের চারজন অন্য টিমে থাকতে
        হবে। এটি বাধ্যতামূলক।
      </p>

      <p className="text-red-400 mt-3">
        📸 CLASH SQUAD এর প্রতি ম্যাচে ৪ থেকে ৫ টি SCREENSHOT দিতে হবে। প্রয়োজন
        হলে স্ক্রিনশটগুলো চাওয়া হতে পারে। SCREENSHOT অ্যাডমিনের কাছে SUBMIT করতে
        না পারলে কোন REWARD দেওয়া হবে না।
      </p>

      <p className="text-red-400 mt-3">
        🚫 CS এ Victor, Mag7, M90, Change Buster, Sniper নেওয়া যাবে না।
      </p>

      <p className="text-yellow-400 mt-3">
        📋 CLASH SQUAD ম্যাচে প্লেয়ার লিস্টের প্রথম চারজন এক টিম এবং দ্বিতীয়
        চারজন অন্য টিম হিসেবে গণ্য করা হবে।
      </p>

      <p className="text-red-400 mt-3">
        ❤️ CLASH SQUAD এ নিরাময় যুদ্ধ (Heal Battle) করা যাবে না।
      </p>

      <p className="text-red-400 mt-2">
        🧍‍♂️ CLASH SQUAD ম্যাচে PC প্লেয়াররা ALLOW না।
      </p>

      <p className="text-red-400 mt-2">
        💣 CS এ বোম ও ফ্ল্যাশবোম ব্যবহার করা যাবে না। করলে বিপরীত দলকে “উইন” করে
        দেয়া হবে।
      </p>

      <p className="text-yellow-400 mt-3">
        🌐 নেট সমস্যার কারণে কাস্টম থেকে বের করে দিলে বা গেমে না ঢুকলে কোনো রকম
        রিফান্ড দেওয়া হবে না।
      </p>

      <p className="text-yellow-400 mt-2">
        🕐 ক্ল্যাশ স্কোয়াড ম্যাচে জয়েন করার পর কোনো রকম রিফান্ড হবে না।
      </p>

      <p className="text-blue-400 mt-3">
        🧾 প্লেয়ারের নাম পরিবর্তন করতে হলে কমপক্ষে ২০-৩০ মিনিট আগে সাপোর্টে
        জানাতে হবে এবং প্লেয়ার লিস্ট দিতে হবে। না জানালে রুম থেকে কিক দেয়া হবে।
        (বাধ্যতামূলক)
      </p>

      <p className="text-red-400 mt-3">
        🚷 আপনার FREE FIRE আইডি ৪০ লেভেলের কম হলে খেলতে পারবেন না।
      </p>

      <p className="text-yellow-400 mt-3">
        🔑 রুম আইডি এবং পাসওয়ার্ড ম্যাচ টাইমের ৪-৬ মিনিট আগে দেওয়া হবে।
      </p>

      <p className="text-red-400 mt-2">
        ⏰ সঠিক সময়ে রুমে জয়েন করতে না পারলে টাকা রিফান্ড করা হবে না।
      </p>

      <p className="text-red-400 mt-2">
        🔒 রুম আইডি এবং পাসওয়ার্ড "UN-REGISTERED" দের সাথে শেয়ার করবেন না।
      </p>

      <p className="text-yellow-400 mt-3">
        👥 কোনো ম্যাচে ৭ জন প্লেয়ার হলে এক্ষেত্রে "3v3" করানো হবে এবং ১ জনকে
        রিফান্ড দেওয়া হবে।
      </p>

      <p className="text-red-400 mt-3">
        🧨 যদি হ্যাক ইউজ করার সময় ধরা পরে তাহলে "Rush Arena" থেকে ব্যান করে
        দেওয়া হবে।
      </p>

      <p className="text-yellow-400 mt-3">
        👤 SOLO অথবা SQUAD ম্যাচে "UN-REGISTERED" টিমমেট নিয়ে খেলা যাবে না।
      </p>

      <p className="text-green-400 mt-3">
        💰 ম্যাচ "WINNING" এর টাকা ম্যাচ শেষ হওয়ার ৩০-৪০ মিনিটের মধ্যে দিয়ে
        দেওয়া হবে।
      </p>

      <p className="text-green-400 mt-2">
        💳 "WITHDRAW" নির্দিষ্ট সময়ের মধ্যে দেওয়া হয়।
      </p>

      <p className="text-yellow-300 font-semibold mt-4">
        ✨ "ADMIN" এর সিদ্ধান্তই চূড়ান্ত সিদ্ধান্ত।
      </p>
    </>,
    <>
      <p className="text-yellow-400 font-semibold text-lg mt-3">
        🎲 Rush ARena Match নিয়মাবলি:
      </p>

      <p className="text-blue-400 mt-3">
        📱 Rush ARena Match Support টেলিগ্রাম গ্রুপে জয়েন করতে হবে।
      </p>

      <p className="text-green-400 mt-3">
        🖼️ ম্যাচে Win হবার পরে Winning স্ক্রিনশট নিবেন। ম্যাচ খেলার সময় ১/২ টি
        স্ক্রিনশট নিবেন এবং ম্যাচ Start হবার সময় ১০/১৫ সেকেন্ড এর একটি
        স্ক্রিনরেকর্ড করতে হবে। এগুলো ম্যাচ শেষে ৫-১০ মিনিটের মধ্যে Caption সহ
        Rush Arena Match Support গ্রুপে সেন্ড করতে হবে।
      </p>

      <p className="text-red-400 mt-3">
        ✍️ গ্রুপে সেন্ড করার সময় Captipn এ SMS এ Match Time / Match No লিখে দিতে
        হবে, তা না হলে রিওয়ার্ড পাবেন না।
      </p>

      <p className="text-red-400 mt-3">
        ⚠️ Match তে কেউ কোনো প্রকার প্রতারণা করার চেষ্টা করলে অথবা Fake
        স্ক্রিনশট Edit করে গ্রুপে দিলে "Rush ARena" App থেকে Ban দেওয়া হবে।
      </p>

      <p className="text-yellow-400 mt-3">
        🧾 "Rush ARena" অ্যাপে যে নামে ম্যাচে জয়েন হয়েছেন, "Match King" অ্যাপে
        সে নামের সাথে মিল না থাকলে রিওয়ার্ড পাবেন না।
      </p>

      <p className="text-blue-400 mt-3">
        🔑 Room ID & Pass ম্যাচ টাইমের ৫-৬ মিনিট আগে Room Details এ দেওয়া হবে।
        সময় মত ম্যাচে জয়েন না করতে পারলে রিফান্ড পাবেন না।
      </p>

      <p className="text-green-400 mt-3">
        👤 আপনি ম্যাচে জয়েন করার পরে Opponent রুমে জয়েন না করলে আপনাকে ম্যাচের
        টাকা রিফান্ড করা হবে না।
      </p>
    </>,
    "",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-4">
      <h1 className="text-center text-2xl font-bold mb-4">All Rules</h1>

      {/* Tabs */}
      <div
       
        className="flex overflow-x-auto space-x-2 mt-4 mb-6 no-scrollbar"
      >
  
      </div>

      {/* Content */}
  

      <div className="bg-gray-900 p-4 rounded-2xl shadow-lg text-sm leading-relaxed">
        {contents[getMatchTypeNumber(matchType)-1]}
      </div>

 
    </div>
  
  );
}




