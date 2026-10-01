/** 솔라피 LMS: 한글 2바이트, 영문 1바이트. 본문 2000바이트, 제목 40바이트. */
export const LMS_MAX_BYTES = 2000;
export const LMS_SUBJECT_MAX_BYTES = 40;

export const smsByteLength = (text: string) => {
  let bytes = 0;
  for (const char of text) {
    bytes += char.charCodeAt(0) > 0x7f ? 2 : 1;
  }
  return bytes;
};

export const truncateToSmsBytes = (text: string, maxBytes = LMS_MAX_BYTES) => {
  if (smsByteLength(text) <= maxBytes) return text;

  let clipped = "";
  for (const char of text) {
    const next = clipped + char;
    if (smsByteLength(next) > maxBytes) break;
    clipped = next;
  }
  return clipped;
};

export const clipToSmsBytes = (text: string, maxBytes = LMS_MAX_BYTES) => {
  if (smsByteLength(text) <= maxBytes) return text;
  return `${truncateToSmsBytes(text, maxBytes - 2)}…`;
};

export const formatContactLms = (notice: {
  name: string;
  phone: string;
  serviceType: string;
  message: string;
  location?: string;
}) =>
  [
    `이름: ${notice.name}`,
    `연락처: ${notice.phone}`,
    `서비스 유형: ${notice.serviceType}`,
    `건물 위치: ${notice.location ?? ""}`,
    "문의 내용:",
    notice.message,
  ].join("\n");
