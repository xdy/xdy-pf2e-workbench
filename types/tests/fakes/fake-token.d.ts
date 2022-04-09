import { ActorPF2e } from "@actor/base";
import { ScenePF2e } from "@module/scene";
import { TokenDocumentPF2e } from "@module/scene/token-document";
export declare class FakeToken {
    _actor: ActorPF2e | null;
    parent: ScenePF2e | null;
    data: foundry.data.TokenData<TokenDocumentPF2e>;
    constructor(data: foundry.data.TokenSource, context?: TokenDocumentConstructionContext<TokenDocumentPF2e>);
    get actor(): ActorPF2e | null;
    get scene(): ScenePF2e | null;
    get id(): string;
    get name(): string;
    update(changes: EmbeddedDocumentUpdateData<TokenDocument>, context?: DocumentModificationContext): void;
}
