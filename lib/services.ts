import {
  Building2,
  Eraser,
  SprayCan,
  Store,
  Sparkles,
  Tent,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  /** 카드에 노출되는 한 줄 설명 */
  summary: string;
  /** 상세 페이지 도입부 */
  description: string;
  icon: LucideIcon;
  /** public/images/services/*.svg → 실제 사진으로 교체하세요 */
  image: string;
  imageAlt: string;
  /** 시공 범위 · 특징 */
  highlights: string[];
  /** 주요 대상 건물 */
  targets: string[];
  /** 상세 페이지 SEO 키워드 */
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "window-cleaning",
    title: "유리창 청소",
    summary:
      "유리면의 물때와 유막을 걷어내 시야를 선명하게 되돌립니다.",
    description:
      "장기간 쌓인 물때와 유막, 미세먼지 얼룩은 일반 세척으로 지워지지 않습니다. 삐까번쩍은 유리 종류와 오염 상태를 먼저 확인한 뒤 전용 스퀴지와 순수(純水) 세척 장비로 얼룩 없이 마감합니다. 철제 난간이 간섭되는 구간, 고정창처럼 손이 닿지 않는 부분도 안전 장비를 사용해 시공합니다.",
    icon: Sparkles,
    image: "/images/services/window-cleaning.svg",
    imageAlt: "고층 건물 유리창을 스퀴지로 청소하는 모습",
    highlights: [
      "유리면 · 창틀 · 방충망 동시 시공",
      "철제 난간 간섭 구간, 고정창 대응",
      "물때 · 유막 · 페인트 잔여물 제거",
      "얼룩 없는 순수 세척 마감",
    ],
    targets: ["빌딩 · 오피스", "상가", "전원주택"],
    keywords: ["유리창 청소", "아파트 유리창 청소", "빌딩 유리창 청소", "창틀 청소"],
  },
  {
    slug: "exterior-wall",
    title: "외벽 청소",
    summary:
      "매연 · 백화 · 곰팡이로 얼룩진 건물 외벽을 고압세척으로 되살려 첫인상을 바꿉니다.",
    description:
      "외벽은 건물의 첫인상과 자산 가치를 좌우합니다. 삐까번쩍은 드라이비트, 노출 콘크리트, 석재, 알루미늄 패널 등 자재별로 수압과 세정제를 다르게 적용해 손상 없이 오염만 제거합니다. 작업 전 배수 경로와 주변 보호 양생을 먼저 계획해 입주자 불편을 최소화합니다.",
    icon: Building2,
    image: "/images/services/exterior-wall.svg",
    imageAlt: "고압세척기로 건물 외벽을 청소하는 작업자",
    highlights: [
      "자재별 수압 · 세정제 차등 적용",
      "매연 · 백화 · 이끼 · 곰팡이 제거",
      "작업 전 주변 양생 및 배수 처리",
      "고소 작업 안전 계획 수립 후 진행",
    ],
    targets: ["빌딩", "쇼핑몰", "공장 · 창고", "관공서"],
    keywords: ["외벽 청소", "건물 외벽 고압세척", "외벽 물청소", "빌딩 외벽 청소"],
  },
  {
    slug: "signage",
    title: "간판 청소",
    summary:
      "찌든 먼지와 벌레를 세척해 간판 조명 효율과 매장 첫인상을 함께 되살립니다.",
    description:
      "간판은 오염이 쌓이면 조명이 어두워지고 매장 신뢰도까지 떨어집니다. 아크릴 · 채널 · LED 간판은 표면 손상 없이 세척하고, 간판 내부 먼지와 벌레까지 정리합니다. 영업에 지장이 없도록 개점 전이나 마감 후 시공 일정을 조율합니다.",
    icon: Store,
    image: "/images/services/signage.svg",
    imageAlt: "상가 채널 간판을 세척하는 청소 작업 모습",
    highlights: [
      "아크릴 · 채널 · LED 간판 표면 안전 세척",
      "간판 내부 벌레 · 먼지 정리",
      "조명 효율 회복",
      "개점 전 · 마감 후 시간대 시공",
    ],
    targets: ["상가 · 매장", "프랜차이즈", "카페 · 음식점", "병원 · 학원"],
    keywords: ["간판 청소", "채널 간판 세척", "LED 간판 청소", "상가 간판 세척"],
  },
  {
    slug: "awning",
    title: "어닝 청소",
    summary:
      "곰팡이와 이끼로 얼룩진 어닝(천막)을 세척해 매장 외관을 깨끗하게 유지합니다.",
    description:
      "어닝은 비와 먼지가 쌓이면 곰팡이와 이끼가 번지기 쉽습니다. 원단 손상 없이 전용 세정제로 오염을 분해해 제거하고, 개점 전이나 마감 후 시간에 맞춰 시공합니다.",
    icon: Tent,
    image: "/images/services/awning.svg",
    imageAlt: "상가 어닝(천막)을 세척하는 청소 작업 모습",
    highlights: [
      "어닝 곰팡이 · 이끼 · 물때 제거",
      "원단 손상 없는 전용 세정",
      "매장 외관 · 그늘막 청결 유지",
      "개점 전 · 마감 후 시간대 시공",
    ],
    targets: ["카페 · 음식점", "상가 · 매장", "프랜차이즈", "테라스 매장"],
    keywords: ["어닝 청소", "천막 청소", "어닝 곰팡이 제거", "상가 어닝 세척"],
  },
  {
    slug: "film-removal",
    title: "시트지 제거",
    summary:
      "오래 붙어 굳은 시트지와 접착 자국을 스크래치 없이 걷어내 원상 복구합니다.",
    description:
      "폐점 원상복구, 매장 리뉴얼, 필름 교체 전에는 기존 시트지를 깨끗하게 제거해야 합니다. 열과 전용 리무버로 접착층을 연화시킨 뒤 유리와 프레임에 상처가 나지 않도록 단계적으로 작업합니다. 제거 후 잔여 접착제까지 세척하고 유리면을 다시 마감합니다.",
    icon: Eraser,
    image: "/images/services/film-removal.svg",
    imageAlt: "유리창에 붙은 시트지를 제거하는 작업 모습",
    highlights: [
      "굳은 시트지 · 단열필름 · 광고물 제거",
      "잔여 접착제 세척까지 마감",
      "유리 · 프레임 스크래치 방지 시공",
      "폐점 원상복구 · 리뉴얼 일정 대응",
    ],
    targets: ["상가 · 매장", "오피스", "쇼룸", "아파트 상가"],
    keywords: ["시트지 제거", "썬팅 제거", "유리 필름 제거", "원상복구 청소"],
  },
  {
    slug: "specialized-cleaning",
    title: "특수 청소",
    summary:
      "채광창 · 기름때 · 공사 분진처럼 일반 세척으로 부족한 오염을 현장 맞춤 약품과 장비로 제거합니다.",
    description:
      "채광창 녹조, 주방 기름때, 공사 후 분진, 그을음처럼 일반 고압세척만으로는 부족한 현장이 있습니다. 삐까번쩍은 오염 종류를 먼저 확인한 뒤 자재에 맞는 약품과 장비로 주변 손상을 막고 오염만 분해해 제거합니다.",
    icon: SprayCan,
    image: "/images/services/specialized-cleaning.svg",
    imageAlt: "채광창과 특수 오염면을 세척하는 청소 작업 모습",
    highlights: [
      "채광창 · 천장 유리 녹조 · 물때 제거",
      "기름때 · 그을음 · 공사 분진 대응",
      "자재별 약품 · 장비 맞춤 시공",
      "작업 전 주변 양생 및 잔여물 회수",
    ],
    targets: ["주택 · 타운하우스", "음식점 주방", "공사 직후 현장", "공장 · 창고"],
    keywords: ["특수 청소", "채광창 청소", "기름때 제거", "공사후 청소"],
  },
];

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);

/** 문의 폼 · 필터에서 사용하는 서비스 이름 목록 */
export const serviceTitles = services.map((service) => service.title);
