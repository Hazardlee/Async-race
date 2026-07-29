import path from "node:path";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import { configs, plugins, rules } from "eslint-config-airbnb-extended";
import { rules as prettierConfigRules } from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

const gitignorePath = path.resolve(".", ".gitignore");

const jsConfig = defineConfig([
  {
    name: "js/config",
    ...js.configs.recommended,
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  rules.base.importsStrict,
]);

const reactConfig = defineConfig([
  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  ...configs.react.recommended,
  rules.react.strict,
]);

const typescriptConfig = defineConfig([
  plugins.typescriptEslint,
  ...configs.base.typescript,
  rules.typescript.typescriptEslintStrict,
  ...configs.react.typescript,
]);

const prettierConfig = defineConfig([
  {
    name: "prettier/plugin/config",
    plugins: {
      prettier: prettierPlugin,
    },
  },
  {
    name: "prettier/config",
    rules: {
      ...prettierConfigRules,
      "prettier/prettier": "error",
    },
  },
]);

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  ...jsConfig,
  ...reactConfig,
  ...typescriptConfig,
  ...prettierConfig,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      globals: globals.browser,
      parser: plugins.typescriptEslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...reactRefresh.configs.vite.rules,

      "max-lines-per-function": ["error", { max: 40 }],

      "react/react-in-jsx-scope": "off",

      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],

      "react/require-default-props": [
        "error",
        { functions: "defaultArguments" },
      ],

      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsFor: ["state"],
        },
      ],
    },
  },
]);
