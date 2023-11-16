import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { ActorSourcePF2e } from "@actor/data/index.ts";
/** Catch up actors and items to the current template.json spec */
export declare class Migration605CatchUpToTemplateJSON extends MigrationBase {
    static version: number;
    private addEffects;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: MaybeWithCounteractCheckObject, actorSource: ActorSourcePF2e): Promise<void>;
}
type MaybeWithCounteractCheckObject = ItemSourcePF2e & {
    system: {
        hasCounteractCheck?: object;
    };
};
export {};
