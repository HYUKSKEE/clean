import Link from "next/link";
import { MessageSquareText, Phone } from "lucide-react";
import { site, telHref } from "@/lib/site";

/** 모바일 전용 하단 고정 CTA – 스크롤 위치와 무관하게 문의 동선을 유지합니다. */
export function MobileCallBar() {
  return (
    <nav
      aria-label="빠른 문의"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 backdrop-blur-md lg:hidden"
    >
      <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
        <a
          href={telHref}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-white text-[0.95rem] font-bold text-ink"
        >
          <Phone className="size-4" aria-hidden />
          <span className="sr-only">{site.phone} </span>전화 상담
        </a>
        <Link
          href="/#contact"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand text-[0.95rem] font-bold text-ink"
        >
          <MessageSquareText className="size-4" aria-hidden />
          무료 견적 문의
        </Link>
      </div>
    </nav>
  );
}
