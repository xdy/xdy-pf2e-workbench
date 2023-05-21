import { ActorSourcePF2e } from "@actor/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove inadvertently stored focus and infused-reagents maxes caused by bug in Rest for the Night script */
export declare class Migration756RMStoredResourceMaxes extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourceWithDeletions): Promise<void>;
}
type ActorSourceWithDeletions = ActorSourcePF2e & {
    "system.resources.focus.-=max"?: null;
    "system.resources.crafting.infusedReagents.-=max"?: null;
    "system.resources.-=investiture"?: null;
};
export {};
