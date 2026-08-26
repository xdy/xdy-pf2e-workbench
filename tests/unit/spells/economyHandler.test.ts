import { beforeEach, describe, expect, test, vi } from "vitest";
import { formatCostForDisplay } from "../../../src/module/feature/spells/economyHandler.js";

beforeEach(() => {
    vi.stubGlobal("game", {
        ...(game as unknown as Record<string, unknown>),
        i18n: {
            localize: (key: string) => key,
            format: (key: string, data?: Record<string, unknown>) => {
                const value = (data as { amount?: number } | undefined)?.amount;
                return typeof value === "number" ? `${value} ${key}` : key;
            },
        },
    });
});

describe("formatCostForDisplay", () => {
    test("formats pf2e copper as gp", () => {
        expect(formatCostForDisplay(200)).toBe("2 xdy-pf2e-workbench.spellShared.currencyGp");
        expect(formatCostForDisplay(600)).toBe("6 xdy-pf2e-workbench.spellShared.currencyGp");
        expect(formatCostForDisplay(150)).toBe("1.5 xdy-pf2e-workbench.spellShared.currencyGp");
        expect(formatCostForDisplay(0)).toBe("0 xdy-pf2e-workbench.spellShared.currencyGp");
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
        expect(formatCostForDisplay(20)).toBe("2 xdy-pf2e-workbench.spellShared.currencyCredits");
        expect(formatCostForDisplay(15)).toBe("2 xdy-pf2e-workbench.spellShared.currencyCredits");
        expect(formatCostForDisplay(60)).toBe("6 xdy-pf2e-workbench.spellShared.currencyCredits");
        expect(formatCostForDisplay(10)).toBe("1 xdy-pf2e-workbench.spellShared.currencyCredits");
        expect(formatCostForDisplay(0)).toBe("0 xdy-pf2e-workbench.spellShared.currencyCredits");
    });
});
