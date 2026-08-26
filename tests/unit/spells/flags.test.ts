import { describe, expect, test } from "vitest";
import { getLearnFailureEntry } from "../../../src/module/feature/spells/flags.js";
import type { ActorPF2e } from "foundry-pf2e";

const SPELL_ID = "Compendium.pf2e.spells-srd.Item.fireball";
const SANITIZED_KEY = "Compendium!pf2e!spells-srd!Item!fireball";

function actorStub(learnFailures?: Record<string, { level: number; timestamp: number }>): ActorPF2e {
    return {
        system: { details: { level: { value: 1 } } },
        items: [],
        getFlag(_module: string, key: string) {
            if (key === "learnSpellFailures") return learnFailures ?? {};
            return undefined;
        },
    } as unknown as ActorPF2e;
}

describe("getLearnFailureEntry", () => {
    test("returns undefined when no failure is recorded", () => {
        expect(getLearnFailureEntry(actorStub(), SPELL_ID)).toBeUndefined();
        expect(getLearnFailureEntry(actorStub({ other: { level: 2, timestamp: 100 } }), SPELL_ID)).toBeUndefined();
    });

    test("returns full entry when found, sanitizing dots in the identifier", () => {
        const entry = { level: 3, timestamp: 100 };
        const actor = actorStub({ [SANITIZED_KEY]: entry });
        expect(getLearnFailureEntry(actor, SPELL_ID)).toEqual(entry);
    });

    test("plain slug identifier passes through unchanged", () => {
        const entry = { level: 1, timestamp: 100 };
        expect(getLearnFailureEntry(actorStub({ fireball: entry }), "fireball")).toEqual(entry);
    });
});

describe("getLearnFailureEntry", () => {
    test("returns level when found via entry", () => {
        expect(getLearnFailureEntry(actorStub(), SPELL_ID)).toBeUndefined();
        expect(
            getLearnFailureEntry(actorStub({ [SANITIZED_KEY]: { level: 3, timestamp: 100 } }), SPELL_ID)?.level,
        ).toBe(3);
    });
});
