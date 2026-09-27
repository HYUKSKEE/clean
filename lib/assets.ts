/**
 * 정적 에셋 경로
 *
 *   public/assets/logo/logo.svg          로고 · 심볼
 *   public/assets/hero/01.png            메인 배경 슬라이드 (숫자 인덱스가 순서)
 *   public/assets/hero/background.*      슬라이드 뒤 커버 배경 (슬라이드에 포함하지 않음)
 *   public/assets/before-after/<슬러그>/ 전후 비교
 *
 * 전후 사진 폴더명은 lib/services.ts 의 slug 와 같은 kebab-case 입니다.
 * 파일명은 before · after 이고 확장자는 제한이 없습니다.
 */

export const logoAssetRoot = "/assets/logo";
export const heroAssetRoot = "/assets/hero";
export const beforeAfterAssetRoot = "/assets/before-after";

export type HeroSlide = {
  src: string;
  alt: string;
  /** 파일명 앞 숫자. 01.png → 1 */
  index: number;
};

export const beforeAfterSrc = (
  slug: string,
  side: "before" | "after",
  ext = "jpg",
) => `${beforeAfterAssetRoot}/${slug}/${side}.${ext.replace(/^\./, "")}`;

const nextOptimizedExts = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "avif",
  "gif",
  "svg",
]);

/** next/image 가 변환하지 못하는 확장자는 원본 그대로 보여줍니다. */
export const isNextOptimizedImage = (src: string) => {
  const ext = src.split(".").pop()?.toLowerCase() ?? "";
  return nextOptimizedExts.has(ext);
};
