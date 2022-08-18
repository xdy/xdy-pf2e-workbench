import { EffectBadge } from "@item/abstract-effect";
import { BaseItemDataPF2e, BaseItemSourcePF2e, ItemFlagsPF2e, ItemLevelData, ItemSystemData, ItemSystemSource } from "@item/data/base";
import { EffectPF2e } from ".";
declare type EffectSource = BaseItemSourcePF2e<"effect", EffectSystemSource> & {
    flags: DeepPartial<EffectFlags>;
};
declare type EffectData = Omit<EffectSource, "system" | "effects" | "flags"> & BaseItemDataPF2e<EffectPF2e, "effect", EffectSystemData, EffectSource> & {
    flags: EffectFlags;
};
declare type EffectFlags = ItemFlagsPF2e & {
    pf2e: {
        aura?: EffectAuraData;
    };
};
interface EffectSystemSource extends ItemSystemSource, ItemLevelData {
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
interface EffectSystemData extends EffectSystemSource, ItemSystemData {
    expired: boolean;
    remaining: string;
}
declare type EffectExpiryType = "turn-start" | "turn-end";
interface EffectAuraData {
    slug: string;
    origin: ActorUUID | TokenDocumentUUID;
    removeOnExit: boolean;
}
export { EffectData, EffectExpiryType, EffectFlags, EffectSource, EffectSystemData };
