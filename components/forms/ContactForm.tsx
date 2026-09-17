"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { serviceTitles } from "@/lib/services";
import { site } from "@/lib/site";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; testMode: boolean }
  | { state: "error"; message: string };

const fieldClass =
  "min-h-12 w-full rounded-xl border border-line bg-white px-4 text-[0.95rem] text-ink placeholder:text-ink-muted/70 focus:border-brand-strong";

const labelClass = "mb-1.5 block text-sm font-bold";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          serviceType: data.get("serviceType"),
          location: data.get("location"),
          message: data.get("message"),
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        testMode?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        setStatus({
          state: "error",
          message: result.error ?? "접수에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        });
        return;
      }

      form.reset();
      setStatus({ state: "success", testMode: Boolean(result.testMode) });
    } catch {
      setStatus({
        state: "error",
        message: "네트워크 오류로 접수하지 못했습니다. 전화로 문의해 주세요.",
      });
    }
  };

  const submitting = status.state === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-white p-6 lg:p-8"
      aria-labelledby="contact-form-title"
    >
      <h3 id="contact-form-title" className="text-xl font-bold">
        견적 문의 남기기
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        건물 종류와 청소가 필요한 범위를 알려주시면 영업시간 기준 당일에 연락드립니다.
      </p>

      <fieldset className="mt-6 grid gap-5 border-0 p-0 sm:grid-cols-2">
        <legend className="sr-only">견적 문의 정보</legend>
        <div>
          <label htmlFor="name" className={labelClass}>
            이름 <span className="text-brand-deep">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={40}
            autoComplete="name"
            placeholder="홍길동"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            연락처 <span className="text-brand-deep">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={40}
            inputMode="tel"
            autoComplete="tel"
            placeholder="010-1234-5678"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="serviceType" className={labelClass}>
            서비스 유형 <span className="text-brand-deep">*</span>
          </label>
          <select id="serviceType" name="serviceType" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              선택해 주세요
            </option>
            {serviceTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
            <option value="기타 / 상담 후 결정">기타 / 상담 후 결정</option>
          </select>
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            건물 위치 <span className="font-medium text-ink-muted">(선택)</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            maxLength={80}
            placeholder="예) 서울 강서구 마곡동"
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            문의 내용 <span className="text-brand-deep">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={2000}
            placeholder="건물 층수, 청소가 필요한 범위, 희망 일정을 적어주시면 상담이 빨라집니다."
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] leading-relaxed text-ink placeholder:text-ink-muted/70 focus:border-brand-strong"
          />
        </div>
      </fieldset>

      <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-surface p-4">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          required
          className="mt-0.5 size-5 shrink-0 accent-brand-strong"
        />
        <label htmlFor="privacy" className="text-[0.85rem] leading-relaxed text-ink-soft">
          견적 상담을 위한 <strong className="font-bold text-ink">개인정보 수집·이용</strong>에
          동의합니다. 수집 항목은 이름·연락처·문의 내용이며, 상담 완료 후 3개월간 보관 후
          파기합니다.
        </label>
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full">
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            접수 중…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden />
            무료 견적 문의하기
          </>
        )}
      </Button>

      {/* 제출 결과 안내 – 스크린리더에도 즉시 전달됩니다 */}
      <div aria-live="polite" className="mt-4">
        {status.state === "success" ? (
          <div className="flex gap-2.5 rounded-xl border border-brand-strong bg-brand-tint p-4 text-[0.9rem] leading-relaxed">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-deep" aria-hidden />
            <p>
              <strong className="font-bold">문의가 접수되었습니다.</strong>
              <br />
              {status.testMode ? (
                <>
                  현재는 <strong className="font-bold">테스트 모드</strong>로, 입력 내용이 실제로
                  전송되지 않고 서버 로그에만 기록됩니다. 실제 접수를 받으려면{" "}
                  <code className="rounded bg-white px-1 py-0.5 text-[0.8rem]">
                    CONTACT_WEBHOOK_URL
                  </code>{" "}
                  환경 변수를 설정하세요. 급한 문의는 {site.phone} 으로 연락해 주세요.
                </>
              ) : (
                <>영업시간 기준 당일에 {site.phone} 번호로 연락드리겠습니다.</>
              )}
            </p>
          </div>
        ) : null}

        {status.state === "error" ? (
          <div className="flex gap-2.5 rounded-xl border border-red-300 bg-red-50 p-4 text-[0.9rem] leading-relaxed text-red-900">
            <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
            <p>{status.message}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
