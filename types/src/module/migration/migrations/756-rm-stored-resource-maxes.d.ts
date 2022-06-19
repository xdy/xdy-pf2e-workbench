import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Remove inadvertently stored focus and infused-reagents maxes caused by bug in Rest for the Night script */
export declare class Migration756RMStoredResourceMaxes extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourceWithDeletions): Promise<void>;
}
declare type ActorSourceWithDeletions = ActorSourcePF2e & {
    "data.resources.focus.-=max"?: null;
    "data.resources.crafting.infusedReagents.-=max"?: null;
    "data.resources.-=investiture"?: null;
};
export {};
