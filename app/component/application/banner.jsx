"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { banner1, banner2, banner3 } from "@/config";

const slides = [
  { id: 1, image: "/images/banner/banner1.jpg", link: banner1 },
  { id: 2, image: "/images/banner/banner2.jpg", link: banner2 },
  { id: 3, image: "/images/banner/banner3.jpg", link: banner3 },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full sm:w-[90%] h-[200px] sm:h-[600px] overflow-hidden rounded-2xl mx-auto">
      {/* Slider track */}
      <div
        className="flex h-full transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <Link
            key={slide.id}
            href={slide.link}
            className="relative min-w-full h-full block"
          >
            <Image
              src={slide.image}
              alt={`banners Img`}
              fill
              className="object-fill"
              priority={current === slide.id - 1}
            />
          </Link>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
