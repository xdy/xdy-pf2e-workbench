import { describe, expect, test } from "vitest";
import { isLocked, withLock } from "../../../src/module/utils/locks.js";

const SCOPE = "test-scope";

describe("withLock", () => {
    test("runs callback and unlocks afterwards", async () => {
        let called = false;
        const result = await withLock(SCOPE, async () => {
            expect(isLocked(SCOPE)).toBe(true);
            called = true;
            return 42;
        });

        expect(called).toBe(true);
        expect(result).toBe(42);
        expect(isLocked(SCOPE)).toBe(false);
    });

    test("unlocks even when callback throws", async () => {
        await expect(
            withLock(SCOPE, async () => {
                throw new Error("oops");
            }),
        ).rejects.toThrow("oops");

        expect(isLocked(SCOPE)).toBe(false);
    });
});
