/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "@actor/sheet/base.ts";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types.ts";
import { CampaignFeaturePF2e } from "@item";
import { AdjustedValue } from "@module/sheet/helpers.ts";
import { ArmyPF2e } from "./document.ts";
import { Alignment } from "./types.ts";
declare class ArmySheetPF2e extends ActorSheetPF2e<ArmyPF2e> {
    static get defaultOptions(): ActorSheetOptions;
    getData(options?: Partial<ActorSheetOptions>): Promise<ArmySheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
}
interface ArmySheetData extends ActorSheetDataPF2e<ArmyPF2e> {
    ac: {
        value: number;
        breakdown: string;
        adjustmentClass: string | null;
    };
    consumption: AdjustedValue;
    hitPoints: {
        value: number;
        max: AdjustedValue;
        routThreshold: AdjustedValue;
    };
    linked: boolean;
    alignments: Iterable<Alignment>;
    armyTypes: Record<string, string>;
    rarityTraits: Record<string, string>;
    saves: ArmySaveSheetData[];
    tactics: CampaignFeaturePF2e[];
    warActions: CampaignFeaturePF2e[];
}
interface ArmySaveSheetData {
    slug: string;
    label: string;
    mod: number;
    breakdown: string;
    adjustmentClass: string | null;
}
export { ArmySheetPF2e };
