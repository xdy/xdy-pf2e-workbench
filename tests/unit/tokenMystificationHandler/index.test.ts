import { beforeEach, describe, expect, test, vi } from "vitest";
import { canMystify, isTokenMystified } from "../../../src/module/feature/tokenMystificationHandler/index.ts";

vi.mock("../../../src/module/settings/npc-mystification.ts", () => ({
    mystifyModifierKey: "",
    mystifyRandomPropertyType: "",
}));

describe("isTokenMystified", () => {
    function makeToken(name: string, prototypeName: string) {
        return {
            name,
            actor: { prototypeToken: { name: prototypeName } },
        };
    }

    test("false when token name contains prototype name", () => {
        expect(isTokenMystified(makeToken("Goblin Warrior", "Goblin"))).toBe(false);
    });

    test("true when token name does not contain prototype name", () => {
        expect(isTokenMystified(makeToken("Small Humanoid Warrior", "Goblin"))).toBe(true);
    });

    test("false when prototype name is empty and token has name", () => {
        expect(isTokenMystified(makeToken("Anything", ""))).toBe(false);
    });

    test("true when token name is empty and prototype name is set", () => {
        expect(isTokenMystified(makeToken("", "Goblin"))).toBe(true);
    });

    test("false when both names are empty", () => {
        expect(isTokenMystified(makeToken("", ""))).toBe(false);
    });

    test("false when token has no actor (prototype name falls back to empty string)", () => {
        const token = { name: "Something" };
        expect(isTokenMystified(token)).toBe(false);
    });
});

describe("canMystify", () => {
    beforeEach(() => {
        vi.unstubAllGlobals();
    });

    test.for([
        ["GM + canvas -> true", true, true, true],
        ["not GM -> false", false, true, false],
        ["no canvas -> false", true, false, false],
    ])("%s", ([_desc, isGM, hasCanvas, expected]) => {
        vi.stubGlobal("game", { user: { isGM } });
        vi.stubGlobal("canvas", hasCanvas ? { tokens: {} } : undefined);
        if (expected) {
            expect(canMystify()).toBeTruthy();
        } else {
            expect(canMystify()).toBeFalsy();
        }
    });
});
