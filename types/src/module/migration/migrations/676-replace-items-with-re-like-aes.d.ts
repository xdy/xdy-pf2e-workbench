import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Replace items containing FlatModifier `ActiveEffect`s with latest ones without */
export declare class Migration676ReplaceItemsWithRELikeAEs extends MigrationBase {
    static version: number;
    /** The feats Toughness and Mountain's Stoutness */
    private toughnessPromise;
    private stoutnessPromise;
    /** The familiar ability Tough */
    private toughPromise;
    private replaceItem;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
}
