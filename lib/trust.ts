import {
  HardHat,
  Leaf,
  Ruler,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type TrustFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const trustFeatures: TrustFeature[] = [
  {
    title: "전문 장비",
    description:
      "순수 세척기, 고압세척기, 고소 작업 장비를 현장 조건에 맞춰 투입합니다.",
    icon: Wrench,
  },
  {
    title: "안전 작업",
    description:
      "안전 교육을 이수한 작업자가 2인 1조로 점검 후 시공하고 배상책임보험에 가입되어 있습니다.",
    icon: HardHat,
  },
  {
    title: "맞춤 서비스",
    description:
      "건물 자재와 오염 상태를 먼저 확인하고 구간별 시공 방법을 다르게 적용합니다.",
    icon: Ruler,
  },
  {
    title: "친환경 세제",
    description:
      "인체와 조경에 무해한 세정제를 사용해 거주 중인 건물도 안심하고 시공합니다.",
    icon: Leaf,
  },
];

/** 히어로 하단 지표 – 실제 수치로 교체하세요 */
export const stats = [
  { value: "2,400+", label: "누적 시공 현장" },
  { value: "10년", label: "현장 경력" },
  { value: "71개", label: "출장 가능 시 · 군 · 구" },
  { value: "24시간", label: "견적 상담 접수" },
] as const;
