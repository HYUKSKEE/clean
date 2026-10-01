import { existsSync, readdirSync } from "node:fs";
import { join, parse } from "node:path";
import { beforeAfterAssetRoot, beforeAfterSrc } from "./assets";
import { services } from "./services";

export type BeforeAfterCase = {
  /** services.ts 의 slug 와 같고, assets 폴더명과 일치해야 합니다 */
  id: string;
  label: string;
  location: string;
  description: string;
  beforeAlt: string;
  afterAlt: string;
};

export type ResolvedBeforeAfterCase = BeforeAfterCase & {
  beforeImage: string;
  afterImage: string;
};

const cases: BeforeAfterCase[] = [
  {
    id: "exterior-wall",
    label: "외벽 청소",
    location: "인천 연수구 상가 건물",
    description:
      "염분과 분진으로 백화가 진행된 외벽. 자재에 맞춘 수압으로 오염만 제거했습니다.",
    beforeAlt: "청소 전: 백화와 이끼로 얼룩진 건물 외벽",
    afterAlt: "청소 후: 고압세척으로 깨끗해진 건물 외벽",
  },
  {
    id: "film-removal",
    label: "시트지 제거",
    location: "인천 부평구 폐점 매장",
    description:
      "오래 붙어 굳은 시트지와 접착 자국을 스크래치 없이 걷어내고 유리면을 다시 마감했습니다.",
    beforeAlt: "청소 전: 유리면에 굳어 붙은 시트지와 접착 자국",
    afterAlt: "청소 후: 시트지를 제거하고 원상 복구한 유리면",
  },
  {
    id: "window-cleaning",
    label: "유리창 청소",
    location: "서울 영등포구 오피스 빌딩",
    description:
      "대로변 매연과 물때로 흐려진 커튼월. 순수 세척 후 얼룩 없이 조망이 회복됐습니다.",
    beforeAlt: "청소 전: 물때와 매연으로 흐려진 오피스 빌딩 유리창",
    afterAlt: "청소 후: 얼룩 없이 투명해진 오피스 빌딩 유리창",
  },
  {
    id: "signage",
    label: "간판 청소",
    location: "경기 성남시 프랜차이즈 매장",
    description:
      "먼지가 쌓여 어두워진 채널 간판을 세척했습니다. 내부 먼지까지 정리한 뒤 LED 밝기가 회복됐습니다.",
    beforeAlt: "청소 전: 먼지로 어두워진 매장 채널 간판",
    afterAlt: "청소 후: 세척으로 선명해진 매장 채널 간판",
  },
  {
    id: "awning",
    label: "어닝 청소",
    location: "서울 마포구 카페 거리",
    description:
      "곰팡이와 이끼가 번진 어닝을 원단 손상 없이 세척해 매장 테라스 외관을 되살렸습니다.",
    beforeAlt: "청소 전: 곰팡이와 이끼로 오염된 매장 어닝",
    afterAlt: "청소 후: 세척으로 깨끗해진 매장 어닝",
  },
  {
    id: "specialized-cleaning",
    label: "특수 청소",
    location: "경기 주택 채광창",
    description:
      "녹조와 물때가 낀 채광창을 특수 세정으로 세척했습니다. 천장 유리면의 시야가 다시 열렸습니다.",
    beforeAlt: "청소 전: 녹조와 물때로 흐려진 주택 채광창",
    afterAlt: "청소 후: 특수 세정으로 맑아진 주택 채광창",
  },
];

const assetDir = (...parts: string[]) =>
  join(process.cwd(), "public", "assets", "before-after", ...parts);

const findExistingSrc = (slug: string, side: "before" | "after") => {
  const dir = assetDir(slug);
  if (!existsSync(dir)) return beforeAfterSrc(slug, side, "jpg");

  const matches = readdirSync(dir).filter((name) => {
    const { name: fileName, ext } = parse(name);
    return fileName.toLowerCase() === side && ext.length > 1;
  });

  if (matches.length === 0) return beforeAfterSrc(slug, side, "jpg");

  // 실제 사진이 있으면 svg 플레이스홀더보다 먼저 씁니다.
  const preferred =
    matches.find((name) => parse(name).ext.toLowerCase() !== ".svg") ??
    matches[0];

  return `${beforeAfterAssetRoot}/${slug}/${preferred}`;
};

const serviceTitle = (slug: string) =>
  services.find((service) => service.slug === slug)?.title ?? slug;

/** 폴더의 before.* / after.* 를 찾아 URL 을 만듭니다. 확장자는 제한하지 않습니다. */
export const getBeforeAfterCases = (): ResolvedBeforeAfterCase[] =>
  cases.map((item) => ({
    ...item,
    label: item.label || serviceTitle(item.id),
    beforeImage: findExistingSrc(item.id, "before"),
    afterImage: findExistingSrc(item.id, "after"),
  }));

/** 서버에서 한 번 읽어 두고 스키마·페이지에서 같이 씁니다. */
export const beforeAfterCases = getBeforeAfterCases();
