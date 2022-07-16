import type { ActorPF2e } from "@actor/base";
import type { EffectPF2e } from "@item/index";
import { EncounterPF2e } from "@module/encounter";
export declare class EffectTracker {
    private trackedEffects;
    /** A separate collection of aura effects, including ones with unlimited duration */
    auraEffects: Collection<Embedded<EffectPF2e>>;
    private insert;
    register(effect: Embedded<EffectPF2e>): void;
    unregister(toRemove: Embedded<EffectPF2e>): void;
    refresh(): Promise<void>;
    removeExpired(actor?: ActorPF2e): Promise<void>;
    /** Expire or remove on-encounter-end effects */
    onEncounterEnd(encounter: EncounterPF2e): Promise<void>;
}
