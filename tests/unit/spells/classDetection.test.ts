import type { ActorPF2e } from "foundry-pf2e";
import { describe, expect, test } from "vitest";
import { actorHasItemBySlug } from "../../../src/module/utils.ts";

describe("hasMagicalShorthand", () => {
    test("true when actor has the magical-shorthand feat", () => {
        const actor = { items: [{ slug: "magical-shorthand" }] };
        expect(actorHasItemBySlug(actor as unknown as ActorPF2e, "magical-shorthand")).toBe(true);
    });

    test("false when actor does not", () => {
        const actor = { items: [{ slug: "fireball" }] };
        expect(actorHasItemBySlug(actor as unknown as ActorPF2e, "magical-shorthand")).toBe(false);
    });

    test("false when actor has no items", () => {
        expect(actorHasItemBySlug({ items: [] } as unknown as ActorPF2e, "magical-shorthand")).toBe(false);
    });
});
