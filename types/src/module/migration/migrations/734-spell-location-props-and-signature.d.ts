import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Certain actor specific spell properties moved to spell.location such as signature */
export declare class Migration734SpellLocationPropsAndSignature extends MigrationBase {
    static version: number;
    updateActor(actor: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e, actor?: ActorSourcePF2e): Promise<void>;
}
