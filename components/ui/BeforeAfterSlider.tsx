"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

type Props = {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  caption?: string;
  /** 초기 손잡이 위치(%) */
  initial?: number;
};

/**
 * 청소 전후 비교 슬라이더.
 * range 입력을 그대로 쓰기 때문에 마우스 드래그 · 터치 · 키보드(←/→) 모두 동작합니다.
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  caption,
  initial = 50,
}: Props) {
  const [value, setValue] = useState(initial);
  const id = useId();

  return (
    <figure className="relative m-0 aspect-4/3 w-full overflow-hidden rounded-2xl border border-line bg-surface select-none">
      {/* 청소 후 이미지가 바탕, 청소 전 이미지를 왼쪽에서 잘라 보여줍니다 */}
      <Image
        src={afterImage}
        alt={afterAlt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-3 right-3 rounded-full bg-brand px-3 py-1 text-xs font-bold tracking-wide text-ink"
      >
        AFTER
      </span>

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold tracking-wide text-white"
        >
          BEFORE
        </span>
      </div>

      {/* 경계선 + 손잡이 (표시 전용, 실제 조작은 아래 range 가 담당) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-brand"
        style={{ left: `${value}%` }}
      >
        <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink/10 bg-brand shadow-md">
          <MoveHorizontal className="size-5 text-ink" strokeWidth={2.4} />
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        청소 전후 비교 슬라이더 – 좌우로 움직여 비교하세요
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        aria-valuetext={`청소 전 이미지 ${value}% 표시`}
        className="absolute inset-0 size-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      />
      {caption ? <figcaption className="sr-only">{caption}</figcaption> : null}
    </figure>
  );
}
