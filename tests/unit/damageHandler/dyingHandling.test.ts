import { describe, expect, test } from "vitest";

function isRelevantForActor(actorType: string, option: string): boolean {
    if (!option) return false;
    return option.endsWith("ForCharacters") ? ["character", "familiar"].includes(actorType) : true;
}

describe("isRelevantForActor", () => {
    describe("when option is empty", () => {
        test("returns false", () => {
            expect(isRelevantForActor("character", "")).toBe(false);
            expect(isRelevantForActor("npc", "")).toBe(false);
        });
    });

    describe("when option starts with 'no'", () => {
        test("returns true (caller handles 'no' prefix separately)", () => {
            expect(isRelevantForActor("character", "no")).toBe(true);
            expect(isRelevantForActor("npc", "no")).toBe(true);
        });
    });

    describe("when option ends with 'ForCharacters'", () => {
        test("allows character and familiar types", () => {
            expect(isRelevantForActor("character", "optionForCharacters")).toBe(true);
            expect(isRelevantForActor("familiar", "optionForCharacters")).toBe(true);
        });

        test("rejects other types", () => {
            expect(isRelevantForActor("npc", "optionForCharacters")).toBe(false);
            expect(isRelevantForActor("hazard", "optionForCharacters")).toBe(false);
        });
    });

    describe("when option does not end with 'ForCharacters'", () => {
        test("allows all actor types", () => {
            expect(isRelevantForActor("character", "option")).toBe(true);
            expect(isRelevantForActor("npc", "option")).toBe(true);
            expect(isRelevantForActor("familiar", "option")).toBe(true);
            expect(isRelevantForActor("hazard", "option")).toBe(true);
        });
    });
});
