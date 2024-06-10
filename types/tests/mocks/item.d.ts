import type { ActorPF2e } from "@actor/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { ItemSystemSource } from "@item/base/data/system.ts";
import type { ItemPF2e } from "@item/index.ts";
export declare class MockItem {
    options: DocumentConstructionContext<ActorPF2e | null>;
    readonly _source: ItemSourcePF2e;
    readonly parent: ActorPF2e | null;
    constructor(data: ItemSourcePF2e, options?: DocumentConstructionContext<ActorPF2e | null>);
    get id(): string | null;
    get name(): string;
    get system(): ItemSystemSource;
    get level(): number | null;
    get traits(): Set<string>;
    get isMagical(): boolean;
    get isAlchemical(): boolean;
    static updateDocuments(updates?: Record<string, unknown>[], _operation?: Partial<DatabaseUpdateOperation<ActorPF2e | null>>): Promise<ItemPF2e<ActorPF2e | null>[]>;
    update(changes: object): void;
    toObject(): ItemSourcePF2e;
}
