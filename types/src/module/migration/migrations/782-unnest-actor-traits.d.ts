import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Unnest actor traits by one object level */
export declare class Migration782UnnestActorTraits extends MigrationBase {
    static version: number;
    updateActor(source: MaybeWithExtraNestedTraits): Promise<void>;
}
type MaybeWithExtraNestedTraits = ActorSourcePF2e & {
    system: {
        traits: {
            traits?: {
                value: string[];
            };
            "-=traits"?: null;
        };
    };
};
export {};
