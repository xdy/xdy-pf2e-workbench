import { SkillLongForm } from "@actor/types.ts";
import { DCOptions } from "../dc.ts";
import { PhysicalItemPF2e } from "./physical/index.ts";
type MagicSkill = Extract<SkillLongForm, "arcana" | "nature" | "religion" | "occultism">;
export type IdentifyMagicDCs = Record<MagicSkill, number>;
export interface IdentifyAlchemyDCs {
    crafting: number;
}
export interface GenericIdentifyDCs {
    dc: number;
}
export declare function isMagical(item: PhysicalItemPF2e): boolean;
interface IdentifyItemOptions extends DCOptions {
    notMatchingTraditionModifier: number;
}
export declare function getItemIdentificationDCs(item: PhysicalItemPF2e, { proficiencyWithoutLevel, notMatchingTraditionModifier }: IdentifyItemOptions): GenericIdentifyDCs | IdentifyMagicDCs | IdentifyAlchemyDCs;
export declare function getUnidentifiedPlaceholderImage(item: PhysicalItemPF2e): string;
export {};
