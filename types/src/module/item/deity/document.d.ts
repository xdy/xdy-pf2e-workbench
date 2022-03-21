import { ItemPF2e } from "@item";
import { DeityData } from "./data";
import { DeitySheetPF2e } from "./sheet";

declare class DeityPF2e extends ItemPF2e {
    static get schema(): typeof DeityData;
}
interface DeityPF2e extends ItemPF2e {
    readonly data: DeityData;
    readonly _sheet: DeitySheetPF2e;
}
export { DeityPF2e };
