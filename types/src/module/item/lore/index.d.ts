import { ItemPF2e } from "@item/base";
import { LoreData } from "./data";
export declare class LorePF2e extends ItemPF2e {
    static get schema(): typeof LoreData;
}
export interface LorePF2e {
    readonly data: LoreData;
}
