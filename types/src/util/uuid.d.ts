import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
declare class UUIDUtils {
    /** Retrieve multiple documents by UUID */
    static fromUUIDs(uuids: ActorUUID[], options?: {
        relative?: Maybe<ClientDocument>;
    }): Promise<ActorPF2e[]>;
    static fromUUIDs(uuids: ItemUUID[], options?: {
        relative?: Maybe<ClientDocument>;
    }): Promise<ItemPF2e[]>;
    static fromUUIDs(uuids: string[], options?: {
        relative?: Maybe<ClientDocument>;
    }): Promise<ClientDocument[]>;
    static isItemUUID(uuid: unknown, options: {
        embedded: true;
    }): uuid is EmbeddedItemUUID;
    static isItemUUID(uuid: unknown, options: {
        embedded: false;
    }): uuid is WorldItemUUID | CompendiumItemUUID;
    static isItemUUID(uuid: unknown, options?: {
        embedded?: boolean;
    }): uuid is ItemUUID;
    static isCompendiumUUID(uuid: unknown, docType: "Actor"): uuid is CompendiumActorUUID;
    static isCompendiumUUID(uuid: unknown, docType: "Item"): uuid is CompendiumItemUUID;
    static isCompendiumUUID<TDocType extends DocumentType>(uuid: unknown, docType?: TDocType): uuid is CompendiumUUID;
    static isTokenUUID(uuid: unknown): uuid is TokenDocumentUUID;
}
export { UUIDUtils };
