import { Info } from "lucide-react";

type Section = {
  heading: string;
  body: string[];
};

/** 개인정보처리방침 · 이용약관 공통 레이아웃 */
export function LegalPage({
  title,
  updatedAt,
  note,
  sections,
}: {
  title: string;
  updatedAt: string;
  note?: string;
  sections: Section[];
}) {
  return (
    <article className="py-14 lg:py-20">
      <div className="container-page max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-ink-muted">시행일: {updatedAt}</p>

        {note ? (
          <p className="mt-6 flex gap-2.5 rounded-xl border border-line bg-surface p-4 text-[0.875rem] leading-relaxed text-ink-soft">
            <Info className="mt-0.5 size-4 shrink-0 text-brand-deep" aria-hidden />
            {note}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col gap-9">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-bold sm:text-xl">{section.heading}</h2>
              <div className="mt-3 flex flex-col gap-2.5">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[0.925rem] leading-relaxed text-ink-soft sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
