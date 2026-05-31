import { clearToolbeltCaches } from "../feature/damageHandler/toolbeltIntegration.ts";

export function combatStartHook(): void {
    clearToolbeltCaches();
}
