import { ActorSystemSource } from "@actor/data/base.ts";
import type { ActorDeltaSource } from "types/foundry/common/documents/actor-delta.d.ts";
import type { TokenDocumentPF2e } from "./document.ts";

declare class ActorDeltaPF2e<TParent extends TokenDocumentPF2e | null> extends ActorDelta<TParent> {
    /** Following synthetic actor updates, send the `Token` a fake update notification to trigger redraws */
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DatabaseUpdateOperation<TParent>, userId: string): void;
    /** Following synthetic actor item updates, send the `Token` a fake update notification to trigger redraws */
    _dispatchDescendantDocumentEvents(event: string, collection: string, args: [object[], ...unknown[]], parent: ClientDocument | undefined): void;
}
interface ActorDeltaPF2e<TParent extends TokenDocumentPF2e | null> extends ActorDelta<TParent> {
    readonly _source: ActorDeltaSourcePF2e;
}
type ActorDeltaSourcePF2e = ActorDeltaSource & {
    system: ActorSystemSource | null;
};
export { ActorDeltaPF2e };
