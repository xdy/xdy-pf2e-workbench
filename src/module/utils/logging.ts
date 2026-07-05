import { MODULENAME } from "../constants.ts";

export const enum LogLevel {
    Trace = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
}

// Bind so each method preserves `this` when called as a standalone function reference.
const LOG_METHODS: Record<LogLevel, (...args: unknown[]) => void> = {
    [LogLevel.Trace]: console.trace.bind(console),
    [LogLevel.Debug]: console.debug.bind(console),
    [LogLevel.Info]: console.info.bind(console),
    [LogLevel.Warn]: console.warn.bind(console),
    [LogLevel.Error]: console.error.bind(console),
};

let cachedLevel: LogLevel | null = null;

function resolveLogLevel(): LogLevel {
    try {
        const raw = game.settings.get(MODULENAME, "logLevel");
        const level = raw !== null ? (Number(raw) as LogLevel) : LogLevel.Info;
        return level >= LogLevel.Trace && level <= LogLevel.Error ? level : LogLevel.Info;
    } catch {
        // Settings not registered yet (early boot). Fall back to Info until ready.
        return LogLevel.Info;
    }
}

function getLogLevelSetting(): LogLevel {
    if (cachedLevel !== null) return cachedLevel;
    cachedLevel = resolveLogLevel();
    return cachedLevel;
}

export function resetLogLevelCache(): void {
    cachedLevel = null;
}

function log(logLevel: LogLevel, ...args: unknown[]): void {
    if (logLevel < getLogLevelSetting()) return;
    LOG_METHODS[logLevel](...args);
}

export function logTrace(...args: unknown[]): void {
    log(LogLevel.Trace, ...args);
}

export function logDebug(...args: unknown[]): void {
    log(LogLevel.Debug, ...args);
}

export function logInfo(...args: unknown[]): void {
    log(LogLevel.Info, ...args);
}

export function logWarn(...args: unknown[]): void {
    log(LogLevel.Warn, ...args);
}

export function logError(...args: unknown[]): void {
    log(LogLevel.Error, ...args);
}
