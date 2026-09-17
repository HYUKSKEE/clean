import {
  Building2,
  CalendarCheck,
  Eraser,
  Store,
  Sparkles,
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
      "고층 아파트부터 빌딩 유리면까지, 물때와 유막을 걷어내 시야를 선명하게 되돌립니다.",
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
    targets: ["아파트", "빌딩 · 오피스", "상가", "전원주택 · 타운하우스"],
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
    slug: "signage-awning",
    title: "간판 및 어닝 청소",
    summary:
      "찌든 먼지와 곰팡이를 세척해 간판 조명 효율과 매장 외관을 함께 되살립니다.",
    description:
      "간판은 오염이 쌓이면 조명이 어두워지고 매장 신뢰도까지 떨어집니다. 아크릴 · 채널 · LED 간판은 표면 손상 없이 세척하고, 어닝(천막)은 곰팡이와 이끼를 전용 세정제로 분해해 제거합니다. 영업에 지장이 없도록 개점 전이나 마감 후 시공 일정을 조율합니다.",
    icon: Store,
    image: "/images/services/signage-awning.svg",
    imageAlt: "상가 간판과 어닝을 세척하는 청소 작업 모습",
    highlights: [
      "아크릴 · 채널 · LED 간판 표면 안전 세척",
      "어닝 곰팡이 · 이끼 · 물때 제거",
      "간판 내부 벌레 · 먼지 정리",
      "개점 전 · 마감 후 시간대 시공",
    ],
    targets: ["상가 · 매장", "프랜차이즈", "카페 · 음식점", "병원 · 학원"],
    keywords: ["간판 청소", "어닝 청소", "천막 청소", "상가 간판 세척"],
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
    slug: "maintenance",
    title: "정기 관리",
    summary:
      "건물 규모와 오염 주기에 맞춰 월 · 분기 단위로 방문해 깨끗한 상태를 유지합니다.",
    description:
      "한 번의 대청소보다 주기적인 관리가 비용과 상태 모두에서 유리합니다. 건물 위치, 유리면 면적, 주변 환경(도로 · 공사장 · 해안)을 고려해 적정 주기를 제안하고, 방문마다 작업 내역과 사진을 정리해 전달합니다. 담당 팀이 고정되어 건물 특성을 계속 반영합니다.",
    icon: CalendarCheck,
    image: "/images/services/maintenance.svg",
    imageAlt: "정기 관리 일정에 맞춰 건물을 점검하는 청소 담당자",
    highlights: [
      "월 · 분기 · 반기 주기 맞춤 설계",
      "고정 담당 팀 배정",
      "방문별 작업 리포트 · 사진 제공",
      "연간 계약 시 견적 조정",
    ],
    targets: ["아파트 단지", "오피스 빌딩", "상가 건물", "관공서 · 학교"],
    keywords: ["정기 청소", "건물 정기 관리", "유리창 정기 청소", "청소 연간 계약"],
  },
];

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);

/** 문의 폼 · 필터에서 사용하는 서비스 이름 목록 */
export const serviceTitles = services.map((service) => service.title);
