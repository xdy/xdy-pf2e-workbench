import { describe, expect, test } from "vitest";
import { calculateLearnDc, getSpellDocData } from "../../../src/module/feature/spells/spellData.js";

describe("calculateLearnDc", () => {
    test.each([
        ["cantrip", 15],
        ["1", 15],
        ["3", 20],
        ["9", 36],
        ["10", 41],
        ["99 (unknown)", 15],
    ])("rank %s common to DC %i", (rank, expected) => {
        expect(calculateLearnDc(rank, ["common"])).toBe(expected);
    });

    test.each([
        ["common", 15],
        ["uncommon", 17],
        ["rare", 20],
        ["unique", 25],
    ])("level 1 %s to DC %i", (rarity, expected) => {
        expect(calculateLearnDc("1", [rarity])).toBe(expected);
    });

    test.each([
        { desc: "unknown non-rarity trait defaults to common", traits: ["magic"], rank: "3", expected: 20 },
        { desc: "empty traits defaults to common", traits: [], rank: "3", expected: 20 },
        { desc: "case-insensitive (UNCOMMON)", traits: ["UNCOMMON"], rank: "1", expected: 17 },
        { desc: "case-insensitive (Rare)", traits: ["Rare"], rank: "1", expected: 20 },
        { desc: "first matching rarity wins", traits: ["fire", "uncommon", "rare"], rank: "1", expected: 17 },
    ])("$desc", ({ traits, rank, expected }) => {
        expect(calculateLearnDc(rank, traits)).toBe(expected);
    });

    test.each([
        [0, 15],
        [-2, 13],
        [5, 20],
        [-20, -5],
    ])("modifier %i to DC %i", (mod, expected) => {
        expect(calculateLearnDc("1", ["common"], mod)).toBe(expected);
    });

    test("unknown rank with rarity still adjusts", () => {
        expect(calculateLearnDc("99", ["rare"])).toBe(20);
    });
});

describe("getSpellDocData", () => {
    test("uses toObject when available", () => {
        const toObject = () => ({ name: "Fireball", system: { level: { value: 3 } } });
        const spell = { name: "original", toObject };
        expect(getSpellDocData(spell as never)).toEqual({ name: "Fireball", system: { level: { value: 3 } } });
    });

    test("returns data as-is when toObject is absent", () => {
        const data = { name: "plain", system: { slug: "test" } };
        expect(getSpellDocData(data)).toEqual(data);
    });
});
