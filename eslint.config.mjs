import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import prettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
    "**/dist/",
    "**/.idea/",
    "**/.vs/",
    "**/*.iml",
    ".vscode",
    "static/assets/icons/\\!dox/",
    "node_modules/",
    "**/.DS_Store",
    "**/**.env",
    "**/npm-debug.log",
    "**/coverage/",
    "**/debug/",
    "**/docs/",
    "**/node_modules/",
    "**/dist/",
    "**/foundry.js",
    "**/main.bundle.js",
    "**/foundryconfig.json",
    "**/.eslintrc.js",
    "**/vite.config.ts",
    "**/types/",
]), {
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/typescript",
        "prettier",
    )),

    plugins: {
        prettier,
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 2023,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    settings: {
        "import/resolver": {
            node: {
                paths: ["src", "types", "", "dist"],
                extensions: [".css", ".js", ".json", ".jsx", ".scss", ".ts", ".tsx"],
            },

            "eslint-import-resolver-typescript": true,
            typescript: true,
        },

        "import/parsers": {
            "@typescript-eslint/parser": [".ts"],
        },
    },

    rules: {
        eqeqeq: ["error", "always"],
        "import/named": "off",
        "import/no-default-export": "error",
        "prettier/prettier": "error",
        "no-console": "off",
        "no-plusplus": "off",

        "no-unused-expressions": ["error", {
            allowShortCircuit: true,
        }],

        "spaced-comment": ["error", "always", {
            markers: ["/"],
        }],

        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",

        "@/lines-between-class-members": ["error", "always", {
            exceptAfterSingleLine: true,
        }],

        "@typescript-eslint/prefer-namespace-keyword": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",

        "@typescript-eslint/no-namespace": ["error", {
            allowDeclarations: true,
        }],

        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unsafe-declaration-merging": "off",
        "@typescript-eslint/no-unused-vars": "off",

        "@typescript-eslint/array-type": ["error", {
            default: "array",
        }],
    },
}]);