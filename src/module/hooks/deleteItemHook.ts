import { ItemPF2e } from "foundry-pf2e";
import { itemHandlingItemHook } from "../feature/damageHandler/dyingHandling.js";

export async function deleteItemHook(item: ItemPF2e, _options: object): Promise<void> {
    await itemHandlingItemHook(item);
}
