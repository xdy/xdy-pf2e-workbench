import { ActorSystemData, ActorSystemSource, BaseActorDataPF2e, BaseActorSourcePF2e, BaseTraitsData, BaseTraitsSource, GangUpCircumstance } from "@actor/data/base";
import { LootPF2e } from ".";
/** The stored source data of a loot actor */
export declare type LootSource = BaseActorSourcePF2e<"loot", LootSystemSource>;
export declare class LootData extends BaseActorDataPF2e<LootPF2e> {
    static DEFAULT_ICON: ImagePath;
}
/** Wrapper type for loot-specific data. */
export interface LootData extends Omit<LootSource, "effects" | "flags" | "items" | "token"> {
    type: LootSource["type"];
    data: LootSystemData;
    readonly _source: LootSource;
}
/** The system-level data of loot actors. */
export interface LootSystemSource extends ActorSystemSource {
    attributes: {
        ac?: never;
        hp?: never;
    };
    details: {
        description: {
            value: string;
        };
        level: {
            value: number;
        };
    };
    lootSheetType: "Merchant" | "Loot";
    hiddenWhenEmpty: boolean;
    traits: BaseTraitsSource;
}
export declare type LootSystemData = Omit<ActorSystemData, "attributes"> & LootSystemSource & {
    attributes: {
        flanking: {
            canFlank: false;
            canGangUp: GangUpCircumstance[];
            flankable: false;
            flatFootable: false;
        };
    };
    traits: BaseTraitsData;
    [key: string]: any;
};
