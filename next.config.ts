import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 실제 사진을 외부 스토리지(S3, Cloudinary 등)로 옮길 때 여기에 호스트를 추가합니다.
    remotePatterns: [],
    /**
     * 플레이스홀더가 SVG(public/images)라서 필요한 설정입니다.
     * 실제 JPG/WebP 사진으로 전부 교체하면 아래 두 줄은 지워도 됩니다.
     */
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
