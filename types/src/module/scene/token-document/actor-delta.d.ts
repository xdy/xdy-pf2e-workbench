import { ActorSystemSource } from "@actor/data/base.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
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
    readonly _source: ActorDeltaSourcePF2e<TParent>;
}
type ActorDeltaSourcePF2e<TParent extends TokenDocumentPF2e | null> = ActorDelta<TParent>["_source"] & {
    system: ActorSystemSource | null;
    items: ItemSourcePF2e[] | null;
};
export { ActorDeltaPF2e };
