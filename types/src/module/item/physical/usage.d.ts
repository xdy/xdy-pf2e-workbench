import { EquippedData } from "./data";
interface Held {
    type: "held";
    hands: number;
}
interface Worn {
    type: "worn";
    where?: string | null;
    hands?: 0;
}
declare type Usage = Held | Worn;
declare type NoUsage = {
    type: null;
};
export declare type UsageDetails = Usage | NoUsage;
export declare function isEquipped(usage: UsageDetails, equipped: EquippedData): boolean;
export declare function getUsageDetails(usage: string | null): UsageDetails;
export {};
