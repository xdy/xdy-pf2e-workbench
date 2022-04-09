import type { ActorPF2e } from "@actor";
import { ActorSourcePF2e } from "@actor/data";
import type { ItemPF2e } from "@item";
import { ActiveEffectPF2e } from "@module/active-effect";
import { FakeCollection } from "./fake-collection";
export declare class FakeActor {
    options: DocumentConstructionContext<ActorPF2e>;
    _data: ActorSourcePF2e;
    items: FakeCollection<ItemPF2e>;
    effects: FakeCollection<ActiveEffectPF2e>;
    _itemGuid: number;
    constructor(data: ActorSourcePF2e, options?: DocumentConstructionContext<ActorPF2e>);
    get id(): string;
    get data(): import("@actor/data").CharacterSource | import("@actor/data").NPCSource | import("@actor/data").FamiliarSource | import("@actor/data").HazardSource | import("@actor/data").LootSource | import("@actor/data").VehicleSource;
    get name(): string;
    prepareData(): void;
    static fromToken(token: Token): ActorPF2e | null;
    static createTokenActor(baseActor: ActorPF2e, token: Token): ActorPF2e;
    update(changes: Record<string, any>): void;
    static updateDocuments(updates?: DocumentUpdateData<ActorPF2e>[], _context?: DocumentModificationContext): Promise<ActorPF2e[]>;
    updateEmbeddedDocuments(type: string, data: any[]): Promise<void>;
    createEmbeddedDocuments(type: string, data: any[], _context: DocumentModificationContext): Promise<void>;
    deleteEmbeddedDocuments(type: string, data: string[]): Promise<void>;
    toObject(source?: boolean): import("@actor/data").CharacterSource | import("@actor/data").NPCSource | import("@actor/data").FamiliarSource | import("@actor/data").HazardSource | import("@actor/data").LootSource | import("@actor/data").VehicleSource;
}
