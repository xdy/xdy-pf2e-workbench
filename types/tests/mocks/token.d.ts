import type { ActorPF2e, ScenePF2e, TokenDocumentPF2e } from "@module/documents.js";
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
