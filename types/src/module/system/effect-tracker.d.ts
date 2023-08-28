import type { ActorPF2e } from "@actor";
import type { EffectPF2e } from "@item";
import type { EncounterPF2e } from "@module/encounter/index.ts";
export declare class EffectTracker {
    #private;
    effects: EffectPF2e<ActorPF2e>[];
    /** A separate collection of aura effects, including ones with unlimited duration */
    auraEffects: Collection<EffectPF2e<ActorPF2e>>;
    register(effect: EffectPF2e<ActorPF2e>): void;
    unregister(toRemove: EffectPF2e<ActorPF2e>): void;
    /**
     * Check for expired effects, removing or disabling as appropriate according to world settings
     * @param [options.resetItemData] Perform individual item data resets. This is only needed when the world time
     *                                changes.
     */
    refresh(options?: {
        resetItemData?: boolean;
    }): Promise<void>;
    /** Expire or remove on-encounter-end effects */
    onEncounterEnd(encounter: EncounterPF2e): Promise<void>;
}
