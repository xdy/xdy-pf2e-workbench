import { describe, expect, test } from "vitest";
import { getSkillBasedTraditionGrants } from "../../../src/module/feature/spells/featRules.js";
import type { ActorPF2e } from "foundry-pf2e";

function actorWithItems(items: { type?: string; slug?: string }[]): ActorPF2e {
    return {
        items: items.map((i) => {
            const itemType = i.type ?? "feat";
            // Class items store slug in system.slug; feat/other items at top level for actorHasItemBySlug
            return itemType === "class" ? { type: "class", system: { slug: i.slug } } : { ...i, type: itemType };
        }),
    } as unknown as ActorPF2e;
}

describe("getSkillBasedTraditionGrants", () => {
    test("returns empty set when actor lacks impossible-polymath", () => {
        const actor = actorWithItems([]);
        expect(getSkillBasedTraditionGrants(actor).size).toBe(0);
    });

    test("returns arcane when trained in arcana", () => {
        const actor = {
            items: [{ slug: "impossible-polymath" }],
            skills: { arcana: { rank: 1 } },
        } as unknown as ActorPF2e;
        expect(getSkillBasedTraditionGrants(actor).has("arcane")).toBe(true);
    });

    test("returns multiple traditions for multiple trained skills", () => {
        const actor = {
            items: [{ slug: "impossible-polymath" }],
            skills: { arcana: { rank: 2 }, nature: { rank: 1 }, religion: { rank: 3 } },
        } as unknown as ActorPF2e;
        const grants = getSkillBasedTraditionGrants(actor);
        expect(grants.has("arcane")).toBe(true);
        expect(grants.has("primal")).toBe(true);
        expect(grants.has("divine")).toBe(true);
    });

    test("does not return tradition for untrained skill", () => {
        const actor = {
            items: [{ slug: "impossible-polymath" }],
            skills: { arcana: { rank: 1 }, nature: { rank: 0 } },
        } as unknown as ActorPF2e;
        const grants = getSkillBasedTraditionGrants(actor);
        expect(grants.has("arcane")).toBe(true);
        expect(grants.has("primal")).toBe(false);
    });
});
