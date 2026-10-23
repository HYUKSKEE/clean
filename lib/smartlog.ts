type SmartlogWindow = Window & {
  hpt_trace_info?: Record<string, string>;
};

/** 견적 문의 접수 완료를 스마트로그 '문의' 전환으로 보냅니다. 회원제가 아니라 아이디는 비웁니다. */
export function trackSmartlogInquiry() {
  const smartlogWindow = window as SmartlogWindow;
  smartlogWindow.hpt_trace_info = { _mode: "q", _memid: "" };

  const script = document.createElement("script");
  script.src = "https://cdn.smlog.co.kr/core/smart.js";
  script.charset = "utf-8";
  script.async = true;
  document.body.appendChild(script);
}
