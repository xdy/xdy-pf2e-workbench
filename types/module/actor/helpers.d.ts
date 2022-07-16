import { ItemPF2e } from "@item";
/** Find the lowest multiple attack penalty for an attack with a given item */
declare function calculateMAPs(item: ItemPF2e, { domains, options }: {
    domains: string[];
    options: string[];
}): MAPData;
interface MAPData {
    label: string;
    map1: number;
    map2: number;
}
export { calculateMAPs };
