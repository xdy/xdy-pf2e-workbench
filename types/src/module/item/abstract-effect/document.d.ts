import { ItemPF2e } from "@item";
import { EffectBadge } from "./data";
/** Base effect type for all PF2e effects including conditions and afflictions */
export declare abstract class AbstractEffectPF2e extends ItemPF2e {
    /** A normalized version of the slug that shows in roll options, removing certain prefixes */
    rollOptionSlug: string;
    abstract get badge(): EffectBadge | null;
    abstract increase(): Promise<void>;
    abstract decrease(): Promise<void>;
    /** If true, the AbstractEffect should be hidden from the user unless they are a GM */
    get unidentified(): boolean;
    prepareBaseData(): void;
    /** Set a self roll option for this effect */
    prepareActorData(): void;
}
