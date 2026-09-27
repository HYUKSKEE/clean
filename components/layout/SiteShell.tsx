/** 본문 컬럼 – 헤더·히어로·푸터 밖에 두어 1080px에서 멈춥니다. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return <div className="site-shell">{children}</div>;
}
