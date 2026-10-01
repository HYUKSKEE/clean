import { NextResponse } from "next/server";
import { isSolapiConfigured, sendContactLms } from "@/lib/solapi";
import { LMS_MAX_BYTES, smsByteLength } from "@/lib/sms";

export type ContactPayload = {
  name: string;
  phone: string;
  serviceType: string;
  message: string;
  location?: string;
};

const isFilled = (value: unknown, max = 2000): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= max;

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "요청 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const { name, phone, serviceType, message, location } = body;

  if (
    !isFilled(name, 40) ||
    !isFilled(phone, 40) ||
    !isFilled(serviceType, 60) ||
    !isFilled(message) ||
    smsByteLength(message.trim()) > LMS_MAX_BYTES
  ) {
    return NextResponse.json(
      { ok: false, error: "필수 항목을 모두 입력해 주세요. 문의 내용은 2000바이트까지입니다." },
      { status: 422 },
    );
  }

  const payload: ContactPayload & { receivedAt: string } = {
    name: name.trim(),
    phone: phone.trim(),
    serviceType: serviceType.trim(),
    message: message.trim(),
    location: location?.trim() ?? "",
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  const solapiReady = isSolapiConfigured();

  if (!webhook && !solapiReady) {
    console.info("[contact] 테스트 모드 접수 (전송되지 않음):", payload);
    return NextResponse.json({ ok: true, testMode: true });
  }

  try {
    if (solapiReady) {
      await sendContactLms(payload);
    }

    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`webhook responded ${response.status}`);
    }

    return NextResponse.json({ ok: true, testMode: false });
  } catch (error) {
    console.error("[contact] 전송 실패:", error);
    return NextResponse.json(
      { ok: false, error: "접수 중 문제가 발생했습니다. 전화로 연락해 주세요." },
      { status: 502 },
    );
  }
}
