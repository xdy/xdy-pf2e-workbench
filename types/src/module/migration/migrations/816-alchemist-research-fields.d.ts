import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/**
 * Update rule elements on Bomber, Chirurgeon, Mutagenist, Toxicologist, Research Field, Field Discovery,
 * Greater Field Discovery, Perpetual Infusions, Perpetual Potency and Perpetual Perfection
 */
export declare class Migration816AlchemistResearchFields extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
