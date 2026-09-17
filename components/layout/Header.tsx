"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { nav, primaryCta, site, telHref } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  // 메뉴가 열려 있는 동안 배경 스크롤을 막고, ESC 로 닫습니다.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] font-semibold text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[0.95rem] font-bold text-ink transition-colors hover:text-brand-deep"
          >
            <Phone className="size-4" aria-hidden />
            <span className="sr-only">전화 상담 </span>
            {site.phone}
          </a>
          <Button href={primaryCta.href}>{primaryCta.label}</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="grid size-11 place-items-center rounded-xl border border-line bg-white text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-line bg-canvas lg:hidden"
        >
          <nav aria-label="모바일 주요 메뉴" className="container-page py-4">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-line/70 last:border-none">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center text-base font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-2.5">
              <Button href={primaryCta.href} size="lg" onClick={() => setOpen(false)}>
                {primaryCta.label}
              </Button>
              <a
                href={telHref}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-line bg-white text-base font-bold"
              >
                <Phone className="size-4" aria-hidden />
                {site.phone} 전화 상담
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
