import Link from "next/link";
import { regions, servicePlaceHref } from "@/lib/areas";

export function AreaPlaceNav({
  serviceSlug,
  heading,
}: {
  serviceSlug: string;
  heading?: string;
}) {
  return (
    <div>
      {heading ? (
        <p className="mb-3 text-sm font-bold text-ink-soft">{heading}</p>
      ) : null}
      <ul className="flex flex-col gap-2">
        {regions.map((region, index) => (
          <li key={region.slug}>
            <details className="rounded-xl border border-line bg-white" open={index === 0}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-4 py-2 text-sm font-bold [&::-webkit-details-marker]:hidden">
                <span>{region.name}</span>
                <span aria-hidden className="text-ink-muted">
                  ›
                </span>
              </summary>
              <ul className="flex flex-wrap gap-1.5 border-t border-line px-4 py-3">
                {region.places.map((place) => (
                  <li key={place.slug}>
                    <Link
                      href={servicePlaceHref(serviceSlug, place.slug)}
                      className="inline-flex min-h-9 items-center rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink-soft transition-colors hover:border-brand-strong hover:bg-brand-tint hover:text-ink"
                    >
                      {place.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
