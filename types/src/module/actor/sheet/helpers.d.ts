import type { ActorPF2e } from "@actor";
import { Sense } from "@actor/creature/sense.ts";
import { AbilityItemPF2e, FeatPF2e, PhysicalItemPF2e } from "@item";
import { AbilityViewData } from "./data-types.ts";

declare function onClickCreateSpell(actor: ActorPF2e, data: Record<string, string | undefined>): void;
/** Create a price label like "L / 10" when appropriate. */
declare function createBulkPerLabel(item: PhysicalItemPF2e): string;
/** Returns a sense list with all redundant senses removed (such as low light vision on actors with darkvision) */
declare function condenseSenses(senses: Sense[]): Sense[];
/** Creates ability or feat view data for actor sheet actions rendering */
declare function createAbilityViewData(item: AbilityItemPF2e | FeatPF2e): AbilityViewData;
export { condenseSenses, createAbilityViewData, createBulkPerLabel, onClickCreateSpell };
