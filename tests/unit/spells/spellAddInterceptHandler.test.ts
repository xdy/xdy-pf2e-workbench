import { beforeEach, describe, expect, test, vi } from "vitest";
import { shouldIntercept } from "../../../src/module/feature/spells/spellAddInterceptHandler.js";
import type { ActorPF2e, ItemPF2e } from "foundry-pf2e";

function setupSettings(generalLearnSpell: boolean): void {
    const values: Record<string, boolean> = {
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

function makeSpellItem(
    overrides: Partial<{ type: string; actor: ActorPF2e | null; flags: Record<string, unknown> }> = {},
): ItemPF2e {
    const item = {
        type: overrides.type ?? "spell",
        actor: overrides.actor ?? null,
        flags: overrides.flags ?? {},
    };
    return item as unknown as ItemPF2e;
}

interface TestCaseArgs {
    generalLearnSpell: boolean;
}

interface ItemArgs {
    type?: string;
    actorLevel?: number;
    actorXp?: number;
    actorIsNull?: boolean;
    actorType?: string;
    flags?: Record<string, unknown>;
}

describe("shouldIntercept", () => {
    beforeEach(() => {
        setupSettings(false);
    });

    test.for([
        ["setting OFF", { generalLearnSpell: false }, { type: "spell", actorLevel: 3, actorXp: 100 }, false],
        ["non-spell item type", { generalLearnSpell: true }, { type: "weapon", actorLevel: 3, actorXp: 100 }, false],
        ["actor is null", { generalLearnSpell: true }, { type: "spell", actorIsNull: true }, false],
        [
            "actor is NPC",
            { generalLearnSpell: true },
            { type: "spell", actorLevel: 3, actorXp: 100, actorType: "npc" },
            false,
        ],
        [
            "pf2e-dailies flag set",
            { generalLearnSpell: true },
            { type: "spell", actorLevel: 3, actorXp: 100, flags: { "pf2e-dailies": true } },
            false,
        ],
        [
            "character in creation (level 1, xp 0)",
            { generalLearnSpell: true },
            { type: "spell", actorLevel: 1, actorXp: 0 },
            false,
        ],
        [
            "valid character with xp > 0",
            { generalLearnSpell: true },
            { type: "spell", actorLevel: 1, actorXp: 10 },
            true,
        ],
        ["valid character level > 1", { generalLearnSpell: true }, { type: "spell", actorLevel: 2, actorXp: 0 }, true],
    ])("%s", ([_desc, settings, itemArgs, expected]) => {
        setupSettings((settings as TestCaseArgs).generalLearnSpell);
        const ia = itemArgs as ItemArgs;
        const actor = ia.actorIsNull ? null : makeActor({ level: ia.actorLevel, xp: ia.actorXp, type: ia.actorType });
        const item = makeSpellItem({ type: ia.type, actor: actor as ActorPF2e | null, flags: ia.flags });
        expect(shouldIntercept(item)).toBe(expected);
    });
});
