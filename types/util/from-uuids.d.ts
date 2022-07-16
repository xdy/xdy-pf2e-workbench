import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
/** Retrieve multiple documents by UUID */
export declare function fromUUIDs(uuids: Exclude<ActorUUID | TokenDocumentUUID, CompendiumUUID>[]): Promise<ActorPF2e[]>;
export declare function fromUUIDs(uuids: Exclude<ItemUUID, CompendiumUUID>[]): Promise<ItemPF2e[]>;
export declare function fromUUIDs(uuids: DocumentUUID[]): Promise<ClientDocument[]>;
export declare function isItemUUID(uuid: unknown): uuid is ItemUUID;
