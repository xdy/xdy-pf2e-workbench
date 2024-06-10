import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { AbstractEffectPF2e, EffectBadgeCounter } from "@item/abstract-effect/index.ts";
import { UserPF2e } from "@module/user/index.ts";
import { AfflictionDamageTemplate, DamageDamageContext } from "@system/damage/index.ts";
import { AfflictionFlags, AfflictionSource, AfflictionStageData, AfflictionSystemData } from "./data.ts";
declare class AfflictionPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends AbstractEffectPF2e<TParent> {
    constructor(source: object, context?: DocumentConstructionContext<TParent>);
    get badge(): EffectBadgeCounter;
    get stage(): number;
    get stageData(): AfflictionStageData | null;
    get maxStage(): number;
    increase(): Promise<void>;
    /** Decreases the affliction stage, deleting if reduced to 0 even if an onset exists */
    decrease(): Promise<void>;
    /** Returns true if the affliction is currently in the onset phase */
    get onset(): boolean;
    get onsetDuration(): number;
    get remainingStageDuration(): {
        expired: boolean;
        remaining: number;
    };
    prepareBaseData(): void;
    /** Retrieves the damage for a specific stage */
    getStageDamage(stage: number): AfflictionDamage | null;
    /** Run all updates that need to occur whenever the stage changes */
    protected handleStageChange(): Promise<void>;
    getLinkedItems(): ItemPF2e<ActorPF2e>[];
    createStageMessage(): Promise<void>;
    /** Set the start time and initiative roll of a newly created effect */
    protected _preCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<AfflictionSource>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _onCreate(data: AfflictionSource, operation: DatabaseCreateOperation<TParent>, userId: string): void;
    _onUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, userId: string): void;
    rollRecovery(): Promise<void>;
    prepareActorData(): void;
}
interface AfflictionPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends AbstractEffectPF2e<TParent> {
    flags: AfflictionFlags;
    readonly _source: AfflictionSource;
    system: AfflictionSystemData;
}
interface AfflictionDamage {
    template: AfflictionDamageTemplate;
    context: DamageDamageContext;
}
export { AfflictionPF2e };
