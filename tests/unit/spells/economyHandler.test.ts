import { beforeEach, describe, expect, test, vi } from "vitest";
import { formatCostForDisplay } from "../../../src/module/feature/spells/economyHandler.js";

function stubGameAsGM(): void {
    vi.stubGlobal("game", {
        system: { id: "pf2e" },
        user: { isGM: true, id: "gm1" },
        users: { activeGM: { id: "gm1" } },
        settings: { get: () => ({}) },
        socket: { on: () => {}, emit: () => {} },
        i18n: {
            localize: (key: string) => key,
            format: (key: string) => key,
        },
    });
}

beforeEach(() => {
    stubGameAsGM();
});

describe("formatCostForDisplay", () => {
    test("formats pf2e copper as gp", () => {
        expect(formatCostForDisplay(200)).toBe("2 gp");
        expect(formatCostForDisplay(600)).toBe("6 gp");
        expect(formatCostForDisplay(150)).toBe("1.5 gp");
        expect(formatCostForDisplay(0)).toBe("0 gp");
    });
});

describe("formatCostForDisplay sf2e", () => {
    beforeEach(() => {
        vi.stubGlobal("game", {
            ...(game as any),
            system: { id: "sf2e" },
        });
    });

    test("formats sf2e copper as credits (rounds up)", () => {
        expect(formatCostForDisplay(20)).toBe("2 credits");
        expect(formatCostForDisplay(15)).toBe("2 credits");
        expect(formatCostForDisplay(60)).toBe("6 credits");
        expect(formatCostForDisplay(10)).toBe("1 credit");
        expect(formatCostForDisplay(0)).toBe("0 credits");
    });
});
