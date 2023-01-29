import { EquippedData } from "./data";
interface HeldUsage {
    value: string;
    type: "held";
    hands: number;
}
interface WornUsage {
    value: string;
    type: "worn";
    where?: string | null;
    hands?: 0;
}
export type UsageDetails = HeldUsage | WornUsage;
export declare function isEquipped(usage: UsageDetails, equipped: EquippedData): boolean;
export declare function getUsageDetails(usage: string): UsageDetails;
export {};
