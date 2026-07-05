import { describe, expect, test } from "vitest";
import { actorHasItemBySlug, getModuleFlag } from "../../src/module/utils.ts";

describe("actorHasItemBySlug", () => {
    function actorWithItems(items: { slug?: string; type?: string }[]): any {
        return { items } as any;
    }

    test("returns true when matching slug exists", () => {
        const actor = actorWithItems([
            { slug: "dwarven-doughtiness", type: "feat" },
            { slug: "toughness", type: "feat" },
        ]);
        expect(actorHasItemBySlug(actor, "dwarven-doughtiness")).toBe(true);
    });

    test("returns false when slug not found", () => {
        const actor = actorWithItems([{ slug: "toughness", type: "feat" }]);
        expect(actorHasItemBySlug(actor, "dwarven-doughtiness")).toBe(false);
    });

    test("skips items without slug property", () => {
        const actor = actorWithItems([{ type: "feat" }, { slug: "found-it", type: "feat" }]);
        expect(actorHasItemBySlug(actor, "found-it")).toBe(true);
    });
});

describe("getModuleFlag", () => {
    test.for([
        ["value present", { flag: 42 }, undefined, 42],
        ["undefined -> undefined", { flag: undefined }, undefined, undefined],
        ["undefined -> fallback", { flag: undefined }, 99, 99],
        ["null -> undefined", { flag: null }, undefined, undefined],
        ["null -> fallback", { flag: null }, "fallback", "fallback"],
        ["null doc, no fallback", null, undefined, undefined],
        ["null doc, fallback", null, "fallback", "fallback"],
        ["no getFlag, no fallback", {}, undefined, undefined],
        ["no getFlag, fallback", {}, "fallback", "fallback"],
        ["falsy zero is valid", { flag: 0 }, undefined, 0],
        ["falsy empty string is valid", { flag: "" }, "fallback", ""],
    ])("%s", ([_desc, docOrFlag, fallback, expected]) => {
        const doc =
            docOrFlag === null
                ? null
                : "flag" in (docOrFlag as Record<string, unknown>)
                  ? { getFlag: () => (docOrFlag as Record<string, unknown>).flag }
                  : (docOrFlag as { getFlag?: never });
        expect(getModuleFlag(doc as any, "test.flag", fallback as any)).toBe(expected);
    });
});
