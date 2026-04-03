import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  {
    ignores: [".next/**", ".worktrees/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "lucide-react",
              message: "Use @phosphor-icons/react for icon imports in this repository.",
            },
            {
              name: "feather-icons",
              message: "Feather icons are not part of this project icon system.",
            },
          ],
          patterns: [
            {
              group: ["@heroicons/*", "react-icons/fi*"],
              message: "Use @phosphor-icons/react for icon imports in this repository.",
            },
          ],
        },
      ],
    },
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
]);
