import type { ActorPF2e } from "@actor";
import type { ZeroToTen } from "@module/data.ts";
import { Statistic } from "@system/statistic/statistic.ts";
import type { SpellSlotGroupId } from "./collection.ts";
import type { SpellcastingEntry } from "./types.ts";
/** Create a statistic that draws from limited domains for the purpose of counteracting. */
declare function createCounteractStatistic<TActor extends ActorPF2e>(ability: SpellcastingEntry<TActor>): Statistic<TActor>;
declare function spellSlotGroupIdToNumber(groupId: SpellSlotGroupId): ZeroToTen;
declare function spellSlotGroupIdToNumber(groupId: Maybe<string | number>): ZeroToTen | null;
/** Try to coerce some value (typically from user input) to a slot group ID */
declare function coerceToSpellGroupId(value: unknown): SpellSlotGroupId | null;
export { coerceToSpellGroupId, createCounteractStatistic, spellSlotGroupIdToNumber };
