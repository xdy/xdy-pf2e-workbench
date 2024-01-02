import { ActorPF2e } from "@actor/base.ts";
import { ContainerPF2e, PhysicalItemPF2e } from "@item";
/**
 * Detect if adding an item to a container would produce a cycle
 * @param item The item being added to a container
 * @param container The container to which the item is being added
 */
declare function isContainerCycle(item: PhysicalItemPF2e, container: ContainerPF2e<ActorPF2e>): boolean;
/** Returns true if any of the item's container ancestry is extradimensional */
declare function hasExtraDimensionalParent(item: ContainerPF2e, encountered?: Set<string>): boolean;
export { hasExtraDimensionalParent, isContainerCycle };
