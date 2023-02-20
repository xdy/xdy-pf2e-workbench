import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
declare class UUIDUtils {
    #private;
    /** A replacement for core fromUuid that returns cached compendium documents. Remove in v11. */
    static fromUuid<T extends ClientDocument = ClientDocument>(uuid: string, relative?: ClientDocument): Promise<T | null>;
    /** A replacement for core fromUuidSync that returns cached compendium documents. Remove in v11. */
    static fromUuidSync(uuid: string, relative?: ClientDocument): ClientDocument | CompendiumIndexData | null;
    /** Retrieve multiple documents by UUID */
    static fromUUIDs(uuids: Exclude<ActorUUID | TokenDocumentUUID, CompendiumUUID>[]): Promise<ActorPF2e[]>;
    static fromUUIDs(uuids: Exclude<ItemUUID, CompendiumUUID>[]): Promise<ItemPF2e[]>;
    static fromUUIDs(uuids: string[]): Promise<ClientDocument[]>;
    static isItemUUID(uuid: unknown): uuid is ItemUUID;
    static isTokenUUID(uuid: unknown): uuid is TokenDocumentUUID;
}
export { UUIDUtils };
