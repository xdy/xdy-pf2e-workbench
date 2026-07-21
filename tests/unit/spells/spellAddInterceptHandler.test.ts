import { beforeEach, describe, expect, test, vi } from "vitest";
import { shouldIntercept } from "../../../src/module/feature/spells/learn/spellAddInterceptHandler.js";
import type { ActorPF2e, ItemPF2e } from "foundry-pf2e";

function setupSettings(spellbookHandler: boolean, generalLearnSpell: boolean): void {
    const values: Record<string, boolean> = {
        enableSpellbookHandler: spellbookHandler,
        enableGeneralLearnSpell: generalLearnSpell,
    };
    vi.stubGlobal("game", {
        settings: {
            get: (_module: string, key: string) => values[key] ?? false,
        },
        i18n: {
            localize: (key: string) => key,
            format: (key: string) => key,
        },
    });
}

function makeActor(overrides: Partial<{ level: number; xp: number; type: string; items: unknown[] }> = {}): ActorPF2e {
    const actor = {
        type: overrides.type ?? "character",
        system: {
            details: {
                level: { value: overrides.level ?? 1 },
                xp: { value: overrides.xp ?? 0 },
            },
        },
        items: overrides.items ?? [],
    };
    return actor as unknown as ActorPF2e;
}

function makeSpellItem(overrides: Partial<{ type: string; actor: ActorPF2e | null }> = {}): ItemPF2e {
    const item = {
        type: overrides.type ?? "spell",
        actor: overrides.actor ?? null,
    };
    return item as unknown as ItemPF2e;
}

interface TestCaseArgs {
    spellbookHandler: boolean;
    generalLearnSpell: boolean;
}

interface ItemArgs {
    type?: string;
    actorLevel?: number;
    actorXp?: number;
    actorIsNull?: boolean;
    actorType?: string;
}

describe("shouldIntercept", () => {
    beforeEach(() => {
        setupSettings(false, false);
    });

    test.for([
        // false cases
        [
            "setting OFF",
            { spellbookHandler: false, generalLearnSpell: false },
            { type: "spell", actorLevel: 3, actorXp: 100 },
            false,
        ],
        [
            "non-spell item type",
            { spellbookHandler: false, generalLearnSpell: true },
            { type: "weapon", actorLevel: 3, actorXp: 100 },
            false,
        ],
        [
            "actor is null",
            { spellbookHandler: false, generalLearnSpell: true },
            { type: "spell", actorIsNull: true },
            false,
        ],
        [
            "actor is NPC",
            { spellbookHandler: false, generalLearnSpell: true },
            { type: "spell", actorLevel: 3, actorXp: 100, actorType: "npc" },
            false,
        ],
        [
            "level 1, 0 XP (starting character)",
            { spellbookHandler: false, generalLearnSpell: true },
            { type: "spell", actorLevel: 1, actorXp: 0 },
            true,
        ],
        // true cases
        [
            "spell, character, setting ON, level 3 with XP",
            { spellbookHandler: false, generalLearnSpell: true },
            { type: "spell", actorLevel: 3, actorXp: 100 },
            true,
        ],
        [
            "level 1, non-zero XP",
            { spellbookHandler: false, generalLearnSpell: true },
            { type: "spell", actorLevel: 1, actorXp: 50 },
            true,
        ],
    ])("%s", ([_desc, settings, itemArgs, expected]) => {
        setupSettings((settings as TestCaseArgs).spellbookHandler, (settings as TestCaseArgs).generalLearnSpell);
        const ia = itemArgs as ItemArgs;
        const actor = ia.actorIsNull ? null : makeActor({ level: ia.actorLevel, xp: ia.actorXp, type: ia.actorType });
        const item = makeSpellItem({ type: ia.type, actor: actor as ActorPF2e | null });
        expect(shouldIntercept(item)).toBe(expected);
    });
});
