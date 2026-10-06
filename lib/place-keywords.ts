import type { ServicePlace } from "@/lib/areas";
import placeAliases from "@/data/place-aliases.json";

/**
 * 지역명 검색 변형.
 * `고양 덕양구` 하나만 있으면
 * 고양시 / 경기 고양 / 경기도고양시덕양구 처럼 띄어쓰기·시군 접미를 만듭니다.
 * 엑셀 지역 키워드는 data/place-aliases.json 에서 해당 구·시 메타에 넣습니다.
 */

const unique = (values: string[]) => [
  ...new Set(values.map((value) => value.trim()).filter(Boolean)),
];

const spacedAndGlued = (value: string) => unique([value, value.replace(/\s+/g, "")]);

const REGION_TITLES: Record<string, string[]> = {
  서울: ["서울", "서울시", "서울특별시"],
  인천: ["인천", "인천시", "인천광역시"],
  경기: ["경기", "경기도"],
};

const GUN_CITIES = new Set(["가평", "양평", "연천", "옹진", "강화"]);
const NICKNAMES = new Set(["분당", "일산", "송도", "영종도"]);

const cityBase = (name: string) =>
  name.replace(/도$/, "").replace(/[시군]$/, "") || name;

const officialCity = (base: string) => {
  if (NICKNAMES.has(base) || base.endsWith("도")) return base;
  if (GUN_CITIES.has(base) || base.endsWith("군")) return `${cityBase(base)}군`;
  if (base.endsWith("구") || base.endsWith("시")) return base;
  return `${base}시`;
};

const prefixWithRegion = (
  regionName: string,
  shortLocals: string[],
  officialLocals: string[],
) => {
  const titles = REGION_TITLES[regionName] ?? [regionName];
  const stems: string[] = [];

  for (const title of titles) {
    const locals =
      regionName === "경기" && title === "경기도" ? officialLocals : shortLocals;

    for (const local of locals) {
      stems.push(...spacedAndGlued(`${title} ${local}`));
    }
  }

  return stems;
};

const localStems = (label: string) => {
  const parts = label.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    const city = cityBase(parts[0]);
    const district = parts.slice(1).join(" ");
    const official = officialCity(city);

    return {
      short: unique([city, `${city} ${district}`]),
      official: unique([official, `${official} ${district}`]),
    };
  }

  const token = parts[0] ?? label;

  if (token.endsWith("구")) {
    return { short: [token], official: [token] };
  }

  const isIsland = token.endsWith("도") && token !== "경기도";
  const base = isIsland ? token.replace(/도$/, "") : cityBase(token);
  const official = officialCity(isIsland ? token : base);

  return {
    short: unique([base, token]),
    official: unique([official]),
  };
};

export const aliasesForPlace = (slug: string) =>
  (placeAliases as Record<string, string[]>)[slug] ?? [];

export const placeKeywordStems = (place: Pick<ServicePlace, "label" | "regionName">) => {
  if (place.label.endsWith(" 전체")) {
    return unique(REGION_TITLES[place.regionName] ?? [place.regionName]);
  }

  const locals = localStems(place.label);

  return unique([
    ...locals.short.flatMap(spacedAndGlued),
    ...locals.official.flatMap(spacedAndGlued),
    ...prefixWithRegion(place.regionName, locals.short, locals.official),
  ]);
};

export const placeServiceKeywords = (
  place: Pick<ServicePlace, "slug" | "label" | "regionName">,
  serviceKeywords: readonly string[],
) => {
  const stems = placeKeywordStems(place);
  const regionKeywords = aliasesForPlace(place.slug);
  const primary = serviceKeywords[0];

  return unique([
    ...stems,
    ...regionKeywords,
    ...stems.flatMap((stem) =>
      serviceKeywords.map((keyword) => `${stem} ${keyword}`),
    ),
    ...(primary
      ? regionKeywords.map((keyword) => `${keyword} ${primary}`)
      : []),
  ]);
};
