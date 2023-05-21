import { MigrationBase } from "../base.ts";
/** Unnest actor traits by one object level */
export declare class Migration782UnnestActorTraits extends MigrationBase {
    static version: number;
    updateActor(source: MaybeWithExtraNestedTraits): Promise<void>;
}
type MaybeWithExtraNestedTraits = {
    system: {
        traits?: {
            value?: string[];
            traits?: {
                value: string[];
            };
            "-=traits"?: null;
        };
    };
};
export {};
