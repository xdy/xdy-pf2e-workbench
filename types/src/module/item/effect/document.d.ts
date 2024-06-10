import type { ActorPF2e } from "@actor";
import type { BadgeReevaluationEventType, EffectBadge } from "@item/abstract-effect/data.ts";
import { AbstractEffectPF2e } from "@item/abstract-effect/index.ts";
import type { RuleElementOptions, RuleElementPF2e } from "@module/rules/index.ts";
import type { UserPF2e } from "@module/user/index.ts";
import type { EffectFlags, EffectSource, EffectSystemData } from "./data.ts";
declare class EffectPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends AbstractEffectPF2e<TParent> {
    #private;
    get badge(): EffectBadge | null;
    get level(): number;
    get isExpired(): boolean;
    /** Whether this effect emits an aura */
    get isAura(): boolean;
    get isIdentified(): boolean;
    /** Does this effect originate from an aura? */
    get fromAura(): boolean;
    prepareBaseData(): void;
    /** Unless this effect is temporarily constructed, ignore rule elements if it is expired */
    prepareRuleElements(options?: RuleElementOptions): RuleElementPF2e[];
    /** Increases if this is a counter effect, otherwise ignored outright */
    increase(): Promise<void>;
    /** Decreases if this is a counter effect, otherwise deletes entirely */
    decrease(): Promise<void>;
    /** Include a trimmed version of the "slug" roll option (e.g., effect:rage instead of effect:effect-rage) */
    getRollOptions(prefix?: string, options?: {
        includeGranter?: boolean;
    }): string[];
    /** Set the start time and initiative roll of a newly created effect */
    protected _preCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<EffectSource>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _onDelete(operation: DatabaseDeleteOperation<TParent>, userId: string): void;
    /** If applicable, reevaluate this effect's badge */
    onEncounterEvent(event: BadgeReevaluationEventType): Promise<void>;
}
interface EffectPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends AbstractEffectPF2e<TParent> {
    flags: EffectFlags;
    readonly _source: EffectSource;
    system: EffectSystemData;
}
export { EffectPF2e };
