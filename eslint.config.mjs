import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Add your custom rules
    rules: {
      // Set the `@typescript-eslint/no-unused-vars` rule to "warn"
      "@typescript-eslint/no-unused-vars": ["warn"], // Warning for unused variables
      // Turn off the core `no-unused-vars` rule as it's redundant
      "no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
