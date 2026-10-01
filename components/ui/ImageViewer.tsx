"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { isNextOptimizedImage } from "@/lib/assets";
import { cn } from "@/lib/utils";

export type ViewerImage = {
  src: string;
  alt: string;
  caption?: string;
};

const ViewerContext = createContext<{
  images: ViewerImage[];
  openAt: (src: string) => void;
} | null>(null);

export function ImageViewerProvider({
  images,
  children,
}: {
  images: ViewerImage[];
  children: ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : images[index];
  const open = index !== null && current != null;

  const close = useCallback(() => setIndex(null), []);
  const openAt = useCallback(
    (src: string) => {
      const found = images.findIndex((image) => image.src === src);
      setIndex(found >= 0 ? found : 0);
    },
    [images],
  );
  const go = useCallback(
    (delta: number) => {
      if (images.length === 0) return;
      setIndex((value) => {
        if (value === null) return value;
        return (value + delta + images.length) % images.length;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close, go]);

  return (
    <ViewerContext.Provider value={{ images, openAt }}>
      {children}
      {open && current
        ? createPortal(
            <div
              className="fixed inset-0 z-80 flex items-center justify-center bg-ink/90 p-4"
              role="dialog"
              aria-modal="true"
              aria-label="사진 보기"
              onClick={close}
            >
              <button
                type="button"
                onClick={close}
                className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="닫기"
              >
                <X className="size-5" />
              </button>

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      go(-1);
                    }}
                    className="absolute left-3 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
                    aria-label="이전 사진"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      go(1);
                    }}
                    className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
                    aria-label="다음 사진"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              ) : null}

              <figure
                className="m-0 flex max-h-[85dvh] max-w-[min(90vw,1100px)] flex-col items-center gap-3"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={1600}
                  height={1120}
                  unoptimized={!isNextOptimizedImage(current.src)}
                  className="max-h-[78dvh] w-auto max-w-full object-contain"
                />
                <figcaption className="flex items-center gap-3 text-sm font-semibold text-white">
                  {current.caption ? <span>{current.caption}</span> : null}
                  {images.length > 1 ? (
                    <span className="text-white/70">
                      {index + 1} / {images.length}
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            </div>,
            document.body,
          )
        : null}
    </ViewerContext.Provider>
  );
}

export function ViewablePhoto({
  src,
  alt,
  caption,
  chip,
  chipClassName,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  chip?: string;
  chipClassName?: string;
  priority?: boolean;
}) {
  const viewer = useContext(ViewerContext);

  return (
    <figure className="m-0 min-w-0 w-full">
      <button
        type="button"
        onClick={() => viewer?.openAt(src)}
        className="relative mx-auto block aspect-[10/7] w-[500px] max-w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-surface"
        aria-label={`${alt} 크게 보기`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 640px) 500px, 100vw"
          unoptimized={!isNextOptimizedImage(src)}
          className="object-cover"
        />
        <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-ink/70 text-white">
          <ZoomIn className="size-4" aria-hidden />
        </span>
        {chip ? (
          <span
            aria-hidden
            className={cn(
              "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold tracking-wide",
              chipClassName,
            )}
          >
            {chip}
          </span>
        ) : null}
      </button>
    </figure>
  );
}
