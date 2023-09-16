import { ItemTransferData } from "@actor/item-transfer.ts";
declare function activateSocketListener(): void;
interface TransferCallbackMessage {
    request: "itemTransfer";
    data: ItemTransferData;
}
interface RefreshControlsMessage {
    request: "refreshSceneControls";
    data: {
        layer?: string;
    };
}
interface ShowSheetMessage {
    request: "showSheet";
    users: string[];
    document: string;
    options?: {
        /** Whether to show a campaign sheet instead, and which one */
        campaign?: boolean | "builder";
        tab?: string;
    };
}
type SocketMessage = TransferCallbackMessage | RefreshControlsMessage | ShowSheetMessage | {
    request?: never;
};
export { activateSocketListener, type SocketMessage };
