/**
 * 브랜드 · 연락처 설정
 *
 * 실제 사업자 정보로 바꿀 때는 이 파일의 값만 수정하거나
 * .env.local 에 NEXT_PUBLIC_* 환경 변수를 넣으면 됩니다. (.env.example 참고)
 */

/**
 * NEXT_PUBLIC_* 는 반드시 process.env.NEXT_PUBLIC_XXX 형태로 그대로 읽어야 합니다.
 * (const env = process.env 처럼 별칭을 쓰면 빌드 시 값이 치환되지 않아
 *  브라우저에서 "process is not defined" 오류가 발생합니다.)
 */
export const site = {
  name: "삐까번쩍",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME ?? "삐까번쩍 클린서비스",
  tagline: "유리창 · 외벽 청소 전문",
  description:
    "서울 · 경기 · 인천 유리창 청소, 외벽 고압세척, 간판·어닝 청소, 시트지 제거, 정기 관리 전문 업체. 전문 장비와 친환경 세제로 안전하게 시공하고 무료 견적을 안내합니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ppikka-clean.example.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "010-0000-0000",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@ppikka-clean.kr",
  kakaoUrl: process.env.NEXT_PUBLIC_KAKAO_URL ?? "",
  address:
    process.env.NEXT_PUBLIC_ADDRESS ?? "서울특별시 강서구 공항대로 000, 0층 000호",
  businessNumber: process.env.NEXT_PUBLIC_BUSINESS_NUMBER ?? "000-00-00000",
  owner: process.env.NEXT_PUBLIC_OWNER ?? "홍길동",
  hours: "평일 · 주말 08:00 – 20:00 (연중무휴 상담)",
  areas: ["서울", "경기", "인천"],
  foundingYear: 2014,
} as const;

/** tel: 링크용 – 하이픈과 공백 제거 */
export const telHref = `tel:${site.phone.replace(/[^0-9+]/g, "")}`;

export const nav = [
  { label: "서비스 소개", href: "/#services" },
  { label: "시공 사례", href: "/#portfolio" },
  { label: "서비스 지역", href: "/#area" },
  { label: "FAQ", href: "/#faq" },
] as const;

/** 페이지 전역에서 재사용하는 대표 CTA 문구 */
export const primaryCta = {
  label: "무료 견적 문의",
  href: "/#contact",
} as const;
