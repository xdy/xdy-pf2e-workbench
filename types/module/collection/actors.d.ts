import { ActorPF2e } from "@actor";
import { ActorUpdateContext } from "@actor/base";
export declare class ActorsPF2e<TActor extends ActorPF2e = ActorPF2e> extends Actors<TActor> {
    /** Work around a bug as of Foundry V9.242 in which token default settings are ignored for compendium imports */
    fromCompendium(actor: TActor | TActor["data"]["_source"], options?: FromCompendiumOptions): TActor["data"]["_source"];
    /** Ditto */
    importFromCompendium(pack: CompendiumCollection<TActor>, actorId: string, updateData?: DocumentUpdateData<TActor>, options?: ActorUpdateContext<TActor>): Promise<TActor | null>;
}
