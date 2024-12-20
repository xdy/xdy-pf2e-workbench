import { SkillSlug } from "@actor/types.ts";
import { DCOptions } from "../dc.ts";
import type { PhysicalItemPF2e } from "./physical/index.ts";

type MagicSkill = Extract<SkillSlug, "arcana" | "nature" | "religion" | "occultism">;
type IdentifyMagicDCs = Record<MagicSkill, number>;
type IdentifyAlchemyDCs = {
    crafting: number;
};
interface IdentifyItemOptions extends DCOptions {
    notMatchingTraditionModifier: number;
}
declare function getItemIdentificationDCs(item: PhysicalItemPF2e, { pwol, notMatchingTraditionModifier }: IdentifyItemOptions): IdentifyMagicDCs | IdentifyAlchemyDCs;
declare function getUnidentifiedPlaceholderImage(item: PhysicalItemPF2e): string;
export { getItemIdentificationDCs, getUnidentifiedPlaceholderImage };
export type { IdentifyAlchemyDCs, IdentifyMagicDCs };
