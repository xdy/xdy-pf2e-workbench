import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";

const TEMPLATES_DIR = resolve(__dirname, "../../../static/templates/feature/spell-collections");
const EN_JSON_PATH = resolve(__dirname, "../../../static/lang/en.json");

function extractTemplateI18nKeys(): Set<string> {
    const keys = new Set<string>();
    if (!existsSync(TEMPLATES_DIR)) return keys;
    const regex = /i18n\.([A-Za-z0-9_]+)/g;
    for (const filename of readdirSync(TEMPLATES_DIR)) {
        if (!filename.endsWith(".hbs")) continue;
        const content = readFileSync(join(TEMPLATES_DIR, filename), "utf-8");
        for (const match of content.matchAll(regex)) {
            keys.add(match[1]);
        }
    }
    return keys;
}

function loadEnKeys(): Set<string> {
    const raw = JSON.parse(readFileSync(EN_JSON_PATH, "utf-8")) as Record<string, unknown>;
    const moduleData = raw["xdy-pf2e-workbench"] as Record<string, unknown> | undefined;
    const handler = moduleData?.["spellLearn"];
    if (!handler || typeof handler !== "object") {
        throw new Error("en.json is missing xdy-pf2e-workbench.spellLearn");
    }
    return new Set(Object.keys(handler as Record<string, unknown>));
}

describe("spell learn i18n keys", () => {
    test("every i18n key used in handler templates exists in en.json under spellLearn", () => {
        const templateKeys = extractTemplateI18nKeys();
        const enKeys = loadEnKeys();
        const missing = [...templateKeys].filter((k) => !enKeys.has(k));
        expect(missing).toEqual([]);
    });
});
