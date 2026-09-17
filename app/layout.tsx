import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { site } from "@/lib/site";
import { jsonLd, localBusinessSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | 서울 · 경기 · 인천 유리창 · 외벽 청소 전문`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "유리창 청소",
    "외벽 청소",
    "간판 청소",
    "어닝 청소",
    "시트지 제거",
    "건물 정기 관리",
    "서울 유리창 청소",
    "경기 외벽 청소",
    "인천 유리창 청소",
    "삐까번쩍",
  ],
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    title: `${site.name} | 서울 · 경기 · 인천 유리창 · 외벽 청소 전문`,
    description: site.description,
    url: "/",
    images: [
      {
        // 실제 홍보 이미지(1200x630)로 교체하세요.
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} 유리창 · 외벽 청소 서비스 안내`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | 유리창 · 외벽 청소 전문`,
    description: site.description,
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#facc15",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      {/* 모바일 하단 고정 CTA 바(약 68px) 높이만큼 아래 여백을 확보해 푸터가 가려지지 않게 합니다. */}
      <body className="flex min-h-dvh flex-col pb-[4.5rem] lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
        >
          본문으로 바로 이동
        </a>

        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
        <MobileCallBar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(localBusinessSchema)}
        />

        {/* Vercel Analytics – 배포 환경에서만 데이터를 전송합니다. */}
        <Analytics />
      </body>
    </html>
  );
}
