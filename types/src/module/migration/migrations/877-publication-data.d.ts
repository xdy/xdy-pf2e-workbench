import type { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Standardize location and structure of actor/item publication data */
export declare class Migration877PublicationData extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorWithOldPublicationData): Promise<void>;
    updateItem(source: ItemWithOldPublicationData): Promise<void>;
}
type ActorWithOldPublicationData = ActorSourcePF2e & {
    system: {
        source?: unknown;
        "-=source"?: null;
        details: {
            source?: unknown;
            "-=source"?: null;
        };
    };
};
type ItemWithOldPublicationData = ItemSourcePF2e & {
    system: {
        source?: unknown;
        "-=source"?: null;
        "-=details"?: null;
    };
};
export {};
