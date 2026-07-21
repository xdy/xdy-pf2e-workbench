import { beforeEach, describe, expect, test, vi } from "vitest";
import { getLearnFailureLevel, sanitizeFlagKey } from "../../../src/module/feature/spells/flags.js";
import type { ActorPF2e } from "foundry-pf2e";

function stubGamePf2e(): void {
    vi.stubGlobal("game", {
        system: { id: "pf2e" },
        user: { isGM: true, id: "gm1" },
        settings: { get: () => ({}) },
        time: { worldTime: 1000000 },
        i18n: {
            localize: (key: string) => key,
            format: (key: string, data?: Record<string, unknown>) => (data ? `${key} ${JSON.stringify(data)}` : key),
        },
    });
}

beforeEach(() => {
    stubGamePf2e();
});

describe("sanitizeFlagKey", () => {
    test("replaces dots with exclamation marks in compendium source IDs", () => {
        expect(sanitizeFlagKey("Compendium.pf2e.spells-srd.Item.abc123")).toBe(
            "Compendium!pf2e!spells-srd!Item!abc123",
        );
    });

    test("plain slug passes through unchanged", () => {
        expect(sanitizeFlagKey("fireball")).toBe("fireball");
    });
});

const SPELL_ID = "Compendium.pf2e.spells-srd.Item.fireball";
const FLAGGED_KEY = sanitizeFlagKey(SPELL_ID);

function actorStub(overrides: {
    level?: number;
    learnFailures?: Record<string, { level: number; timestamp: number }>;
}): ActorPF2e {
    return {
        system: { details: { level: { value: overrides.level ?? 1 } } },
        items: [],
        getFlag(_module: string, key: string) {
            if (key === "learnSpellFailures") return overrides.learnFailures ?? {};
            return undefined;
        },
    } as unknown as ActorPF2e;
}

describe("getLearnFailureLevel", () => {
    test("returns undefined when actor has no failure flag", () => {
        expect(getLearnFailureLevel(actorStub({}), FLAGGED_KEY)).toBeUndefined();
    });

    test("returns undefined when identifier is not in the map", () => {
        const actor = actorStub({
            learnFailures: { other: { level: 2, timestamp: 100 } },
        });
        expect(getLearnFailureLevel(actor, FLAGGED_KEY)).toBeUndefined();
    });

    test("returns level from failure entry", () => {
        const actor = actorStub({
            learnFailures: { [FLAGGED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(getLearnFailureLevel(actor, FLAGGED_KEY)).toBe(3);
    });
});
