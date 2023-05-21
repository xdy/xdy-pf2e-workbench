import { EquippedData } from "./data.ts";
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
interface CarriedUsage {
    value: "carried";
    type: "carried";
    hands?: 0;
}
type UsageDetails = HeldUsage | WornUsage | CarriedUsage;
type UsageType = UsageDetails["type"];
declare function isEquipped(usage: UsageDetails, equipped: EquippedData): boolean;
declare function getUsageDetails(usage: string): UsageDetails;
export { UsageDetails, UsageType, getUsageDetails, isEquipped };
