declare class UUIDUtils {
    /** Retrieve multiple documents by UUID */
    static fromUUIDs(uuids: string[], options?: {
        relative?: Maybe<ClientDocument>;
    }): Promise<ClientDocument[]>;
    static isItemUUID(uuid: unknown): uuid is ItemUUID;
    static isCompendiumUUID(uuid: unknown): uuid is CompendiumUUID;
    static isTokenUUID(uuid: unknown): uuid is TokenDocumentUUID;
}
export { UUIDUtils };
