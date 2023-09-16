import type { UserPF2e } from "@module/user/document.ts";
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
    #private;
    source: ItemTransferData["source"];
    target: ItemTransferData["target"];
    quantity: number;
    containerId?: string | undefined;
    constructor(source: ItemTransferData["source"], target: ItemTransferData["target"], quantity: number, containerId?: string | undefined);
    request(): Promise<void>;
    enact(requester: UserPF2e): Promise<void>;
}
