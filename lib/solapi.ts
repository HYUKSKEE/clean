import { createHmac, randomBytes } from "node:crypto";
import {
  clipToSmsBytes,
  formatContactLms,
  LMS_MAX_BYTES,
  LMS_SUBJECT_MAX_BYTES,
} from "@/lib/sms";

type ContactNotice = {
  name: string;
  phone: string;
  serviceType: string;
  message: string;
  location?: string;
};

const SOLAPI_SEND_URL = "https://api.solapi.com/messages/v4/send-many/detail";
const LMS_SUBJECT = "삐까번쩍 견적 문의";

const filled = (value: string | undefined) => value?.trim() ?? "";

const digits = (value: string) => value.replace(/\D/g, "");

const authHeader = (apiKey: string, apiSecret: string) => {
  const date = new Date().toISOString();
  const salt = randomBytes(16).toString("hex");
  const signature = createHmac("sha256", apiSecret)
    .update(date + salt)
    .digest("hex");

  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
};

export const isSolapiConfigured = () =>
  Boolean(
    filled(process.env.SOLAPI_API_KEY) &&
      filled(process.env.SOLAPI_API_SECRET) &&
      filled(process.env.SOLAPI_FROM) &&
      filled(process.env.SOLAPI_TO),
  );

export async function sendContactLms(notice: ContactNotice) {
  const apiKey = filled(process.env.SOLAPI_API_KEY);
  const apiSecret = filled(process.env.SOLAPI_API_SECRET);
  const from = digits(filled(process.env.SOLAPI_FROM));
  const to = digits(filled(process.env.SOLAPI_TO));
  const text = clipToSmsBytes(formatContactLms(notice), LMS_MAX_BYTES);
  const subject = clipToSmsBytes(LMS_SUBJECT, LMS_SUBJECT_MAX_BYTES);

  const response = await fetch(SOLAPI_SEND_URL, {
    method: "POST",
    headers: {
      Authorization: authHeader(apiKey, apiSecret),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      strict: true,
      messages: [
        {
          to,
          from,
          text,
          subject,
          type: "LMS",
          autoTypeDetect: false,
          country: "82",
        },
      ],
    }),
  });

  const result = (await response.json()) as {
    errorCode?: string;
    errorMessage?: string;
    failedMessageList?: { statusMessage?: string }[];
    groupInfo?: {
      count?: { registeredSuccess?: number; registeredFailed?: number };
    };
  };

  const failed = result.failedMessageList?.[0];
  const registered =
    result.groupInfo?.count?.registeredSuccess ?? 0;

  if (
    !response.ok ||
    result.errorCode ||
    failed ||
    registered < 1
  ) {
    throw new Error(
      result.errorMessage ??
        failed?.statusMessage ??
        `solapi ${response.status}`,
    );
  }
}
