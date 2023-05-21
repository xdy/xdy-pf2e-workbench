import { PhysicalItemPF2e } from "@item";
import { CheckDC } from "@system/degree-of-success.ts";
import { SkillActionOptions } from "../types.ts";
export declare function craft(options: CraftActionOptions): Promise<void>;
interface CraftActionOptions extends SkillActionOptions {
    difficultyClass?: CheckDC;
    item?: PhysicalItemPF2e;
    quantity?: number;
    uuid?: string;
    free?: boolean;
}
export {};
