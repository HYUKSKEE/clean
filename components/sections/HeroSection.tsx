import Link from "next/link";
import { ArrowRight, MapPin, Phone, ShieldCheck } from "lucide-react";
import { HeroSlideshow } from "@/components/ui/HeroSlideshow";
import { Button } from "@/components/ui/Button";
import { getHeroBackground, getHeroSlides } from "@/lib/public-assets";
import { services } from "@/lib/services";
import { site, telHref } from "@/lib/site";
import { stats } from "@/lib/trust";

export function HeroSection() {
  const slides = getHeroSlides();
  const backgroundSrc = getHeroBackground();

  return (
    <section
      className="overflow-hidden border-b border-line"
      aria-labelledby="hero-title"
    >
      <div className="relative h-[720px] min-h-[720px] overflow-hidden">
        <HeroSlideshow slides={slides} backgroundSrc={backgroundSrc} />
      </div>

      <div className="container-page relative z-10 pb-10 lg:pb-12">
        <header className="flex flex-col gap-8 rounded-2xl border border-line bg-[#ffffffcf] p-6 shadow-[0_8px_32px_rgba(17,24,39,0.08)] lg:flex-row lg:items-center lg:gap-12 lg:p-9">
          <div className="min-w-0 flex-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-bold text-ink-soft sm:text-sm">
              <MapPin className="size-4 text-brand-deep" aria-hidden />
              {site.areas.join(" · ")} 유리창 · 외벽 청소 무료 출장 견적
            </p>

            <h1
              id="hero-title"
              className="mt-5 text-[2.1rem] leading-[1.2] font-extrabold sm:text-5xl lg:text-[3.25rem]"
            >
              닦고 나면
              <br />
              눈부시게{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">삐까번쩍</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm bg-brand sm:h-4"
                />
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              <strong className="font-bold text-ink">서울 · 경기 · 인천</strong> 전 지역을 직접
              출장하는{" "}
              <strong className="font-bold text-ink">
                유리창 청소 · 외벽 청소 · 간판 청소 · 어닝 청소
              </strong>{" "}
              전문 팀입니다. 건물 상태를 먼저 확인하고, 전문 장비와 친환경 세제로 안전하게 시공한 뒤
              결과를 사진으로 확인해 드립니다.
            </p>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <nav aria-label="제공 서비스">
              <ul className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-[0.85rem] font-semibold text-ink-soft transition-colors hover:border-brand-strong hover:bg-brand-tint hover:text-ink sm:text-sm"
                    >
                      <service.icon className="size-4 text-brand-deep" aria-hidden />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-nowrap xs:items-center">
              <Button
                href="/#contact"
                size="lg"
                className="xs:shrink-0 xs:whitespace-nowrap xs:px-5 xs:text-[0.95rem]"
              >
                무료 견적 문의
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button
                href={telHref}
                variant="ghost"
                size="lg"
                className="xs:shrink-0 xs:whitespace-nowrap xs:px-5 xs:text-[0.95rem]"
              >
                <Phone className="size-4" aria-hidden />
                {site.phone} 전화 상담
              </Button>
            </div>

            <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
              <ShieldCheck className="size-4 text-brand-deep" aria-hidden />
              출장비 없음 · 배상책임보험 가입 · {site.hours}
            </p>
          </div>
        </header>
      </div>

      <dl className="grid grid-cols-2 divide-line border-t border-line bg-white sm:grid-cols-4 sm:divide-x">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col border-b border-line px-3 py-4 text-center last:border-b-0 odd:border-r odd:border-line sm:border-b-0 sm:odd:border-r-0"
          >
            <dt className="order-2 mt-0.5 text-[0.72rem] text-ink-muted sm:text-xs">
              {stat.label}
            </dt>
            <dd className="order-1 text-lg font-extrabold sm:text-xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
