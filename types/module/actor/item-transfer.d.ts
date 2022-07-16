import { UserPF2e } from "@module/user";
export interface ItemTransferData {
    source: {
        tokenId?: string;
        actorId: string;
        itemId: string;
    };
    target: {
        tokenId?: string;
        actorId: string;
    };
    quantity: number;
    containerId?: string;
}
export declare class ItemTransfer implements ItemTransferData {
    source: ItemTransferData["source"];
    target: ItemTransferData["target"];
    quantity: number;
    containerId?: string | undefined;
    private templatePaths;
    constructor(source: ItemTransferData["source"], target: ItemTransferData["target"], quantity: number, containerId?: string | undefined);
    request(): Promise<void>;
    enact(requester: UserPF2e): Promise<void>;
    /** Retrieve the full actor from the source or target ID */
    private getActor;
    private getSource;
    private getTarget;
    private static tokenName;
    /** Send a chat message that varies on the types of transaction and parties involved
     * @param requester   The player who requested an item transfer to be performed by the GM
     * @param sourceActor The actor from which the item was dragged
     * @param targetActor The actor on which the item was dropped
     * @param item        The item created on the target actor as a result of the drag & drop
     */
    private sendMessage;
    private messageFlavor;
}
