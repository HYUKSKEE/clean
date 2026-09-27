/**
 * 저작권 문제가 없는 플레이스홀더 이미지(SVG) 생성 스크립트
 *
 *   npm run images
 *
 * 실제 시공 사진을 받으면
 *   - 로고: public/assets/logo/logo.png (또는 logo.svg)
 *   - 메인 배경: public/assets/hero/01.jpg, 02.jpg, …
 *   - 전후 비교: public/assets/before-after/<서비스-슬러그>/before.jpg, after.jpg
 *     jpg · webp · png 가 있으면 그걸 쓰고, 생성 스크립트도 덮어쓰지 않습니다.
 *   - 그 외: public/images 아래 같은 경로·같은 파일명으로 덮어씁니다.
 */

import { existsSync, readdirSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, parse } from "node:path";

const OUT = join(process.cwd(), "public", "images");
const LOGO_OUT = join(process.cwd(), "public", "assets", "logo");
const HERO_OUT = join(process.cwd(), "public", "assets", "hero");
const BEFORE_AFTER_OUT = join(process.cwd(), "public", "assets", "before-after");

const BRAND = "#facc15";
const INK = "#111827";

/** 시드 기반 난수 – 실행할 때마다 같은 결과가 나오도록 */
const rng = (seed) => {
  let s = [...String(seed)].reduce((a, c) => a + c.charCodeAt(0), 7);
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
};

const windows = (rand, { x, y, w, h, cols, rows, dirty }) => {
  const gapX = w / cols;
  const gapY = h / rows;
  const pad = Math.min(gapX, gapY) * 0.16;
  let out = "";

  for (let c = 0; c < cols; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      const wx = x + c * gapX + pad;
      const wy = y + r * gapY + pad;
      const ww = gapX - pad * 2;
      const wh = gapY - pad * 2;
      const tone = dirty ? 0.32 + rand() * 0.3 : 0.55 + rand() * 0.4;
      const fill = dirty
        ? `rgba(120,113,108,${tone})`
        : `rgba(186,230,253,${tone})`;

      out += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${ww.toFixed(1)}" height="${wh.toFixed(1)}" rx="3" fill="${fill}" stroke="rgba(17,24,39,.14)" stroke-width="1.2"/>`;

      if (!dirty && rand() > 0.45) {
        // 유리에 비치는 빛 반사
        out += `<path d="M${(wx + ww * 0.12).toFixed(1)} ${(wy + wh * 0.88).toFixed(1)}L${(wx + ww * 0.72).toFixed(1)} ${(wy + wh * 0.1).toFixed(1)}h${(ww * 0.16).toFixed(1)}L${(wx + ww * 0.28).toFixed(1)} ${(wy + wh * 0.9).toFixed(1)}z" fill="rgba(255,255,255,.5)"/>`;
      }

      if (dirty && rand() > 0.35) {
        // 흘러내린 물때 자국
        out += `<path d="M${(wx + ww * rand() * 0.8).toFixed(1)} ${wy.toFixed(1)}v${(wh * (0.4 + rand() * 0.5)).toFixed(1)}" stroke="rgba(87,83,78,.45)" stroke-width="${(2 + rand() * 3).toFixed(1)}" stroke-linecap="round"/>`;
      }
    }
  }
  return out;
};

const grime = (rand, { w, h, amount }) => {
  let out = "";
  for (let i = 0; i < amount; i += 1) {
    const cx = rand() * w;
    const cy = h * 0.15 + rand() * h * 0.85;
    const r = 26 + rand() * 90;
    const green = rand() > 0.6;
    out += `<ellipse cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" rx="${r.toFixed(0)}" ry="${(r * 0.66).toFixed(0)}" fill="${green ? "rgba(101,113,60,.20)" : "rgba(120,93,60,.22)"}"/>`;
  }
  return out;
};

/**
 * @param {object} opts
 * @param {"clean"|"dirty"} opts.state
 */
const facade = ({
  seed,
  w = 800,
  h = 600,
  state = "clean",
  caption = "",
  badge = "",
  accent = "glass",
}) => {
  const rand = rng(seed);
  const dirty = state === "dirty";
  const sky = dirty
    ? ["#d6d3d1", "#e7e5e4"]
    : ["#dbeafe", "#fffdf7"];
  const wall = dirty ? "#a8a29e" : "#e7e5e4";
  const wall2 = dirty ? "#8f8a86" : "#d4d4d8";

  // 시드마다 건물 구성을 다르게 만들어 카드가 서로 비슷해 보이지 않도록 합니다.
  const towers = [];
  let cursor = w * (0.01 + rand() * 0.05);
  const count = 3 + Math.floor(rand() * 2);
  for (let i = 0; i < count && cursor < w * 0.94; i += 1) {
    const tw = w * (0.17 + rand() * 0.15);
    const top = h * (0.08 + rand() * 0.36);
    towers.push({
      x: cursor,
      y: top,
      w: tw,
      h: h - top,
      cols: Math.max(2, Math.round(tw / (w * 0.078))),
      rows: Math.max(3, Math.round((h - top) / (h * 0.12))),
    });
    cursor += tw + w * (0.01 + rand() * 0.02);
  }
  // 오른쪽 끝이 비면 마지막 건물을 늘려 여백을 메웁니다.
  const last = towers[towers.length - 1];
  if (last.x + last.w < w * 0.96) last.w = w - last.x - w * 0.02;

  const tones = dirty ? ["#a8a29e", "#8f8a86", "#9c9691"] : [wall, wall2, "#dcdcdf"];

  let body = "";
  towers.forEach((t, i) => {
    body += `<rect x="${t.x.toFixed(0)}" y="${t.y.toFixed(0)}" width="${t.w.toFixed(0)}" height="${t.h.toFixed(0)}" rx="6" fill="${tones[i % tones.length]}"/>`;
    body += windows(rand, { ...t, dirty });
  });

  if (dirty) body += grime(rand, { w, h, amount: 9 });

  let accents = "";
  if (accent === "squeegee" && !dirty) {
    // 스퀴지가 지나간 자리 – 유리가 맑아지는 대각선
    accents += `<path d="M${w * 0.36} ${h * 0.14}L${w * 0.62} ${h * 0.14}L${w * 0.62} ${h} L${w * 0.36} ${h}Z" fill="rgba(255,255,255,.28)"/>`;
    accents += `<rect x="${w * 0.34}" y="${h * 0.46}" width="${w * 0.3}" height="10" rx="5" fill="${BRAND}"/>`;
    accents += `<rect x="${w * 0.46}" y="${h * 0.46}" width="9" height="${h * 0.3}" rx="4.5" fill="${INK}" opacity=".75"/>`;
  }
  if (accent === "spray") {
    for (let i = 0; i < 26; i += 1) {
      accents += `<circle cx="${(w * 0.2 + rand() * w * 0.6).toFixed(0)}" cy="${(h * 0.3 + rand() * h * 0.6).toFixed(0)}" r="${(1.5 + rand() * 4).toFixed(1)}" fill="rgba(255,255,255,.75)"/>`;
    }
    accents += `<rect x="${w * 0.08}" y="${h * 0.62}" width="${w * 0.16}" height="12" rx="6" fill="${BRAND}"/>`;
  }
  if (accent === "sign") {
    accents += `<rect x="${w * 0.16}" y="${h * 0.56}" width="${w * 0.68}" height="${h * 0.16}" rx="8" fill="${dirty ? "#78716c" : BRAND}"/>`;
    accents += `<path d="M${w * 0.16} ${h * 0.74}h${w * 0.68}l-${w * 0.06} ${h * 0.12}h-${w * 0.56}z" fill="${dirty ? "#57534e" : "#fde68a"}"/>`;
  }

  const badgeSvg = badge
    ? `<g><rect x="24" y="24" width="${badge.length * 13 + 34}" height="40" rx="20" fill="${badge === "BEFORE" ? "rgba(17,24,39,.82)" : BRAND}"/><text x="${44}" y="50" font-family="system-ui, sans-serif" font-size="17" font-weight="700" fill="${badge === "BEFORE" ? "#ffffff" : INK}">${badge}</text></g>`
    : "";

  const captionSvg = caption
    ? `<g><rect x="0" y="${h - 62}" width="${w}" height="62" fill="rgba(17,24,39,.62)"/><text x="28" y="${h - 24}" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="#ffffff">${caption}</text></g>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#sky)"/>
${!dirty ? `<circle cx="${(w * (0.62 + rand() * 0.28)).toFixed(0)}" cy="${(h * (0.08 + rand() * 0.1)).toFixed(0)}" r="${(h * (0.06 + rand() * 0.04)).toFixed(0)}" fill="${BRAND}" opacity=".55"/>` : ""}
${body}
${accents}
${badgeSvg}
${captionSvg}
</svg>`;
};

const files = [
  // 서비스 카드
  ["services/window-cleaning.svg", facade({ seed: "svc-window", accent: "squeegee", caption: "유리창 청소" })],
  ["services/exterior-wall.svg", facade({ seed: "svc-wall", accent: "spray", caption: "외벽 고압세척" })],
  ["services/signage.svg", facade({ seed: "svc-sign", accent: "sign", caption: "간판 청소" })],
  ["services/awning.svg", facade({ seed: "svc-awning", accent: "sign", caption: "어닝 청소" })],
  ["services/film-removal.svg", facade({ seed: "svc-film", accent: "squeegee", caption: "시트지 제거" })],
  ["services/specialized-cleaning.svg", facade({ seed: "svc-special", accent: "spray", caption: "특수 청소" })],

  // 시공 사례
  ["portfolio/seoul-office-glass.svg", facade({ seed: "p1", accent: "squeegee" })],
  ["portfolio/gyeonggi-apt-glass.svg", facade({ seed: "p2", accent: "squeegee" })],
  ["portfolio/incheon-wall-wash.svg", facade({ seed: "p3", accent: "spray" })],
  ["portfolio/seoul-mall-wall.svg", facade({ seed: "p4", accent: "spray" })],
  ["portfolio/gyeonggi-sign-clean.svg", facade({ seed: "p5", accent: "sign" })],
  ["portfolio/seoul-awning.svg", facade({ seed: "p6", accent: "sign" })],
  ["portfolio/incheon-film-removal.svg", facade({ seed: "p7", accent: "squeegee" })],
  ["portfolio/seoul-showroom-film.svg", facade({ seed: "p8", accent: "squeegee" })],
  ["portfolio/gyeonggi-skylight.svg", facade({ seed: "p10", accent: "spray" })],

  // Open Graph
  ["og.svg", facade({ seed: "og", w: 1200, h: 630, accent: "squeegee", caption: "삐까번쩍 · 서울 경기 인천 유리창 · 외벽 청소" })],
];

for (const [name, content] of files) {
  const target = join(OUT, name);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

console.log(`✓ ${files.length}개의 플레이스홀더 이미지를 public/images 에 생성했습니다.`);

const logoMark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80" role="img">
<rect width="80" height="80" rx="18" fill="${BRAND}"/>
<path d="M40 16l4.8 14.8H60l-12.4 9 4.8 14.7L40 45.6 27.6 54.5l4.8-14.7-12.4-9h15.2z" fill="${INK}"/>
</svg>`;

await mkdir(LOGO_OUT, { recursive: true });
const hasLogoPhoto = existsSync(LOGO_OUT)
  ? readdirSync(LOGO_OUT).some((name) => {
      const { name: fileName, ext } = parse(name);
      return fileName.toLowerCase() === "logo" && ext.length > 1 && ext.toLowerCase() !== ".svg";
    })
  : false;

if (!hasLogoPhoto) {
  await writeFile(join(LOGO_OUT, "logo.svg"), logoMark, "utf8");
}

console.log("✓ 로고 플레이스홀더를 public/assets/logo 에 생성했습니다.");

const heroSlides = [
  ["01.svg", facade({ seed: "hero-1", w: 1600, h: 1000, accent: "squeegee" })],
  ["02.svg", facade({ seed: "hero-2", w: 1600, h: 1000, accent: "spray" })],
  ["03.svg", facade({ seed: "hero-3", w: 1600, h: 1000, accent: "sign" })],
];

await mkdir(HERO_OUT, { recursive: true });
const heroHasPhoto = existsSync(HERO_OUT)
  ? readdirSync(HERO_OUT).some((name) => {
      const { ext } = parse(name);
      return ext.length > 1 && ext.toLowerCase() !== ".svg";
    })
  : false;

if (!heroHasPhoto) {
  for (const [name, content] of heroSlides) {
    await writeFile(join(HERO_OUT, name), content, "utf8");
  }
}

console.log("✓ 메인 배경 슬라이드를 public/assets/hero 에 생성했습니다.");

const beforeAfterFiles = [
  ["window-cleaning", "ba-glass", "squeegee"],
  ["exterior-wall", "ba-wall", "spray"],
  ["signage", "ba-sign", "sign"],
  ["awning", "ba-awning", "sign"],
  ["film-removal", "ba-film", "squeegee"],
  ["specialized-cleaning", "ba-special", "spray"],
];

const hasPhoto = (dir, side) => {
  if (!existsSync(dir)) return false;

  return readdirSync(dir).some((name) => {
    const { name: fileName, ext } = parse(name);
    return (
      fileName.toLowerCase() === side &&
      ext.length > 1 &&
      ext.toLowerCase() !== ".svg"
    );
  });
};

for (const [slug, seed, accent] of beforeAfterFiles) {
  const dir = join(BEFORE_AFTER_OUT, slug);
  await mkdir(dir, { recursive: true });

  if (!hasPhoto(dir, "before")) {
    await writeFile(
      join(dir, "before.svg"),
      facade({
        seed,
        w: 1000,
        h: 750,
        state: "dirty",
        accent: accent === "sign" ? "sign" : undefined,
      }),
      "utf8",
    );
  }

  if (!hasPhoto(dir, "after")) {
    await writeFile(
      join(dir, "after.svg"),
      facade({ seed, w: 1000, h: 750, accent }),
      "utf8",
    );
  }
}

console.log(
  `✓ ${beforeAfterFiles.length}개 서비스의 전후 이미지를 public/assets/before-after 에 생성했습니다.`,
);

/**
 * Open Graph 이미지는 SVG를 읽지 못하는 크롤러가 많아 PNG로도 변환합니다.
 * sharp 가 없으면 건너뛰고, 나중에 1200x630 실제 사진으로 교체하면 됩니다.
 */
try {
  const { default: sharp } = await import("sharp");
  await sharp(Buffer.from(files.find(([n]) => n === "og.svg")[1]))
    .png()
    .toFile(join(OUT, "og.png"));
  console.log("✓ og.png 변환 완료");
} catch {
  console.log("- sharp 를 찾을 수 없어 og.png 변환은 건너뜁니다. (og.svg 사용)");
}
