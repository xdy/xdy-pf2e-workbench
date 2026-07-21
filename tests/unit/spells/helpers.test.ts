import { beforeEach, describe, expect, test, vi } from "vitest";
import { hasLearnFailureAtCurrentLevel } from "../../../src/module/feature/spells/helpers.js";
import { sanitizeFlagKey } from "../../../src/module/feature/spells/flags.js";
import {
    getLearnSpellCostCopper,
    getLearnSpellDcAdjustment,
    getLearnSpellHours,
    getSpellTraitsAndRank,
    spellIdentifier,
} from "../../../src/module/feature/spells/spellData.js";
import { ActorPF2e } from "foundry-pf2e";

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
        expect(spellIdentifier({ name: "Fireball", system: { slug: "fireball" } })).toBe("slug:fireball");
    });

    test("extracts sourceId-based identifier", () => {
        expect(spellIdentifier({ name: "Light", sourceId: "Compendium.pf2e.spells-srd.Item.abc" })).toBe(
            "sourceId:Compendium.pf2e.spells-srd.Item.abc",
        );
    });

    test("prefers sourceId over slug", () => {
        expect(
            spellIdentifier({
                name: "double",
                system: { slug: "slug-falls-back" },
                sourceId: "Compendium.x.y",
            }),
        ).toBe("sourceId:Compendium.x.y");
    });

    test("returns null when neither slug nor sourceId is available", () => {
        expect(spellIdentifier({ name: "orphan" })).toBeNull();
    });
});

describe("getSpellTraitsAndRank", () => {
    test("resolves rank and traditions", () => {
        const result = getSpellTraitsAndRank({
            name: "Fireball",
            system: {
                level: { value: 3 },
                traits: { value: ["fire", "evocation"], traditions: ["arcane", "primal"] },
            },
        });
        expect(result).toEqual({
            traits: ["fire", "evocation"],
            traditions: ["arcane", "primal"],
            rankKey: "3",
            spellName: "Fireball",
        });
    });

    test("cantrip detection via trait", () => {
        const result = getSpellTraitsAndRank({
            name: "Light",
            system: { level: { value: 0 }, traits: { value: ["cantrip"] } },
        });
        expect(result?.rankKey).toBe("cantrip");
    });

    test("cantrip detection via zero level", () => {
        const result = getSpellTraitsAndRank({
            name: "Detect Magic",
            system: { level: { value: 0 }, traits: { value: [] } },
        });
        expect(result?.rankKey).toBe("cantrip");
    });

    test("returns null when level is absent", () => {
        const result = getSpellTraitsAndRank({ name: "ghost", system: {} });
        expect(result).toBeNull();
    });

    test("handles spell without traits array", () => {
        const result = getSpellTraitsAndRank({ name: "Plain", system: { level: { value: 2 } } });
        expect(result).toEqual({
            traits: [],
            traditions: [],
            rankKey: "2",
            spellName: "Plain",
        });
    });
});

const ONE_WEEK = 604800;
const SPELL_ID = "Compendium.pf2e.spells-srd.Item.fireball";
const FLAGGED_KEY = sanitizeFlagKey(SPELL_ID);

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
        expect(hasLearnFailureAtCurrentLevel(actorStub({}), FLAGGED_KEY)).toBe(false);
    });

    test("false when actor has leveled past the failure", () => {
        const actor = actorStub({
            level: 4,
            learnFailures: { [FLAGGED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, FLAGGED_KEY)).toBe(false);
    });

    test("true when actor is at the same level as the failure", () => {
        const actor = actorStub({
            level: 3,
            learnFailures: { [FLAGGED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, FLAGGED_KEY)).toBe(true);
    });

    test("true when actor is below the failure level", () => {
        const actor = actorStub({
            level: 2,
            learnFailures: { [FLAGGED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, FLAGGED_KEY)).toBe(true);
    });

    test("true when Magical Shorthand actor is level-blocked and < 1 week elapsed", () => {
        vi.stubGlobal("game", {
            ...game,
            time: { worldTime: 100 + ONE_WEEK - 1 },
        });
        const actor = actorStub({
            level: 3,
            hasMagicalShorthand: true,
            learnFailures: { [FLAGGED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, FLAGGED_KEY)).toBe(true);
    });

    test("false when Magical Shorthand actor is level-blocked but 1 week has elapsed", () => {
        vi.stubGlobal("game", {
            ...game,
            time: { worldTime: 100 + ONE_WEEK },
        });
        const actor = actorStub({
            level: 3,
            hasMagicalShorthand: true,
            learnFailures: { [FLAGGED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, FLAGGED_KEY)).toBe(false);
    });

    test("true without Magical Shorthand even after 1 week", () => {
        vi.stubGlobal("game", {
            ...game,
            time: { worldTime: 100 + ONE_WEEK },
        });
        const actor = actorStub({
            level: 3,
            learnFailures: { [FLAGGED_KEY]: { level: 3, timestamp: 100 } },
        });
        expect(hasLearnFailureAtCurrentLevel(actor, FLAGGED_KEY)).toBe(true);
    });
});
