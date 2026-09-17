import Link from "next/link";
import { Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** 텍스트 기반 로고 – 실제 로고 이미지가 준비되면 아이콘 부분을 next/image 로 교체하세요. */
export function Logo({
  className,
  withTagline = true,
}: {
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${site.name} 홈으로 이동`}
    >
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
    </Link>
  );
}
