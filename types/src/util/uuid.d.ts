declare class UUIDUtils {
    /** Retrieve multiple documents by UUID */
    static fromUUIDs(uuids: string[]): Promise<ClientDocument[]>;
    static isItemUUID(uuid: unknown): uuid is ItemUUID;
    static isTokenUUID(uuid: unknown): uuid is TokenDocumentUUID;
}
export { UUIDUtils };
