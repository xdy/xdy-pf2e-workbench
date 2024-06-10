import type { UserPF2e } from "@module/user/document.ts";
import type { DatabaseGetOperation } from "types/foundry/common/abstract/_types.d.ts";
declare class ClientDatabaseBackendPF2e extends foundry.data.ClientDatabaseBackend {
    protected _getDocuments(documentClass: typeof foundry.abstract.Document, operation: DatabaseGetOperation<foundry.abstract.Document | null>, user?: UserPF2e): Promise<(DeepPartial<ClientDocument["_source"]> & CompendiumIndexData)[] | foundry.abstract.Document[]>;
}
export { ClientDatabaseBackendPF2e };
