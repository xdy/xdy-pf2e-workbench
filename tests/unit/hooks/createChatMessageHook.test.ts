import { describe, expect, test } from "vitest";
import { messageFromUnhandledModule } from "../../../src/module/hooks/createChatMessageHook.ts";

describe("messageFromUnhandledModule", () => {
    test("returns false when message flags are undefined", () => {
        const message = {} as any;
        expect(messageFromUnhandledModule(message)).toBe(false);
    });

    test("returns false when message flags are empty", () => {
        const message = { flags: {} } as any;
        expect(messageFromUnhandledModule(message)).toBe(false);
    });

    test("returns true when pf2e-ranged-combat flag is present", () => {
        const message = {
            flags: {
                "pf2e-ranged-combat": { someData: true },
            },
        } as any;
        expect(messageFromUnhandledModule(message)).toBe(true);
    });

    test("returns true when pf2e-dailies flag is present", () => {
        const message = {
            flags: {
                "pf2e-dailies": { someData: true },
            },
        } as any;
        expect(messageFromUnhandledModule(message)).toBe(true);
    });
});
