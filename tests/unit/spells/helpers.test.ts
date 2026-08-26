import { describe, expect, test, vi } from "vitest";
import {
    hasLearnFailureAtCurrentLevel,
    isBindableSpellcastingEntry,
} from "../../../src/module/feature/spells/helpers.js";
import {
    getLearnSpellCostCopper,
    getLearnSpellDcAdjustment,
    getLearnSpellHours,
    getSpellTraitsAndRank,
    spellIdentifier,
} from "../../../src/module/feature/spells/spellData.js";
import type { ActorPF2e, SpellcastingEntryPF2e, SpellPF2e } from "foundry-pf2e";

describe("isBindableSpellcastingEntry", () => {
    const makeEntry = (overrides: Record<string, unknown> = {}): SpellcastingEntryPF2e =>
        ({
            id: "entry-1",
            isEphemeral: false,
            isFocusPool: false,
            system: { prepared: { value: "prepared" } },
            ...overrides,
        }) as unknown as SpellcastingEntryPF2e;

    test.for([
        ["ephemeral entry", makeEntry({ isEphemeral: true }), false],
        ["focus pool entry", makeEntry({ isFocusPool: true }), false],
        ["missing id", makeEntry({ id: null }), false],
        ["innate entry", makeEntry({ system: { prepared: { value: "innate" } } }), false],
        ["valid prepared entry", makeEntry(), true],
        ["valid spontaneous entry", makeEntry({ system: { prepared: { value: "spontaneous" } } }), true],
    ])("%s", ([_desc, entry, expected]) => {
        expect(isBindableSpellcastingEntry(entry as SpellcastingEntryPF2e)).toBe(expected);
    });
});

describe("getLearnSpellCostCopper", () => {
    const costCases: [string, number][] = [
        ["cantrip", 200],
        ["3", 1600],
        ["9", 150000],
        ["???", 200],
    ];
    test.for(costCases)("rank %s to %i copper", ([rank, expected]) => {
        expect(getLearnSpellCostCopper(rank)).toBe(expected);
    });
});

describe("getLearnSpellHours", () => {
    const hoursCases: [string, number][] = [
        ["cantrip", 1],
        ["3", 3],
        ["10", 10],
        ["nope", 1],
    ];
    test.for(hoursCases)("rank %s to %i hour(s)", ([rank, expected]) => {
        expect(getLearnSpellHours(rank)).toBe(expected);
    });

    test("with Magical Shorthand feat returns 10 minutes (1/6 hour)", () => {
        const actor = { items: [{ slug: "magical-shorthand" }] };
        expect(getLearnSpellHours("9", actor as unknown as ActorPF2e)).toBeCloseTo(1 / 6);
    });

    test("with Magical Shorthand overrides cantrip too", () => {
        const actor = { items: [{ slug: "magical-shorthand" }] };
        expect(getLearnSpellHours("cantrip", actor as unknown as ActorPF2e)).toBeCloseTo(1 / 6);
    });
});

describe("getLearnSpellDcAdjustment", () => {
    test.for([
        [0, 0],
        [5, 5],
        [-2, -2],
        [undefined, 0],
    ])("setting %s to adjustment %i", ([setting, expected]) => {
        vi.stubGlobal("game", { settings: { get: () => setting } });
        expect(getLearnSpellDcAdjustment()).toBe(expected);
    });
});

describe("spellIdentifier", () => {
    test("extracts slug-based identifier", () => {
        const s = { name: "Fireball", system: { slug: "fireball" } } as unknown as SpellPF2e;
        expect(spellIdentifier(s)).toBe("slug:fireball");
    });

    test("extracts sourceId-based identifier", () => {
        const s = {
            name: "Light",
            sourceId: "Compendium.pf2e.spells-srd.Item.abc",
        } as unknown as SpellPF2e;
        expect(spellIdentifier(s)).toBe("sourceId:Compendium.pf2e.spells-srd.Item.abc");
    });

    test("prefers sourceId over slug", () => {
        const s = {
            name: "double",
            system: { slug: "slug-falls-back" },
            sourceId: "Compendium.x.y",
        } as unknown as SpellPF2e;
        expect(spellIdentifier(s)).toBe("sourceId:Compendium.x.y");
    });

    test("falls back to _stats.compendiumSource", () => {
        const s = {
            _stats: { compendiumSource: "Compendium.pf2e.spells-srd.Item.def456" },
        } as unknown as SpellPF2e;
        expect(spellIdentifier(s)).toBe("sourceId:Compendium.pf2e.spells-srd.Item.def456");
    });

    test("returns null when neither slug nor sourceId is available", () => {
        const s = { name: "orphan" } as unknown as SpellPF2e;
        expect(spellIdentifier(s)).toBeNull();
    });
});

describe("getSpellTraitsAndRank", () => {
    test("resolves rank and traditions", () => {
        const s = {
            name: "Fireball",
            system: {
                level: { value: 3 },
                traits: { value: ["fire", "evocation"], traditions: ["arcane", "primal"] },
            },
        } as unknown as SpellPF2e;
        const result = getSpellTraitsAndRank(s);
        expect(result).toEqual({
            traits: ["fire", "evocation"],
            traditions: ["arcane", "primal"],
            rarity: "common",
            rankKey: "3",
            spellName: "Fireball",
        });
    });

    test("cantrip detection via trait", () => {
        const s = {
            name: "Light",
            system: { level: { value: 0 }, traits: { value: ["cantrip"] } },
        } as unknown as SpellPF2e;
        const result = getSpellTraitsAndRank(s);
        expect(result?.rankKey).toBe("cantrip");
    });

    test("cantrip detection via zero level", () => {
        const s = {
            name: "Detect Magic",
            system: { level: { value: 0 }, traits: { value: [] } },
        } as unknown as SpellPF2e;
        const result = getSpellTraitsAndRank(s);
        expect(result?.rankKey).toBe("cantrip");
    });
});

const ONE_WEEK = 604800;
const SPELL_ID = "Compendium.pf2e.spells-srd.Item.fireball";
const SANITIZED_KEY = "Compendium!pf2e!spells-srd!Item!fireball";

function actorStub(overrides: {
    level?: number;
    hasMagicalShorthand?: boolean;
    learnFailures?: Record<string, { level: number; timestamp: number }>;
}): ActorPF2e {
    return {
        system: { details: { level: { value: overrides.level ?? 1 } } },
        items: overrides.hasMagicalShorthand ? [{ slug: "magical-shorthand" }] : [],
        getFlag(_module: string, key: string) {
            if (key === "learnSpellFailures") return overrides.learnFailures ?? {};
            return undefined;
        },
    } as unknown as ActorPF2e;
}

describe("hasLearnFailureAtCurrentLevel", () => {
    test("false when no failure is recorded", () => {
        expect(hasLearnFailureAtCurrentLevel(actorStub({}), SPELL_ID)).toBe(false);
    });

    test("false when actor has leveled past the failure", () => {
        const actor = actorStub({
            level: 4,
            learnFailures: { [SANITIZED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, SPELL_ID)).toBe(false);
    });

    test("true when actor is at the same level as the failure", () => {
        const actor = actorStub({
            level: 3,
            learnFailures: { [SANITIZED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, SPELL_ID)).toBe(true);
    });

    test("true when actor is below the failure level", () => {
        const actor = actorStub({
            level: 2,
            learnFailures: { [SANITIZED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, SPELL_ID)).toBe(true);
    });

    test("true when Magical Shorthand actor is level-blocked and < 1 week elapsed", () => {
        vi.stubGlobal("game", {
            ...game,
            time: { worldTime: 100 + ONE_WEEK - 1 },
        });
        const actor = actorStub({
            level: 3,
            hasMagicalShorthand: true,
            learnFailures: { [SANITIZED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, SPELL_ID)).toBe(true);
    });

    test("false when Magical Shorthand actor is level-blocked but 1 week has elapsed", () => {
        vi.stubGlobal("game", {
            ...game,
            time: { worldTime: 100 + ONE_WEEK },
        });
        const actor = actorStub({
            level: 3,
            hasMagicalShorthand: true,
            learnFailures: { [SANITIZED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, SPELL_ID)).toBe(false);
    });

    test("true without Magical Shorthand even after 1 week", () => {
        vi.stubGlobal("game", {
            ...game,
            time: { worldTime: 100 + ONE_WEEK },
        });
        const actor = actorStub({
            level: 3,
            learnFailures: { [SANITIZED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, SPELL_ID)).toBe(true);
    });
});
