import type { ActorPF2e } from "@actor";
import { ActorSystemSource } from "@actor/data/base.ts";
import { ActorSourcePF2e } from "@actor/data/index.ts";
import type { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import type { ActiveEffectPF2e } from "@module/active-effect.ts";
import type { ScenePF2e } from "@scene";
import type { TokenDocumentPF2e } from "@scene/token-document/document.ts";
import { MockCollection } from "./collection.ts";
export declare class MockActor {
    options: DocumentConstructionContext<null>;
    _source: ActorSourcePF2e;
    readonly parent: TokenDocumentPF2e<ScenePF2e | null> | null;
    readonly items: MockCollection<ItemPF2e<ActorPF2e>>;
    readonly effects: MockCollection<ActiveEffectPF2e<ActorPF2e>>;
    prototypeToken: {};
    _itemGuid: number;
    constructor(data: ActorSourcePF2e, options?: DocumentConstructionContext<null>);
    get id(): string | null;
    get name(): string;
    get system(): ActorSystemSource;
    prepareData(): void;
    update(changes: Record<string, unknown>): void;
    static updateDocuments(updates?: Record<string, unknown>[], _operation?: Partial<DatabaseUpdateOperation<TokenDocumentPF2e<ScenePF2e | null>>>): Promise<ActorPF2e[]>;
    updateEmbeddedDocuments(type: string, data: {
        _id: string;
    }[]): Promise<void>;
    createEmbeddedDocuments(type: string, data: ItemSourcePF2e[], _context: DatabaseCreateOperation<ActorPF2e>): Promise<void>;
    deleteEmbeddedDocuments(type: string, ids: string[]): Promise<void>;
    toObject(): ActorSourcePF2e;
}
