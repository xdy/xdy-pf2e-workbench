import { ZeroToTen } from "@module/data.ts";
import { SpellSlotGroupId } from "./collection.ts";
declare function spellSlotGroupIdToNumber(groupId: SpellSlotGroupId): ZeroToTen;
declare function spellSlotGroupIdToNumber(groupId: Maybe<string | number>): ZeroToTen | null;
/** Try to coerce some value (typically from user input) to a slot group ID */
declare function coerceToSpellGroupId(value: unknown): SpellSlotGroupId | null;
export { coerceToSpellGroupId, spellSlotGroupIdToNumber };
