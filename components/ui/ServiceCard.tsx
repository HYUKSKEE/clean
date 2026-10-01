import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { servicePlaceHref } from "@/lib/areas";
import { isNextOptimizedImage } from "@/lib/assets";
import type { Service } from "@/lib/services";
import { getServicePhotos } from "@/lib/service-photos";

export function ServiceCard({
  service,
  placeSlug,
}: {
  service: Service;
  placeSlug?: string;
}) {
  const href = placeSlug
    ? servicePlaceHref(service.slug, placeSlug)
    : `/services/${service.slug}`;
  const photos = getServicePhotos(service.slug);
  const splitThumb = Boolean(photos.before && photos.after);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-brand-strong">
      <figure className="relative m-0 aspect-4/3 overflow-hidden bg-surface">
        {splitThumb ? (
          <div className="grid h-full grid-cols-2">
            <div className="relative min-h-0">
              <Image
                src={photos.before!}
                alt={`${service.title} 청소 전`}
                fill
                sizes="(min-width: 1024px) 15vw, (min-width: 640px) 22vw, 50vw"
                unoptimized={!isNextOptimizedImage(photos.before!)}
                className="object-cover"
              />
              <span className="absolute top-2 left-2 rounded-full bg-ink/80 px-2.5 py-1 text-[0.7rem] font-bold tracking-wide text-white">
                청소 전
              </span>
            </div>
            <div className="relative min-h-0 border-l border-white/50">
              <Image
                src={photos.after!}
                alt={`${service.title} 청소 후`}
                fill
                sizes="(min-width: 1024px) 15vw, (min-width: 640px) 22vw, 50vw"
                unoptimized={!isNextOptimizedImage(photos.after!)}
                className="object-cover"
              />
              <span className="absolute top-2 left-2 rounded-full bg-brand px-2.5 py-1 text-[0.7rem] font-bold tracking-wide text-ink">
                청소 후
              </span>
            </div>
          </div>
        ) : (
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            unoptimized={!isNextOptimizedImage(service.image)}
            className="object-cover"
          />
        )}
        <figcaption className="sr-only">
          {splitThumb ? `${service.title} 청소 전후` : service.imageAlt}
        </figcaption>
      </figure>

      <div className="flex flex-1 flex-col p-6">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-soft">
          <service.icon className="size-5 text-brand-deep" strokeWidth={2.2} aria-hidden />
        </span>

        <h3 className="mt-4 text-lg font-bold sm:text-xl">
          <Link href={href} className="hover:text-brand-deep">
            {service.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-[0.925rem] leading-relaxed text-ink-soft">
          {service.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {service.targets.slice(0, 3).map((target) => (
            <li
              key={target}
              className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted"
            >
              {target}
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-ink group-hover:text-brand-deep"
        >
          {service.title} 상세 보기
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
