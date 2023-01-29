import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
/** Retrieve multiple documents by UUID */
declare function fromUUIDs(uuids: Exclude<ActorUUID | TokenDocumentUUID, CompendiumUUID>[]): Promise<ActorPF2e[]>;
declare function fromUUIDs(uuids: Exclude<ItemUUID, CompendiumUUID>[]): Promise<ItemPF2e[]>;
declare function fromUUIDs(uuids: string[]): Promise<ClientDocument[]>;
declare function isItemUUID(uuid: unknown): uuid is ItemUUID;
declare function isTokenUUID(uuid: unknown): uuid is TokenDocumentUUID;
export { fromUUIDs, isItemUUID, isTokenUUID };
