import { describe, expect, test } from "vitest";
import { formatLearningTime } from "../../../src/module/feature/spells/helpers.js";

const MINUTES_KEY = "xdy-pf2e-workbench.spellShared.learnSpellTime10Minutes";
const HOURS_KEY = "xdy-pf2e-workbench.spellShared.learnSpellTimeHours";
const HOURS_MINUTES_KEY = "xdy-pf2e-workbench.spellShared.learnSpellTimeHoursMinutes";

describe("formatLearningTime", () => {
    test("less than 1 hour shows minutes", () => {
        expect(formatLearningTime(0.5)).toBe(`${MINUTES_KEY} {"minutes":30}`);
    });

    test("whole hours shows hours only", () => {
        expect(formatLearningTime(3)).toBe(`${HOURS_KEY} {"hours":3}`);
    });

    test("hours with fractional minutes shows hours and minutes", () => {
        expect(formatLearningTime(2.5)).toBe(`${HOURS_MINUTES_KEY} {"hours":2,"minutes":30}`);
    });
});
