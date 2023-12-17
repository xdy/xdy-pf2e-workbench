import { ActorSourcePF2e } from "@actor/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Turn edicts and anathema into arrays. */
export declare class Migration910EdictsAnathemaArrays extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
