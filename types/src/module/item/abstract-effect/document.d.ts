import type { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import type { AfflictionSource, AfflictionSystemData } from "@item/affliction/data.ts";
import type { ConditionSource, ConditionSystemData } from "@item/condition/data.ts";
import type { EffectSource, EffectSystemData } from "@item/effect/data.ts";
import type { UserPF2e } from "@module/user/document.ts";
import type { EffectBadge } from "./data.ts";
import type { EffectTrait } from "./types.ts";
/** Base effect type for all PF2e effects including conditions and afflictions */
declare abstract class AbstractEffectPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    /** A normalized version of the slug that shows in roll options, removing certain prefixes */
    rollOptionSlug: string;
    static get validTraits(): Record<EffectTrait, string>;
    abstract get badge(): EffectBadge | null;
    /** Get the actor from which this effect originated */
    get origin(): ActorPF2e | null;
    get traits(): Set<EffectTrait>;
    /** If false, the AbstractEffect should be hidden from the user unless they are a GM */
    get isIdentified(): boolean;
    get isLocked(): boolean;
    /** Whether this effect originated from a spell */
    get fromSpell(): boolean;
    get totalDuration(): number;
    get remainingDuration(): {
        expired: boolean;
        remaining: number;
    };
    abstract increase(): Promise<void>;
    abstract decrease(): Promise<void>;
    getRollOptions(prefix: string, options?: {
        includeGranter?: boolean;
    }): string[];
    prepareBaseData(): void;
    /** Set a self roll option for this effect */
    prepareActorData(): void;
    /** Log whether this effect originated from a spell */
    protected _preCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _onCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, userId: string): void;
    protected _onDelete(operation: DatabaseDeleteOperation<TParent>, userId: string): void;
    /** Attempts to show floaty text and update condition automation, depending on settings */
    private handleChange;
}
interface AbstractEffectPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: AfflictionSource | ConditionSource | EffectSource;
    system: AfflictionSystemData | ConditionSystemData | EffectSystemData;
}
export { AbstractEffectPF2e };
