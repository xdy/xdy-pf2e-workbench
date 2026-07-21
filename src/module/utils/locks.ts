const locked = new Set<string>();

export function isLocked(scope: string): boolean {
    return locked.has(scope);
}

/** Acquires a simple lock for the given scope. Does not queue, callers must check isLocked first. */
export async function withLock<T>(scope: string, fn: () => Promise<T>): Promise<T> {
    locked.add(scope);
    try {
        return await fn();
    } finally {
        locked.delete(scope);
    }
}
