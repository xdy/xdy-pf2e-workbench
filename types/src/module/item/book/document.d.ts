import { PhysicalItemPF2e } from "@item";
import { BookData } from "./data";
declare class BookPF2e extends PhysicalItemPF2e {
    static get schema(): typeof BookData;
}
interface BookPF2e extends PhysicalItemPF2e {
    readonly data: BookData;
}
export { BookPF2e };
