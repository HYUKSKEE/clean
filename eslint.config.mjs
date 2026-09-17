import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // next-env.d.ts 는 Next.js 가 자동 생성하는 파일이라 검사 대상에서 제외합니다.
    ignores: [".next/**", "node_modules/**", "scripts/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
