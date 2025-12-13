import React from "react";
import Image from "next/image";
import mvImage from "@/public/images/mv-img01.webp";

const MainVisual = () => {
  return (
    <section className="relative mb-10 overflow-hidden rounded-2xl">
      <div className="relative h-[520px] sm:h-[580px] md:h-[560px]">
        <Image
          src={mvImage}
          alt="iPhone 17 Pro Max"
          priority
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-black/10" />

      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="w-full px-5 pb-6 md:max-w-xl md:px-14 md:pb-0">
          <div className="rounded-xl bg-black/40 p-5 backdrop-blur-sm md:bg-white/5 md:p-8">
            <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">
              New Release
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-6xl">
              iPhone 17 Pro Max
            </h1>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
              Aluminum body, A19 Pro chip, 8× optical zoom, and the longest
              battery life ever.
            </p>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 rounded-md bg-primary px-5 py-2 text-sm font-semibold transition-all hover:scale-105 active:scale-95 md:flex-none">
                Buy Now
              </button>

              <button className="hidden rounded-md border border-white/30 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:block">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainVisual;
