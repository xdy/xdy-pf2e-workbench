import type { ActorPF2e } from "@actor";
import { ActorSourcePF2e } from "@actor/data";
import { ActorSystemSource } from "@actor/data/base";
import type { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
import { ActiveEffectPF2e } from "@module/active-effect";
import { ScenePF2e, TokenDocumentPF2e } from "@scene";
import { MockCollection } from "./collection";
export declare class MockActor {
    options: DocumentConstructionContext<null>;
    _source: ActorSourcePF2e;
    readonly parent: TokenDocumentPF2e<ScenePF2e | null> | null;
    readonly items: MockCollection<ItemPF2e<ActorPF2e>>;
    readonly effects: MockCollection<ActiveEffectPF2e<ActorPF2e>>;
    _itemGuid: number;
    constructor(data: ActorSourcePF2e, options?: DocumentConstructionContext<null>);
    get id(): string | null;
    get name(): string;
    get system(): ActorSystemSource;
    prepareData(): void;
    update(changes: Record<string, any>): void;
    static updateDocuments(updates?: DocumentUpdateData<ActorPF2e>[], _context?: DocumentModificationContext<TokenDocumentPF2e<ScenePF2e | null>>): Promise<ActorPF2e[]>;
    updateEmbeddedDocuments(type: string, data: any[]): Promise<void>;
    createEmbeddedDocuments(type: string, data: ItemSourcePF2e[], _context: DocumentModificationContext<ActorPF2e>): Promise<void>;
    deleteEmbeddedDocuments(type: string, ids: string[]): Promise<void>;
    toObject(): ActorSourcePF2e;
}
