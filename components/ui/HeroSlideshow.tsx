"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isNextOptimizedImage, type HeroSlide } from "@/lib/assets";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5500;

export function HeroSlideshow({
  slides,
  backgroundSrc = "",
}: {
  slides: HeroSlide[];
  backgroundSrc?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (slides.length < 2 || paused) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className={cn("absolute inset-0", backgroundSrc ? "bg-ink" : "bg-canvas")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {backgroundSrc ? (
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={backgroundSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            unoptimized={!isNextOptimizedImage(backgroundSrc)}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/30" />
        </div>
      ) : null}

      {slides.map((slide, slideIndex) => {
        const active = slideIndex === index;
        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={active ? slide.alt : ""}
            fill
            priority={slide.index === slides[0]?.index}
            sizes="100vw"
            unoptimized={!isNextOptimizedImage(slide.src)}
            className={cn(
              "z-[1] object-cover object-center transition-opacity duration-700 ease-out",
              active ? "opacity-100" : "opacity-0",
            )}
          />
        );
      })}

      {slides.length > 1 ? (
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="relative mx-auto h-full w-full max-w-[var(--site-max)]">
            <div
              role="tablist"
              aria-label="메인 배경 사진"
              className="pointer-events-auto absolute right-[20px] bottom-[20px] flex gap-2"
            >
              {slides.map((slide, slideIndex) => {
                const selected = slideIndex === index;
                return (
                  <button
                    key={slide.src}
                    type="button"
                    role="tab"
                    aria-label={`${slide.index}번째 사진`}
                    aria-selected={selected}
                    onClick={() => setIndex(slideIndex)}
                    className={cn(
                      "size-2.5 rounded-full border transition-colors",
                      selected
                        ? "border-ink bg-brand"
                        : "border-white/70 bg-white/50 hover:bg-white",
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
