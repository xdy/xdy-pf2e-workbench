import { MODULENAME } from "../constants.ts";
import { Phase, phase } from "../lifecycle.ts";

const LogLevel = {
    TRACE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
} as const;

export function logDebug(...args: unknown[]): void {
    log(LogLevel.DEBUG, ...args);
}

export function logInfo(...args: unknown[]): void {
    log(LogLevel.INFO, ...args);
}

export function logWarn(...args: unknown[]): void {
    log(LogLevel.WARN, ...args);
}

export function logError(...args: unknown[]): void {
    log(LogLevel.ERROR, ...args);
}

function log(logLevel: number = LogLevel.INFO, ...args: unknown[]): void {
    let threshold: number = LogLevel.INFO;
    if (phase >= Phase.READY) {
        threshold = Number(game.settings.get(MODULENAME, "logLevel")) ?? LogLevel.INFO;
    }

    if (logLevel < threshold) return;

    switch (logLevel) {
        case LogLevel.TRACE:
            console.trace(...args);
            break;
        case LogLevel.DEBUG:
            console.debug(...args);
            break;
        case LogLevel.INFO:
            console.info(...args);
            break;
        case LogLevel.WARN:
            console.warn(...args);
            break;
        case LogLevel.ERROR:
            console.error(...args);
            break;
    }
}
