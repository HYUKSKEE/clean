import { existsSync, readdirSync } from "node:fs";
import { join, parse } from "node:path";
import { servicePhotoRoot } from "./assets";

export type ServicePhotoPair = {
  index: number;
  before?: string;
  after?: string;
};

export type ServicePhotos = {
  /** 1-1 */
  before?: string;
  /** 1-2 */
  after?: string;
  pairs: ServicePhotoPair[];
};

const imageExts = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
]);

const pairName = /^(\d+)-(1|2)$/i;

type Slot = { src: string; isSvg: boolean };

const betterSlot = (current: Slot | undefined, next: Slot) => {
  if (!current) return next;
  if (current.isSvg && !next.isSvg) return next;
  return current;
};

export const getServicePhotos = (slug: string): ServicePhotos => {
  const dir = join(process.cwd(), "public", "assets", "services", slug);
  if (!existsSync(dir)) return { pairs: [] };

  const byIndex = new Map<number, { before?: Slot; after?: Slot }>();

  for (const name of readdirSync(dir)) {
    const { name: fileName, ext } = parse(name);
    const match = fileName.match(pairName);
    if (!match || !imageExts.has(ext.toLowerCase())) continue;

    const index = Number(match[1]);
    const side = match[2] === "1" ? "before" : "after";
    const slot: Slot = {
      src: `${servicePhotoRoot}/${slug}/${name}`,
      isSvg: ext.toLowerCase() === ".svg",
    };

    const pair = byIndex.get(index) ?? {};
    pair[side] = betterSlot(pair[side], slot);
    byIndex.set(index, pair);
  }

  const pairs = [...byIndex.entries()]
    .sort(([a], [b]) => a - b)
    .flatMap(([index, pair]) => {
      const before = pair.before?.src;
      const after = pair.after?.src;
      if (!before && !after) return [];
      return [{ index, before, after }];
    });

  const first = pairs.find((pair) => pair.index === 1);

  return {
    before: first?.before,
    after: first?.after,
    pairs,
  };
};
