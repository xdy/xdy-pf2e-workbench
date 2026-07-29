import { describe, expect, test } from "vitest";
import {
    getEntryTradition,
    getSkillCheckForEntry,
    hasCompatibleTradition,
    pickSpellcastingEntryForActor,
} from "../../../src/module/feature/spells/spellActorQueries.js";
import type { ActorPF2e, SpellcastingEntryPF2e } from "foundry-pf2e";

function makeEntryStub(
    overrides: Partial<{
        id: string;
        tradition: string | null;
        system: { tradition?: { value?: string } };
    }> = {},
): SpellcastingEntryPF2e {
    return {
        id: overrides.id ?? "entry1",
        spells: null,
        tradition: overrides.tradition ?? null,
        isSpontaneous: false,
        isPrepared: false,
        system: (overrides.system ?? {}) as unknown as object,
    } as unknown as SpellcastingEntryPF2e;
}

function makeActorWithSpellcasting(entries: SpellcastingEntryPF2e[]): ActorPF2e {
    return {
        spellcasting: [...entries],
    } as unknown as ActorPF2e;
}

describe("getEntryTradition", () => {
    test.for([
        ["top-level tradition", makeEntryStub({ tradition: "arcane" }), "arcane"],
        ["nested system.tradition.value", makeEntryStub({ system: { tradition: { value: "divine" } } }), "divine"],
        [
            "prefers top-level over nested",
            makeEntryStub({ tradition: "arcane", system: { tradition: { value: "divine" } } }),
            "arcane",
        ],
        ["null when neither set", makeEntryStub({}), null],
        [
            "empty top-level tradition becomes null (|| null)",
            makeEntryStub({ tradition: "", system: { tradition: { value: "divine" } } }),
            null,
        ],
    ])("%s", ([_desc, entry, expected]) => {
        expect(getEntryTradition(entry as SpellcastingEntryPF2e)).toBe(expected);
    });
});

describe("hasCompatibleTradition", () => {
    test.for([
        ["matching tradition", ["arcane"], makeEntryStub({ tradition: "arcane" }), true],
        ["empty spell traditions matches any", [], makeEntryStub({ tradition: "arcane" }), true],
        ["no match when tradition differs", ["divine"], makeEntryStub({ tradition: "arcane" }), false],
        [
            "nested system.tradition.value",
            ["occult"],
            makeEntryStub({ system: { tradition: { value: "occult" } } }),
            true,
        ],
        ["no spellcasting entries", ["arcane"], undefined, false],
    ])("%s", ([_desc, spellTrads, entryOrUndef, expected]) => {
        const actor =
            entryOrUndef !== undefined
                ? makeActorWithSpellcasting([entryOrUndef as SpellcastingEntryPF2e])
                : makeActorWithSpellcasting([]);
        expect(hasCompatibleTradition(actor, spellTrads as string[])).toBe(expected);
    });

    test("matches first compatible entry among several", () => {
        const divine = makeEntryStub({ id: "d", tradition: "divine" });
        const arcane = makeEntryStub({ id: "a", tradition: "arcane" });
        const actor = makeActorWithSpellcasting([divine, arcane]);
        expect(hasCompatibleTradition(actor, ["arcane"])).toBe(true);
    });
});

describe("pickSpellcastingEntryForActor", () => {
    test.for([
        ["returns null when no entries", [], ["arcane"], undefined, null],
        ["single matching entry", [makeEntryStub({ tradition: "arcane" })], ["arcane"], undefined, "entry1"],
        [
            "preferred entry by id",
            [makeEntryStub({ id: "d", tradition: "divine" }), makeEntryStub({ id: "a", tradition: "arcane" })],
            ["arcane"],
            "a",
            "a",
        ],
        [
            "falls back when preferred not found",
            [makeEntryStub({ id: "d", tradition: "divine" }), makeEntryStub({ id: "a", tradition: "arcane" })],
            ["arcane"],
            "nonexistent",
            "a",
        ],
        [
            "null when single entry doesn't match tradition",
            [makeEntryStub({ tradition: "arcane" })],
            ["divine"],
            undefined,
            null,
        ],
        [
            "skips entries without tradition",
            [makeEntryStub({ id: "no", tradition: null }), makeEntryStub({ id: "a", tradition: "arcane" })],
            ["arcane"],
            undefined,
            "a",
        ],
        [
            "no traditions matches any entry with a tradition",
            [makeEntryStub({ id: "d", tradition: "divine" })],
            [],
            undefined,
            "d",
        ],
    ])("%s", ([_desc, entries, traditions, preferred, expected]) => {
        const actor = makeActorWithSpellcasting(entries as SpellcastingEntryPF2e[]);
        const result = pickSpellcastingEntryForActor(actor, traditions as string[], preferred as string | undefined);
        expect(result?.id ?? null).toBe(expected as string | null);
    });
});

describe("getSkillCheckForEntry", () => {
    test.for([
        ["arcane -> arcana", "arcane", "arcana", { slug: "arcana" }],
        ["divine -> religion", "divine", "religion", { slug: "religion" }],
        ["occult -> occultism", "occult", "occultism", { slug: "occultism" }],
        ["primal -> nature", "primal", "nature", { slug: "nature" }],
        ["unknown tradition -> null", "unknown", "", null],
        ["empty tradition -> null", "", "", null],
    ])("%s", ([_desc, tradition, skillSlug, expected]) => {
        const entry = makeEntryStub({ tradition: tradition as string });
        const skills: Record<string, unknown> = {};
        if (expected) skills[skillSlug as string] = expected;
        const actor = { skills } as unknown as ActorPF2e;
        expect(getSkillCheckForEntry(actor, entry)).toEqual(expected);
    });

    test("returns null when actor has no skills property", () => {
        const entry = makeEntryStub({ tradition: "arcane" });
        const actor = {} as unknown as ActorPF2e;
        expect(getSkillCheckForEntry(actor, entry)).toBeNull();
    });
});
