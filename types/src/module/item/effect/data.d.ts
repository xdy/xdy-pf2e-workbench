import { ItemLevelData, ItemSystemData } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import { OneToFour } from "@module/data";
import { EffectPF2e } from ".";
export declare type EffectSource = BaseNonPhysicalItemSource<"effect", EffectSystemSource>;
export declare class EffectData extends BaseNonPhysicalItemData<EffectPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface EffectData extends Omit<EffectSource, "effects" | "flags"> {
    type: EffectSource["type"];
    data: EffectSystemData;
    readonly _source: EffectSource;
}
interface EffectSystemSource extends ItemSystemData, ItemLevelData {
    start: {
        value: number;
        initiative: number | null;
    };
    duration: {
        value: number;
        unit: "rounds" | "minutes" | "hours" | "days" | "encounter" | "unlimited";
        sustained: boolean;
        expiry: EffectExpiryType | null;
    };
    tokenIcon: {
        show: boolean;
    };
    target: string | null;
    expired?: boolean;
    badge: EffectBadge | null;
}
export interface EffectBadge {
    value: number | DiceExpression;
    tickRule: EffectTickType;
}
export declare type EffectExpiryType = "turn-start" | "turn-end";
export declare type EffectTickType = "turn-start";
declare type DieFaceCount = 4 | 6 | 8 | 10 | 12 | 20;
export declare type DiceExpression = `${OneToFour | ""}d${DieFaceCount}`;
export interface EffectSystemData extends ItemSystemData, EffectSystemSource {
    expired: boolean;
    remaining: string;
}
export {};
