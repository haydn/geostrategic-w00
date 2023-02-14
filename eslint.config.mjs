import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import typescript from "typescript-eslint";

export default [
  js.configs.recommended,
  ...typescript.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ...reactRecommended.languageOptions,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactRecommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];
