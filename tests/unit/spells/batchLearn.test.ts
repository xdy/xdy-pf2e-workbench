import { describe, expect, test } from "vitest";
import { computeEffectiveCost } from "../../../src/module/feature/spells/learn/batchLearn.js";
import type { LearnOutcome } from "../../../src/module/feature/spells/types.js";
import { isSuccessOutcome } from "../../../src/module/feature/spells/types.js";

describe("outcome type guards", () => {
    const outcomes: (LearnOutcome | null | undefined)[] = [
        "criticalSuccess",
        "success",
        "failure",
        "criticalFailure",
        "skipped",
        "alreadyKnown",
    ];

    test.for(outcomes)("isSuccessOutcome(%s)", (outcome) => {
        expect(isSuccessOutcome(outcome)).toBe(outcome === "criticalSuccess" || outcome === "success");
    });
});

describe("computeEffectiveCost", () => {
    test.for([
        ["success", 500, 500],
        ["criticalSuccess", 500, 250],
        ["criticalSuccess", 501, 250],
        ["criticalFailure", 500, 250],
        ["failure", 500, 0],
        ["skipped", 500, 0],
        ["alreadyKnown", 500, 500],
        [null, 500, 500],
        [undefined, 500, 500],
    ])("%s cost %i -> %i", ([outcome, cost, expected]) => {
        expect(computeEffectiveCost(cost as number, outcome as LearnOutcome | null | undefined)).toBe(expected);
    });
});
