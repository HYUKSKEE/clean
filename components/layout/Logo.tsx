import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { isNextOptimizedImage } from "@/lib/assets";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** public/assets/logo/ 이미지가 있으면 워드마크로 쓰고, 없으면 기본 아이콘을 유지합니다. */
export function Logo({
  className,
  withTagline = true,
  src = "",
}: {
  className?: string;
  withTagline?: boolean;
  src?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${site.name} 홈으로 이동`}
    >
      {src ? (
        <span className="relative block h-[80px] w-[10rem] overflow-hidden">
          <Image
            src={src}
            alt={site.name}
            width={180}
            height={180}
            priority
            unoptimized={!isNextOptimizedImage(src)}
            className="absolute top-1/2 left-1/4 h-[180%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </span>
      ) : (
        <>
          <span className="grid size-10 place-items-center rounded-xl bg-brand shadow-[0_1px_0_rgba(17,24,39,0.08)]">
            <Sparkles className="size-5 text-ink" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight">{site.name}</span>
            {withTagline ? (
              <span className="mt-1 text-[0.7rem] font-medium text-ink-muted">
                {site.tagline}
              </span>
            ) : null}
          </span>
        </>
      )}
    </Link>
  );
}
