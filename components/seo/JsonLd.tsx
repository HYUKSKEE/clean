import { jsonLd } from "@/lib/structured-data";

/** JSON-LD 를 페이지에 심을 때 사용합니다. 스크립트 태그는 본문 흐름을 방해하지 않습니다. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />
  );
}
