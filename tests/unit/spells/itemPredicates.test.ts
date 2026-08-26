import { describe, expect, test } from "vitest";
import { isMystified, isScrollWithSpell } from "../../../src/module/feature/spells/itemPredicates.js";
import type { ItemPF2e } from "foundry-pf2e";

function makeItemStub(overrides: Record<string, unknown> = {}): ItemPF2e {
    return { ...overrides } as unknown as ItemPF2e;
}

describe("isScrollWithSpell", () => {
    test("true for consumable scroll with spell", () => {
        expect(
            isScrollWithSpell(
                makeItemStub({ type: "consumable", system: { category: "scroll", spell: { name: "Fireball" } } }),
            ),
        ).toBe(true);
    });

    test("false when type is not consumable", () => {
        expect(
            isScrollWithSpell(
                makeItemStub({ type: "equipment", system: { category: "scroll", spell: { name: "Fireball" } } }),
            ),
        ).toBe(false);
    });

    test("false when category is not scroll", () => {
        expect(
            isScrollWithSpell(
                makeItemStub({ type: "consumable", system: { category: "potion", spell: { name: "Fireball" } } }),
            ),
        ).toBe(false);
    });

    test("false when spell is missing", () => {
        expect(isScrollWithSpell(makeItemStub({ type: "consumable", system: { category: "scroll" } }))).toBe(false);
    });
});

describe("isMystified", () => {
    test("true when identification status is unidentified", () => {
        expect(isMystified(makeItemStub({ system: { identification: { status: "unidentified" } } }))).toBe(true);
    });

    test("false when identification is absent or identified", () => {
        expect(isMystified(makeItemStub({ system: { identification: { status: "identified" } } }))).toBe(false);
        expect(isMystified(makeItemStub({ system: {} }))).toBe(false);
    });
});
