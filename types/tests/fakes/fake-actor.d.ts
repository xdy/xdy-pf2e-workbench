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
    id: string;
    constructor(data: ActorSourcePF2e, options?: DocumentConstructionContext<ActorPF2e>);
    get data(): import("../../src/module/actor/vehicle/data").VehicleSource | import("../../src/module/actor/character/data/types").CharacterSource | import("../../src/module/actor/npc/data").NPCSource | import("../../src/module/actor/familiar/data").FamiliarSource | import("../../src/module/actor/hazard/data").HazardSource | import("../../src/module/actor/loot/data").LootSource;
    get name(): string;
    prepareData(): void;
    update(changes: Record<string, any>): void;
    static updateDocuments(updates?: DocumentUpdateData<ActorPF2e>[], _context?: DocumentModificationContext): Promise<ActorPF2e[]>;
    updateEmbeddedDocuments(type: string, data: any[]): Promise<void>;
    createEmbeddedDocuments(type: string, data: any[], _context: DocumentModificationContext): Promise<void>;
    deleteEmbeddedDocuments(type: string, data: string[]): Promise<void>;
    toObject(source?: boolean): import("../../src/module/actor/vehicle/data").VehicleSource | import("../../src/module/actor/character/data/types").CharacterSource | import("../../src/module/actor/npc/data").NPCSource | import("../../src/module/actor/familiar/data").FamiliarSource | import("../../src/module/actor/hazard/data").HazardSource | import("../../src/module/actor/loot/data").LootSource;
}
