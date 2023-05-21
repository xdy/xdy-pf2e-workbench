import { DCOptions } from "../dc.ts";
import { PhysicalItemPF2e } from "./physical/index.ts";
export interface IdentifyMagicDCs {
    arc: number;
    nat: number;
    rel: number;
    occ: number;
}
export interface IdentifyAlchemyDCs {
    cra: number;
}
export interface GenericIdentifyDCs {
    dc: number;
}
export declare function isMagical(item: PhysicalItemPF2e): boolean;
interface IdentifyItemOptions extends DCOptions {
    notMatchingTraditionModifier: number;
}
export declare function identifyItem(item: PhysicalItemPF2e, { proficiencyWithoutLevel, notMatchingTraditionModifier }: IdentifyItemOptions): GenericIdentifyDCs | IdentifyMagicDCs | IdentifyAlchemyDCs;
export declare function getUnidentifiedPlaceholderImage(item: PhysicalItemPF2e): string;
export {};
