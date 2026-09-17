export type BeforeAfterCase = {
  id: string;
  label: string;
  location: string;
  description: string;
  /** 실제 시공 사진으로 교체 – 두 이미지는 동일한 비율(4:3)을 권장합니다 */
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
};

export const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: "glass",
    label: "유리창 청소",
    location: "서울 영등포구 오피스 빌딩",
    description:
      "대로변 매연과 물때로 흐려진 커튼월. 순수 세척 후 얼룩 없이 조망이 회복됐습니다.",
    beforeImage: "/images/before-after/glass-before.svg",
    afterImage: "/images/before-after/glass-after.svg",
    beforeAlt: "청소 전: 물때와 매연으로 흐려진 오피스 빌딩 유리창",
    afterAlt: "청소 후: 얼룩 없이 투명해진 오피스 빌딩 유리창",
  },
  {
    id: "wall",
    label: "외벽 청소",
    location: "인천 연수구 상가 건물",
    description:
      "염분과 분진으로 백화가 진행된 외벽. 자재에 맞춘 수압으로 오염만 제거했습니다.",
    beforeImage: "/images/before-after/wall-before.svg",
    afterImage: "/images/before-after/wall-after.svg",
    beforeAlt: "청소 전: 백화와 이끼로 얼룩진 건물 외벽",
    afterAlt: "청소 후: 고압세척으로 깨끗해진 건물 외벽",
  },
  {
    id: "sign",
    label: "간판 · 어닝",
    location: "경기 성남시 프랜차이즈 매장",
    description:
      "먼지가 쌓여 어두워진 채널 간판과 곰팡이가 번진 어닝을 함께 세척했습니다.",
    beforeImage: "/images/before-after/sign-before.svg",
    afterImage: "/images/before-after/sign-after.svg",
    beforeAlt: "청소 전: 먼지와 곰팡이로 오염된 매장 간판과 어닝",
    afterAlt: "청소 후: 세척으로 선명해진 매장 간판과 어닝",
  },
];
