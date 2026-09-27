import { existsSync, readdirSync } from "node:fs";
import { join, parse } from "node:path";
import { heroAssetRoot, logoAssetRoot, type HeroSlide } from "./assets";

const imageExts = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
]);

const publicDir = (...parts: string[]) => join(process.cwd(), "public", ...parts);

/** 폴더의 이미지를 이름순으로 읽습니다. 실제 사진이 있으면 svg 플레이스홀더는 건너뜁니다. */
export const listAssetImages = (folder: string, urlRoot: string) => {
  const dir = publicDir(...folder.split("/").filter(Boolean));
  if (!existsSync(dir)) return [];

  const files = readdirSync(dir).filter((name) => {
    const { ext } = parse(name);
    return ext.length > 1 && imageExts.has(ext.toLowerCase());
  });

  const photos = files.filter((name) => parse(name).ext.toLowerCase() !== ".svg");
  const used = photos.length > 0 ? photos : files;

  return used
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((name) => `${urlRoot}/${name}`);
};

/** public/assets/logo/logo.* 를 우선하고, 없으면 폴더의 첫 이미지를 씁니다. */
export const getLogoSrc = () => {
  const images = listAssetImages("assets/logo", logoAssetRoot);
  return (
    images.find((src) => /\/logo\./i.test(src)) ??
    images.find((src) => /\/mark\./i.test(src)) ??
    images[0] ??
    ""
  );
};

const heroIndex = (filename: string) => {
  const match = parse(filename).name.match(/^(\d+)/);
  return match ? Number(match[1]) : null;
};

/** public/assets/hero/background.* — 슬라이드가 아닌 뒤 배경. */
export const getHeroBackground = () => {
  const dir = publicDir("assets", "hero");
  if (!existsSync(dir)) return "";

  const files = readdirSync(dir).flatMap((name) => {
    const { name: base, ext } = parse(name);
    const lowerExt = ext.toLowerCase();
    if (base.toLowerCase() !== "background" || !imageExts.has(lowerExt)) return [];
    return [{ name, isSvg: lowerExt === ".svg" }];
  });

  const photo = files.find((file) => !file.isSvg) ?? files[0];
  return photo ? `${heroAssetRoot}/${photo.name}` : "";
};

/** public/assets/hero/ 의 숫자 인덱스(01, 02, …) 순서대로 슬라이드를 만듭니다. */
export const getHeroSlides = (): HeroSlide[] => {
  const dir = publicDir("assets", "hero");
  if (!existsSync(dir)) return [];

  const files = readdirSync(dir).flatMap((name) => {
    const ext = parse(name).ext.toLowerCase();
    const index = heroIndex(name);
    if (!ext || !imageExts.has(ext) || index === null) return [];
    return [{ name, index, isSvg: ext === ".svg" }];
  });

  const photos = files.filter((file) => !file.isSvg);
  const pool = photos.length > 0 ? photos : files;
  const byIndex = new Map<number, (typeof pool)[number]>();

  for (const file of pool.sort((a, b) => a.index - b.index || a.name.localeCompare(b.name))) {
    if (!byIndex.has(file.index)) byIndex.set(file.index, file);
  }

  return [...byIndex.values()].map((file) => ({
    src: `${heroAssetRoot}/${file.name}`,
    index: file.index,
    alt: `삐까번쩍 청소 현장 사진 ${file.index}`,
  }));
};
