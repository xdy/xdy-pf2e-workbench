import { ActorSourcePF2e } from "@actor/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Store indication of NPC elite/weak adjustment in attributes instead of traits */
export declare class Migration779EliteWeak extends MigrationBase {
    static version: number;
    updateActor(source: MaybeWithExtraNestedTraits): Promise<void>;
}
type MaybeWithExtraNestedTraits = ActorSourcePF2e & {
    system: {
        traits: {
            traits?: {
                value: string[];
            };
        };
    };
};
export {};
