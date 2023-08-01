import { ActorSystemSource } from "@actor/data/base.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
import type { TombstoneSource } from "types/foundry/common/data/data.d.ts";
import type { ActorDeltaSource } from "types/foundry/common/documents/actor-delta.d.ts";
import { TokenDocumentPF2e } from "./document.ts";
declare class ActorDeltaPF2e<TParent extends TokenDocumentPF2e | null> extends ActorDelta<TParent> {
    prepareData(): void;
    /** The delta has no business preparing its items */
    prepareEmbeddedDocuments(): void;
    /** Following synthetic actor  updates, send the `Token` a fake update notification to trigger redraws */
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<TParent>, userId: string): void;
    /** Following synthetic actor item updates, send the `Token` a fake update notification to trigger redraws */
    _dispatchDescendantDocumentEvents(event: string, collection: string, args: [object[], ...unknown[]], parent: ClientDocument | undefined): void;
}
interface ActorDeltaPF2e<TParent extends TokenDocumentPF2e | null> extends ActorDelta<TParent> {
    readonly _source: ActorDeltaSourcePF2e;
}
interface ActorDeltaSourcePF2e extends ActorDeltaSource {
    system: ActorSystemSource | null;
    items: (ItemSourcePF2e | TombstoneSource)[];
}
export { ActorDeltaPF2e };
