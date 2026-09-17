import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-bold tracking-wide text-brand-deep uppercase">404</p>
      <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">
        주소가 변경되었거나 삭제된 페이지입니다. 홈에서 서비스와 시공 사례를 확인해 주세요.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="lg">
          홈으로 가기
        </Button>
        <Button href="/#services" variant="ghost" size="lg">
          서비스 소개 보기
        </Button>
      </div>
    </div>
  );
}
