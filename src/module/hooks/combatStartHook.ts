import { clearToolbeltCaches } from "../feature/damageHandler/toolbelt/toolbeltCache.ts";

export function combatStartHook(): void {
    clearToolbeltCaches();
}
