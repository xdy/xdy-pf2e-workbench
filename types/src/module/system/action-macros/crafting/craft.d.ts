import { PhysicalItemPF2e } from "@item";
import { CheckDC } from "@system/degree-of-success";
import { SkillActionOptions } from "..";
interface CraftActionOptions extends SkillActionOptions {
    difficultyClass?: CheckDC;
    item?: PhysicalItemPF2e;
    quantity?: number;
    uuid?: string;
}
export declare function craft(options: CraftActionOptions): Promise<void>;
export {};
