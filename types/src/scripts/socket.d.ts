import { ItemTransferData } from "@actor/item-transfer";
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
export type SocketEventCallback = [
    message: TransferCallbackMessage | RefreshControlsMessage | {
        request?: never;
    },
    userId: string
];
export declare function activateSocketListener(): void;
export {};
