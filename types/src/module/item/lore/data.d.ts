import { ItemSystemData } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import { ZeroToFour } from "@module/data";
import type { LorePF2e } from ".";
export declare type LoreSource = BaseNonPhysicalItemSource<"lore", LoreSystemData>;
export declare class LoreData extends BaseNonPhysicalItemData<LorePF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface LoreData extends Omit<LoreSource, "effects" | "flags"> {
    type: LoreSource["type"];
    data: LoreSource["data"];
    readonly _source: LoreSource;
}
interface LoreSystemData extends ItemSystemData {
    mod: {
        value: number;
    };
    proficient: {
        value: ZeroToFour;
    };
    variants?: Record<string, {
        label: string;
        options: string;
    }>;
}
export {};
