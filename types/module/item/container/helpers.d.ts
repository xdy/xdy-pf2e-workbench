import { ContainerPF2e, PhysicalItemPF2e } from "@item";
/**
 * Detect if adding an item to a container would produce a cycle
 * @param item The item being added to a container
 * @param container The container to which the item is being added
 */
export declare function isCycle(item: PhysicalItemPF2e, container: Embedded<ContainerPF2e>): boolean;
/** Returns true if any of the item's container ancestry is extradimensional */
export declare function hasExtraDimensionalParent(item: ContainerPF2e, encountered?: Set<string>): boolean;
