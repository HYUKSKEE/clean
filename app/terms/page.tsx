import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "이용약관",
  description: `${site.name} 이용약관 – 견적, 시공, 결제, 재작업 기준 등 서비스 이용 조건을 안내합니다.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="이용약관"
      updatedAt="2026-01-01"
      note="아래 내용은 표준 문안 예시입니다. 실제 계약 조건에 맞게 수정해 사용하세요."
      sections={[
        {
          heading: "제1조 (목적)",
          body: [
            `본 약관은 ${site.legalName}(이하 "회사")가 제공하는 유리창·외벽·간판 청소 및 정기 관리 서비스의 이용 조건과 절차를 정합니다.`,
          ],
        },
        {
          heading: "제2조 (견적 및 계약)",
          body: [
            "견적은 현장 상태, 면적, 작업 난이도를 기준으로 산정하며 상담 시 안내한 금액을 기준으로 합니다.",
            "현장 여건이 사전 안내와 크게 다른 경우 작업 전에 변경 사항과 비용을 다시 협의합니다.",
          ],
        },
        {
          heading: "제3조 (작업 일정)",
          body: [
            "작업 일정은 상호 협의하여 정하며, 강우·강풍 등 안전에 영향을 주는 기상 조건에서는 일정을 조정합니다.",
            "이용자의 사정으로 일정을 변경할 경우 최소 1일 전에 알려주셔야 합니다.",
          ],
        },
        {
          heading: "제4조 (재작업 및 책임)",
          body: [
            "시공 후 7일 이내에 작업 범위 내 미비점이 확인되면 무상으로 재작업합니다.",
            "회사의 과실로 발생한 시설물 손상은 배상책임보험 범위 내에서 처리합니다.",
            "노후 자재 자체의 결함이나 기존 손상은 책임 범위에서 제외됩니다.",
          ],
        },
        {
          heading: "제5조 (결제)",
          body: [
            "결제는 작업 완료 후 확인 절차를 거쳐 진행하며, 대규모 시공은 계약 시 별도 조건을 정합니다.",
            "세금계산서 및 현금영수증 발행이 가능합니다.",
          ],
        },
        {
          heading: "제6조 (문의)",
          body: [`서비스 관련 문의는 ${site.phone} 또는 ${site.email} 으로 연락해 주세요.`],
        },
      ]}
    />
  );
}
