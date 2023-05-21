import type { ActorPF2e } from "@actor/index.ts";
import type { ItemPF2e } from "@item/index.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
import { ItemSystemSource } from "@item/data/base.ts";
export declare class MockItem {
    options: DocumentConstructionContext<ActorPF2e | null>;
    readonly _source: ItemSourcePF2e;
    readonly parent: ActorPF2e | null;
    constructor(data: ItemSourcePF2e, options?: DocumentConstructionContext<ActorPF2e | null>);
    get id(): string;
    get name(): string;
    get system(): ItemSystemSource;
    get level(): number | null;
    get traits(): Set<string>;
    get isMagical(): boolean;
    get isAlchemical(): boolean;
    static updateDocuments(updates?: DocumentUpdateData<ItemPF2e<ActorPF2e | null>>[], _context?: DocumentModificationContext<ActorPF2e | null>): Promise<ItemPF2e<ActorPF2e | null>[]>;
    update(changes: object): void;
    toObject(): ItemSourcePF2e;
}
