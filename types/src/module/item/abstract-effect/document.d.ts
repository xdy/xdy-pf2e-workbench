import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { EffectBadge } from "./data";
import { ConditionSource, ConditionSystemData } from "@item/condition";
import { EffectSource, EffectSystemData } from "@item/effect";
import { AfflictionSource, AfflictionSystemData } from "@item/affliction";
/** Base effect type for all PF2e effects including conditions and afflictions */
declare abstract class AbstractEffectPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    /** A normalized version of the slug that shows in roll options, removing certain prefixes */
    rollOptionSlug: string;
    abstract get badge(): EffectBadge | null;
    abstract increase(): Promise<void>;
    abstract decrease(): Promise<void>;
    /** Get the actor from which this effect originated */
    get origin(): ActorPF2e | null;
    /** If false, the AbstractEffect should be hidden from the user unless they are a GM */
    get isIdentified(): boolean;
    get isLocked(): boolean;
    getRollOptions(prefix?: string): string[];
    prepareBaseData(): void;
    /** Set a self roll option for this effect */
    prepareActorData(): void;
    protected _onCreate(data: this["_source"], options: DocumentModificationContext<TParent>, userId: string): void;
    protected _onDelete(options: DocumentModificationContext<TParent>, userId: string): void;
    /** Attempts to show floaty text and update condition automation, depending on settings */
    private handleChange;
}
interface AbstractEffectPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: AfflictionSource | ConditionSource | EffectSource;
    system: AfflictionSystemData | ConditionSystemData | EffectSystemData;
}
export { AbstractEffectPF2e };
