type ContactNotice = {
  name: string;
  phone: string;
  serviceType: string;
  message: string;
  location?: string;
};

const SENDON_SMS_URL = "https://api.sendon.io/v2/messages/sms";
const LMS_MAX_BYTES = 2000;

const filled = (value: string | undefined) => value?.trim() ?? "";

const digits = (value: string) => value.replace(/\D/g, "");

export const isSendonConfigured = () =>
  Boolean(
    filled(process.env.SENDON_ID) &&
      filled(process.env.SENDON_API_KEY) &&
      filled(process.env.SENDON_FROM) &&
      filled(process.env.SENDON_TO),
  );

const clipToBytes = (text: string, maxBytes: number) => {
  const encoder = new TextEncoder();
  if (encoder.encode(text).length <= maxBytes) return text;

  let clipped = text;
  while (encoder.encode(`${clipped}…`).length > maxBytes) {
    clipped = clipped.slice(0, -1);
  }
  return `${clipped}…`;
};

export async function sendContactLms(notice: ContactNotice) {
  const id = filled(process.env.SENDON_ID);
  const apiKey = filled(process.env.SENDON_API_KEY);
  const from = digits(filled(process.env.SENDON_FROM));
  const to = digits(filled(process.env.SENDON_TO));
  // 고객 연락처(notice.phone)는 본문에만 넣고, 수신자는 사장님 번호로 고정합니다.

  const lines = [
    "[삐까번쩍] 견적 문의",
    `이름: ${notice.name}`,
    `연락처: ${notice.phone}`,
    `서비스: ${notice.serviceType}`,
  ];
  if (notice.location) lines.push(`위치: ${notice.location}`);
  lines.push("", notice.message);

  const message = clipToBytes(lines.join("\n"), LMS_MAX_BYTES);

  const response = await fetch(SENDON_SMS_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${apiKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "LMS",
      from,
      to: [to],
      title: "삐까번쩍 견적 문의",
      message,
      isAd: false,
    }),
  });

  const result = (await response.json()) as { code?: number; message?: string };

  if (!response.ok || result.code !== 200) {
    throw new Error(result.message ?? `sendon ${response.status}`);
  }
}
