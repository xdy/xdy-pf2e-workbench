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
    /** Whether this is a merchant transaction. If null, presume yes if merchant */
    isPurchase?: boolean | null;
}
export declare class ItemTransfer implements ItemTransferData {
    #private;
    source: ItemTransferData["source"];
    target: ItemTransferData["target"];
    quantity: number;
    containerId?: string;
    isPurchase: boolean | null;
    constructor(data: ItemTransferData);
    request(): Promise<void>;
    enact(requester: UserPF2e): Promise<void>;
}
