import { ActorSourcePF2e } from "@actor/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Move hazard source(book) object to be in line with NPCs */
export declare class Migration837MoveHazardBookSources extends MigrationBase {
    static version: number;
    updateActor(source: MaybeWithMisplacedSource): Promise<void>;
}
type MaybeWithMisplacedSource = ActorSourcePF2e & {
    system: {
        source?: unknown;
        "-=source"?: null;
        details: {
            source?: object;
        };
    };
};
export {};
