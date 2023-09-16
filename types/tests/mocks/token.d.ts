import type { ActorPF2e } from "@actor";
import type { ScenePF2e } from "@scene";
import type { TokenDocumentPF2e } from "@scene/token-document/document.ts";
export declare class MockToken {
    actor: ActorPF2e | null;
    readonly parent: ScenePF2e | null;
    readonly _source: foundry.documents.TokenSource;
    constructor(data: foundry.documents.TokenSource, context?: {
        parent?: ScenePF2e | null;
        actor?: ActorPF2e | null;
    });
    get id(): string;
    get name(): string;
    get scene(): this["parent"];
    update(changes: EmbeddedDocumentUpdateData<TokenDocumentPF2e<this["parent"]>>, context?: SceneEmbeddedModificationContext<NonNullable<this["parent"]>>): void;
}
