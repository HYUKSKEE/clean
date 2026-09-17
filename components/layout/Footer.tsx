import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { services } from "@/lib/services";
import { nav, site, telHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo withTagline={false} />
            <p className="mt-4 max-w-sm text-[0.925rem] leading-relaxed text-ink-soft">
              {site.areas.join(" · ")} 유리창 · 외벽 · 간판 청소 전문. 전문 장비와 친환경 세제로
              안전하게 시공합니다.
            </p>
            <address className="mt-5 not-italic">
              <ul className="flex flex-col gap-2.5 text-[0.925rem]">
                <li className="flex items-center gap-2.5">
                  <Phone className="size-4 shrink-0 text-brand-deep" aria-hidden />
                  <a href={telHref} className="font-bold hover:text-brand-deep">
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="size-4 shrink-0 text-brand-deep" aria-hidden />
                  <a href={`mailto:${site.email}`} className="text-ink-soft hover:text-ink">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-ink-soft">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-deep" aria-hidden />
                  {site.address}
                </li>
              </ul>
            </address>
          </div>

          <nav aria-label="푸터 서비스 메뉴">
            <p className="text-sm font-bold tracking-wide text-ink-muted uppercase">서비스</p>
            <ul className="mt-4 flex flex-col gap-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex min-h-10 items-center text-[0.925rem] text-ink-soft hover:text-ink"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <nav aria-label="푸터 페이지 메뉴">
              <p className="text-sm font-bold tracking-wide text-ink-muted uppercase">바로가기</p>
              <ul className="mt-4 flex flex-col gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-10 items-center text-[0.925rem] text-ink-soft hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="mt-6 text-sm font-bold tracking-wide text-ink-muted uppercase">
              사업자 정보
            </p>
            <dl className="mt-3 flex flex-col gap-1.5 text-[0.85rem] text-ink-muted">
              <div className="flex gap-1.5">
                <dt>상호</dt>
                <dd className="text-ink-soft">{site.legalName}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt>대표</dt>
                <dd className="text-ink-soft">{site.owner}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt>사업자등록번호</dt>
                <dd className="text-ink-soft">{site.businessNumber}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8rem] text-ink-muted">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <nav aria-label="약관">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.85rem]">
              <li>
                <Link href="/privacy" className="text-ink-soft hover:text-ink">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-ink-soft hover:text-ink">
                  이용약관
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
