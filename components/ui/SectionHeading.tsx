import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** 섹션 제목과 랜드마크를 연결할 id – h2/h3 에 붙습니다 */
  id?: string;
  /** 섹션 위에 붙는 작은 라벨. 제목이 아니므로 p 로 렌더링합니다. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** 시맨틱 계층 유지를 위해 필요 시 h3 으로 낮출 수 있습니다 */
  as?: "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className,
}: Props) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "flex flex-col gap-3",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-bold tracking-wide text-brand-deep uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className="max-w-3xl text-2xl leading-snug font-extrabold sm:text-3xl lg:text-[2.5rem]"
      >
        {title}
      </Tag>
      {description ? (
        <p className="max-w-2xl text-[0.975rem] leading-relaxed text-ink-soft sm:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}
