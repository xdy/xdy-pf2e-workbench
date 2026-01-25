/**
 * System utilities for handling both PF2e and SF2e systems.
 */

export enum GameSystem {
    PF2E = "pf2e",
    SF2E = "sf2e",
}

interface FlaggableObject {
    flags?: Record<string, Record<string, unknown>>;
}

interface FlagOperableObject extends FlaggableObject {
    setFlag?: (scope: string, key: string, value: unknown) => Promise<unknown>;
    unsetFlag?: (scope: string, key: string) => Promise<unknown>;
}

export function getSystemId(): GameSystem {
    const DEFAULT_SYSTEM = GameSystem.PF2E;
    const systemId = String(game.system.id);
    return systemId === GameSystem.SF2E ? GameSystem.SF2E : DEFAULT_SYSTEM;
}

export function getFlag<T = unknown>(obj: FlaggableObject, path: string): T | undefined {
    // Supports dot notation, e.g., "context.type"
    const systemId = getSystemId();
    const systemFlags = obj?.flags?.[systemId];
    if (!systemFlags) return undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return path.split(".").reduce((acc: any, part) => acc?.[part], systemFlags) as T | undefined;
}

export async function setFlag(obj: FlagOperableObject, path: string, value: unknown): Promise<unknown> {
    const systemId = getSystemId();
    const flagPath = `${systemId}.${path}`;
    if (typeof obj.setFlag === "function") {
        return await obj.setFlag("core", flagPath, value);
    }
    throw new Error("Object does not support setFlag method");
}

export async function unsetFlag(obj: FlagOperableObject, path: string): Promise<unknown> {
    const systemId = getSystemId();
    const flagPath = `${systemId}.${path}`;
    if (typeof obj.unsetFlag === "function") {
        return await obj.unsetFlag("core", flagPath);
    }
    throw new Error("Object does not support unsetFlag method");
}

export function getSystemSetting<T = unknown>(namespace: string, key: string): T {
    const systemId = getSystemId();
    return game.settings.get(systemId, `${namespace}.${key}`) as T;
}

export async function setSystemSetting(namespace: string, key: string, value: unknown): Promise<unknown> {
    const systemId = getSystemId();
    return await game.settings.set(systemId, `${namespace}.${key}`, value);
}

export function getSetting<T = unknown>(key: string): T {
    const systemId = getSystemId();
    return game.settings.get(systemId, key) as T;
}

export async function setSetting(key: string, value: unknown): Promise<unknown> {
    const systemId = getSystemId();
    return await game.settings.set(systemId, key, value);
}

export function getPackName(baseName: string): string {
    const systemId = getSystemId();
    return systemId === GameSystem.SF2E ? `${baseName}-sf2e` : baseName;
}

export function getModulePackId(packBaseName: string, moduleId = "xdy-pf2e-workbench"): string {
    const systemSpecificName = getPackName(packBaseName);
    return `${moduleId}.${systemSpecificName}`;
}

