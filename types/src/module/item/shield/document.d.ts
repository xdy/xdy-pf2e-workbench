import type { ActorPF2e } from "@actor";
import { type WeaponPF2e } from "@item";
import { ItemSummaryData } from "@item/base/data/index.ts";
import { PhysicalItemPF2e } from "@item/physical/index.ts";
import { UserPF2e } from "@module/user/document.ts";
import { ShieldSource, ShieldSystemData } from "./data.ts";
import { BaseShieldType, ShieldTrait } from "./types.ts";
declare class ShieldPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    isStackableWith(item: PhysicalItemPF2e<TParent>): boolean;
    get baseType(): BaseShieldType | null;
    get isBuckler(): boolean;
    get isTowerShield(): boolean;
    get speedPenalty(): number;
    get acBonus(): number;
    get isSpecific(): boolean;
    /** Given this is a shield, is it raised? */
    get isRaised(): boolean;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    prepareBaseData(): void;
    prepareDerivedData(): void;
    prepareActorData(this: ShieldPF2e<ActorPF2e>): void;
    onPrepareSynthetics(this: ShieldPF2e<ActorPF2e>): void;
    getChatData(this: ShieldPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<ItemSummaryData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    /** Generate a shield bash or other weapon(-like) item from this shield */
    generateWeapon(): WeaponPF2e<TParent> | null;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface ShieldPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ShieldSource;
    system: ShieldSystemData;
    get traits(): Set<ShieldTrait>;
}
export { ShieldPF2e };
