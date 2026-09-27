"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { isNextOptimizedImage, type HeroSlide } from "@/lib/assets";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5500;
const SWIPE_PX = 40;

export function HeroSlideshow({
  slides,
  backgroundSrc = "",
}: {
  slides: HeroSlide[];
  backgroundSrc?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const pointer = useRef<{
    id: number;
    x: number;
    y: number;
    axis: "x" | "y" | null;
  } | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (slides.length < 2 || paused || held) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [held, paused, slides.length]);

  const go = (dir: -1 | 1) => {
    if (slides.length < 2) return;
    setIndex((current) => (current + dir + slides.length) % slides.length);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointer.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      axis: null,
    };
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* 캡처할 활성 포인터가 없으면 스와이프만 이어갑니다 */
    }
    setHeld(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointer.current;
    if (!start || event.pointerId !== start.id || start.axis) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
    start.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
  };

  const endPointer = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointer.current;
    pointer.current = null;
    setHeld(false);
    if (!start || event.pointerId !== start.id || start.axis !== "x") return;

    const dx = event.clientX - start.x;
    if (Math.abs(dx) < SWIPE_PX) return;
    go(dx < 0 ? 1 : -1);
  };

  if (slides.length === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="현장 사진 슬라이드"
      className={cn(
        "absolute inset-0 touch-pan-y select-none",
        backgroundSrc ? "bg-ink" : "bg-canvas",
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
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
            className="pointer-events-none object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/30" />
        </div>
      ) : null}

      {slides.map((slide, slideIndex) => {
        const active = slideIndex === index;
        return (
          <div
            key={slide.index}
            className={cn(
              "pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700 ease-out",
              active ? "opacity-100" : "opacity-0",
            )}
          >
            {slide.mobileSrc ? (
              <Image
                src={slide.mobileSrc}
                alt={active ? slide.alt : ""}
                fill
                priority={slideIndex === 0}
                sizes="768px"
                unoptimized={!isNextOptimizedImage(slide.mobileSrc)}
                className="object-cover object-center md:hidden"
              />
            ) : null}
            <Image
              src={slide.src}
              alt={active ? slide.alt : ""}
              fill
              priority={slideIndex === 0}
              sizes="100vw"
              unoptimized={!isNextOptimizedImage(slide.src)}
              className={cn(
                "object-cover object-center",
                slide.mobileSrc && "hidden md:block",
              )}
            />
          </div>
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
                    key={slide.index}
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
