import { UserPF2e } from "@module/user/document.ts";
declare class ClientDatabaseBackendPF2e extends ClientDatabaseBackend {
    protected _getDocuments(documentClass: typeof foundry.abstract.Document, context: DatabaseBackendGetContext, user: UserPF2e): Promise<(DeepPartial<ClientDocument["_source"]> & CompendiumIndexData)[] | foundry.abstract.Document[]>;
}
export { ClientDatabaseBackendPF2e };
