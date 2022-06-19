import { BaseItemDataPF2e, BaseItemSourcePF2e, ItemLevelData, ItemSystemData } from "@item/data/base";
import { OneToFour } from "@module/data";
import { EffectPF2e } from ".";
declare type EffectSource = BaseItemSourcePF2e<"effect", EffectSystemSource>;
declare type EffectData = Omit<EffectSource, "effects" | "flags"> & BaseItemDataPF2e<EffectPF2e, "effect", EffectSystemData, EffectSource>;
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
interface EffectSystemData extends ItemSystemData, EffectSystemSource {
    expired: boolean;
    remaining: string;
}
interface EffectBadge {
    value: number | DiceExpression;
    tickRule: EffectTickType;
}
declare type EffectExpiryType = "turn-start" | "turn-end";
declare type EffectTickType = "turn-start";
declare type DieFaceCount = 4 | 6 | 8 | 10 | 12 | 20;
declare type DiceExpression = `${OneToFour | ""}d${DieFaceCount}`;
export { EffectBadge, EffectData, EffectExpiryType, EffectSource, EffectSystemData, EffectTickType, DiceExpression };
