import type { EncounterPF2e } from "foundry-pf2e";
import { clearToolbeltCaches } from "../feature/damageHandler/toolbeltIntegration.ts";

export function updateCombatHook(_encounter: EncounterPF2e, changes: { round?: number }): void {
    if (changes.round !== undefined) {
        clearToolbeltCaches();
    }
}
