import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${site.name} 개인정보처리방침 – 견적 상담 과정에서 수집하는 개인정보의 항목과 이용, 보관, 파기 기준을 안내합니다.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="개인정보처리방침"
      updatedAt="2026-01-01"
      note="아래 내용은 표준 문안 예시입니다. 실제 운영 전에 사업자 정보와 보관 기간을 확인해 수정하세요."
      sections={[
        {
          heading: "1. 수집하는 개인정보 항목",
          body: [
            `${site.legalName}(이하 "회사")는 견적 상담 및 서비스 제공을 위해 아래 항목을 수집합니다.`,
            "필수 항목: 이름, 연락처, 서비스 유형, 문의 내용",
            "선택 항목: 건물 위치, 이메일 주소",
          ],
        },
        {
          heading: "2. 개인정보의 이용 목적",
          body: [
            "견적 안내 및 상담 응대, 시공 일정 조율, 서비스 품질 관리 목적으로만 이용합니다.",
            "회사는 수집한 개인정보를 광고 및 마케팅 목적으로 이용하지 않습니다.",
          ],
        },
        {
          heading: "3. 보유 및 이용 기간",
          body: [
            "상담 완료 후 3개월간 보관하며, 기간이 지나면 지체 없이 파기합니다.",
            "관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 별도 보관합니다.",
          ],
        },
        {
          heading: "4. 제3자 제공 및 처리 위탁",
          body: [
            "회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.",
            "시공 협력업체와 업무를 분담하는 경우 필요한 최소 정보만 전달하며, 사전에 안내합니다.",
          ],
        },
        {
          heading: "5. 이용자의 권리",
          body: [
            "이용자는 언제든지 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다.",
            `요청은 ${site.phone} 또는 ${site.email} 으로 접수해 주세요.`,
          ],
        },
        {
          heading: "6. 개인정보 보호 책임자",
          body: [`책임자: ${site.owner}`, `연락처: ${site.phone}`, `이메일: ${site.email}`],
        },
      ]}
    />
  );
}
