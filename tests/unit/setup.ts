import { vi } from "vitest";

vi.stubGlobal("game", {
    system: { id: "pf2e" },
    user: { isGM: true, id: "gm1" },
    users: { activeGM: { id: "gm1" } },
    settings: {
        get: () => ({}),
        set: () => Promise.resolve(),
    },
    socket: { on: () => {}, emit: () => {} },
    time: { worldTime: 1000000 },
    i18n: {
        localize: (key: string) => key,
        format: (key: string, data?: Record<string, unknown>) => (data ? `${key} ${JSON.stringify(data)}` : key),
        lang: "en",
    },
    packs: {
        get: () => null,
    },
    pf2e: {
        system: {
            sluggify: (s: string) => s.toLowerCase().replace(/\s+/g, "-"),
        },
    },
});

vi.stubGlobal("fromUuid", vi.fn().mockResolvedValue(null));

vi.stubGlobal("fu", {
    mergeObject: (a: any, b: any) => ({ ...a, ...b }),
    duplicate: (x: any) => structuredClone(x),
    getProperty: (obj: any, path: string) => path.split(".").reduce((o, k) => o?.[k], obj),
    setProperty: (obj: any, path: string, val: any) => {
        const parts = path.split(".");
        const last = parts.pop()!;
        const target = parts.reduce((o, k) => (o[k] ??= {}), obj);
        target[last] = val;
    },
});

vi.stubGlobal("foundry", {
    applications: {
        api: {
            ApplicationV2: class {},
            HandlebarsApplicationMixin: vi.fn().mockReturnValue(class {}),
            DialogV2: {
                confirm: vi.fn().mockResolvedValue(false),
                wait: vi.fn().mockResolvedValue(null),
            },
        },
        handlebars: {
            renderTemplate: vi.fn().mockResolvedValue(""),
        },
    },
    abstract: {
        Document: class {},
    },
});

vi.stubGlobal("CONFIG", {});

vi.stubGlobal("Hooks", {
    on: () => {},
    once: () => {},
    off: () => {},
    call: () => {},
    callAll: () => {},
});

vi.stubGlobal("TextEditor", {
    getDragEventData: () => null,
});

vi.stubGlobal("ChatMessage", {
    create: vi.fn().mockResolvedValue(undefined),
    getSpeaker: () => ({}),
});

vi.stubGlobal("ui", {
    notifications: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
    },
});
