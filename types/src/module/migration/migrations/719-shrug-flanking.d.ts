import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
import { ActorSourcePF2e } from "@actor/data";
/** Add roll options to abilities allowing one to ignore the flat-footed condition from being flanked */
export declare class Migration719ShrugFlanking extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e, actorSource?: ActorSourcePF2e): Promise<void>;
    /** Instead of merely shrugging the flat--footed condition, this will suppress all benefits of flanking */
    private get allAroundVision();
    private get denyAdvantage();
    private get gangUp();
    /** NPCs with variant Deny Advantage rules */
    private npcVariants;
    private get wolfStanceRules();
    private npcDenyAvantage;
    private needsDenyAdvantage;
}
