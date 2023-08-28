import type { ActorPF2e } from "@actor";
import { ItemSummaryData } from "@item/data/index.ts";
import { PhysicalItemHitPoints, PhysicalItemPF2e } from "@item/physical/index.ts";
import { UserPF2e } from "@module/user/index.ts";
import { ArmorSource, ArmorSystemData } from "./data.ts";
import { ArmorCategory, ArmorGroup, BaseArmorType } from "./types.ts";
declare class ArmorPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    isStackableWith(item: PhysicalItemPF2e<TParent>): boolean;
    get isShield(): boolean;
    get isArmor(): boolean;
    get isBarding(): boolean;
    get baseType(): BaseArmorType | null;
    get group(): ArmorGroup | null;
    get category(): ArmorCategory;
    get dexCap(): number | null;
    get strength(): number | null;
    get checkPenalty(): number | null;
    get speedPenalty(): number | null;
    get acBonus(): number;
    get hitPoints(): PhysicalItemHitPoints;
    get hardness(): number;
    get isBroken(): boolean;
    get isDestroyed(): boolean;
    /** Given this is a shield, is it raised? */
    get isRaised(): boolean;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    prepareBaseData(): void;
    prepareDerivedData(): void;
    prepareActorData(this: ArmorPF2e<ActorPF2e>): void;
    onPrepareSynthetics(this: ArmorPF2e<ActorPF2e>): void;
    private setActorShieldData;
    getChatData(this: ArmorPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<ItemSummaryData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    /** Ensure correct shield/actual-armor usage */
    protected _preCreate(data: PreDocumentId<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** Ensure correct shield/actual-armor usage */
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface ArmorPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ArmorSource;
    system: ArmorSystemData;
}
export { ArmorPF2e };
