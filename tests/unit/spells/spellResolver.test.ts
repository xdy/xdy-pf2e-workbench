import { describe, expect, test } from "vitest";
import { isCompendiumUuid } from "../../../src/module/feature/spells/spellResolver.js";

describe("isCompendiumUuid", () => {
    test.for([
        ["Compendium.pf2e.spells-srd.Item.fireball", true],
        ["Compendium.x.y.z", true],
        ["Actor.abc.Item.def", false],
        ["Item.abc", false],
        ["", false],
    ])("%s -> %s", ([uuid, expected]) => {
        expect(isCompendiumUuid(uuid as string)).toBe(expected);
    });
});
