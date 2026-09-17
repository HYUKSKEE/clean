import { services } from "./services";

export type PortfolioItem = {
  id: string;
  /** services.ts 의 slug 와 일치시켜 필터에 사용 */
  serviceSlug: string;
  title: string;
  location: string;
  description: string;
  /** 진행 시기 – 실제 시공일로 교체하세요 */
  period: string;
  image: string;
  imageAlt: string;
};

export const portfolio: PortfolioItem[] = [
  {
    id: "seoul-office-glass",
    serviceSlug: "window-cleaning",
    title: "12층 오피스 빌딩 전면 유리 청소",
    location: "서울 영등포구",
    description:
      "대로변 매연으로 얼룩진 전면 커튼월을 로프 작업으로 시공했습니다. 입주사 업무 방해를 피해 주말 2일에 나눠 진행했습니다.",
    period: "2025.04",
    image: "/images/portfolio/seoul-office-glass.svg",
    imageAlt: "서울 영등포구 오피스 빌딩 커튼월 유리창 청소 시공 사진",
  },
  {
    id: "gyeonggi-apt-glass",
    serviceSlug: "window-cleaning",
    title: "아파트 단지 세대 유리창 일괄 청소",
    location: "경기 화성시",
    description:
      "입주자 신청을 받아 320세대 외부 유리창과 방충망을 순차 시공했습니다. 철제 난간 간섭 구간까지 마감했습니다.",
    period: "2025.03",
    image: "/images/portfolio/gyeonggi-apt-glass.svg",
    imageAlt: "경기 화성시 아파트 단지 세대 유리창 청소 시공 사진",
  },
  {
    id: "incheon-wall-wash",
    serviceSlug: "exterior-wall",
    title: "해안 인접 상가 건물 외벽 고압세척",
    location: "인천 연수구",
    description:
      "염분과 분진으로 백화가 진행된 드라이비트 외벽을 자재 손상 없는 수압으로 세척했습니다. 조경 양생 후 진행했습니다.",
    period: "2025.05",
    image: "/images/portfolio/incheon-wall-wash.svg",
    imageAlt: "인천 연수구 상가 건물 외벽 고압세척 시공 사진",
  },
  {
    id: "seoul-mall-wall",
    serviceSlug: "exterior-wall",
    title: "복합 쇼핑몰 저층부 외벽 세척",
    location: "서울 송파구",
    description:
      "보행 동선이 많은 저층부를 야간에 구획별로 나눠 세척했습니다. 배수 경로를 별도로 확보해 매장 앞 물고임을 방지했습니다.",
    period: "2025.02",
    image: "/images/portfolio/seoul-mall-wall.svg",
    imageAlt: "서울 송파구 복합 쇼핑몰 저층부 외벽 청소 시공 사진",
  },
  {
    id: "gyeonggi-sign-clean",
    serviceSlug: "signage-awning",
    title: "프랜차이즈 매장 간판 · 어닝 세척",
    location: "경기 성남시",
    description:
      "채널 간판 내부 먼지와 어닝 곰팡이를 제거했습니다. 세척 후 LED 밝기가 눈에 띄게 회복됐습니다.",
    period: "2025.06",
    image: "/images/portfolio/gyeonggi-sign-clean.svg",
    imageAlt: "경기 성남시 프랜차이즈 매장 간판과 어닝 청소 시공 사진",
  },
  {
    id: "seoul-awning",
    serviceSlug: "signage-awning",
    title: "카페 거리 어닝 일괄 청소",
    location: "서울 마포구",
    description:
      "상인회 단체 신청으로 12개 매장 어닝을 하루에 정리했습니다. 개점 전 시간대에 맞춰 시공했습니다.",
    period: "2025.05",
    image: "/images/portfolio/seoul-awning.svg",
    imageAlt: "서울 마포구 카페 거리 어닝 청소 시공 사진",
  },
  {
    id: "incheon-film-removal",
    serviceSlug: "film-removal",
    title: "폐점 매장 시트지 · 광고물 제거",
    location: "인천 부평구",
    description:
      "10년 이상 부착돼 굳은 시트지와 접착 자국을 원상복구 기준에 맞춰 제거했습니다. 유리 스크래치 없이 마감했습니다.",
    period: "2025.01",
    image: "/images/portfolio/incheon-film-removal.svg",
    imageAlt: "인천 부평구 폐점 매장 유리 시트지 제거 시공 사진",
  },
  {
    id: "seoul-showroom-film",
    serviceSlug: "film-removal",
    title: "쇼룸 단열필름 교체 전 제거 작업",
    location: "서울 강남구",
    description:
      "신규 필름 부착을 위해 기존 단열필름을 전면 제거하고 유리면을 세척해 인계했습니다.",
    period: "2025.04",
    image: "/images/portfolio/seoul-showroom-film.svg",
    imageAlt: "서울 강남구 쇼룸 유리 단열필름 제거 시공 사진",
  },
  {
    id: "gyeonggi-maintenance",
    serviceSlug: "maintenance",
    title: "오피스 빌딩 분기 정기 관리",
    location: "경기 안양시",
    description:
      "분기마다 방문해 공용부 유리와 출입구 캐노피를 관리합니다. 방문 리포트를 관리사무소에 전달합니다.",
    period: "2024.09 ~ 진행 중",
    image: "/images/portfolio/gyeonggi-maintenance.svg",
    imageAlt: "경기 안양시 오피스 빌딩 정기 관리 시공 사진",
  },
];

/** 갤러리 필터 탭 – "전체" + 실제 사례가 있는 서비스만 노출 */
export const portfolioFilters = [
  { slug: "all", label: "전체" },
  ...services
    .filter((service) =>
      portfolio.some((item) => item.serviceSlug === service.slug),
    )
    .map((service) => ({ slug: service.slug, label: service.title })),
];
