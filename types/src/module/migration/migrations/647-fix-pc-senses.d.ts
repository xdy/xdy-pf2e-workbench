import { ActorSourcePF2e } from "@actor/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Fix PC `senses` properties, misshapen by some mysterious source */
export declare class Migration647FixPCSenses extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
