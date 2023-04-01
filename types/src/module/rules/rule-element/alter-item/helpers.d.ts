import { ItemSourcePF2e } from "@item/data";
import { ItemAlterationData } from "./schema";
/** Set the badge value of a condition or effect */
declare function applyAlterations(itemSource: ItemSourcePF2e, alterations: ItemAlterationData[]): void;
export { applyAlterations };
