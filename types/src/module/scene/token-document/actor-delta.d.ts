import { ActorSystemSource } from "@actor/data/base.ts";
import { TokenDocumentPF2e } from "./document.ts";
declare class ActorDeltaPF2e<TParent extends TokenDocumentPF2e | null> extends ActorDelta<TParent> {
    _initialize(options?: Record<string, unknown>): void;
    prepareData(): void;
    /** Prevent data preparation of embedded documents shared with linked actor */
    prepareEmbeddedDocuments(): void;
    /** Following synthetic actor  updates, send the `Token` a fake update notification to trigger redraws */
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<TParent>, userId: string): void;
    /** Following synthetic actor item updates, send the `Token` a fake update notification to trigger redraws */
    _dispatchDescendantDocumentEvents(event: string, collection: string, args: [object[], ...unknown[]], parent: ClientDocument | undefined): void;
}
interface ActorDeltaPF2e<TParent extends TokenDocumentPF2e | null> extends ActorDelta<TParent> {
    _source: {
        name: string | null;
        system: ActorSystemSource;
    };
}
export { ActorDeltaPF2e };
