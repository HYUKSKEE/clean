import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/services";
import { site, telHref } from "@/lib/site";
import { stats } from "@/lib/trust";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line" aria-labelledby="hero-title">
      {/* 배경 포인트 – 노란색은 넓게 쓰지 않고 은은하게만 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-24 size-[26rem] rounded-full bg-brand-soft/70 blur-3xl"
      />

      <div className="container-page relative grid gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-bold text-ink-soft sm:text-sm">
            <MapPin className="size-4 text-brand-deep" aria-hidden />
            {site.areas.join(" · ")} 전 지역 무료 출장 견적
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-[2.1rem] leading-[1.2] font-extrabold sm:text-5xl lg:text-[3.5rem]"
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

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            유리창 · 외벽 · 간판까지 <strong className="font-bold text-ink">건물 외부 청소</strong>만
            집중해 온 전문 팀입니다. 건물 상태를 먼저 확인하고, 전문 장비와 친환경 세제로 안전하게
            시공한 뒤 결과를 사진으로 확인해 드립니다.
          </p>

          {/* 첫 화면에서 제공 서비스를 바로 파악할 수 있도록 노출 */}
          <ul className="mt-7 flex flex-wrap gap-2">
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

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/#contact" size="lg">
              무료 견적 문의
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href={telHref} variant="ghost" size="lg">
              <Phone className="size-4" aria-hidden />
              {site.phone} 전화 상담
            </Button>
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
            <ShieldCheck className="size-4 text-brand-deep" aria-hidden />
            출장비 없음 · 배상책임보험 가입 · {site.hours}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <Image
              src="/images/hero-main.svg"
              alt="삐까번쩍 작업자가 고층 건물 유리창을 스퀴지로 청소하는 모습"
              width={1000}
              height={800}
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>

          {/* 시공 현황 요약 – 실제 수치는 lib/trust.ts 에서 수정 */}
          <dl className="mt-4 grid grid-cols-2 divide-line overflow-hidden rounded-2xl border border-line bg-white sm:grid-cols-4 sm:divide-x">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-line px-3 py-4 text-center last:border-b-0 odd:border-r odd:border-line sm:border-b-0 sm:odd:border-r-0"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-lg font-extrabold sm:text-xl">{stat.value}</span>
                  <span className="mt-0.5 block text-[0.72rem] text-ink-muted sm:text-xs">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
