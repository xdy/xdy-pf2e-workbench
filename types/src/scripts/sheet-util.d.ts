/// <reference types="jquery" resolution-mode="require"/>
/** Returns statistic dialog roll parameters based on held keys */
type ParamsFromEvent = {
    skipDialog: boolean;
    rollMode?: RollMode | "roll";
};
/** Set roll mode and dialog skipping from a user's input */
declare function eventToRollParams(event: Maybe<JQuery.TriggeredEvent | Event>, rollType: {
    type: "check" | "damage";
}): ParamsFromEvent;
/** Set roll mode from a user's input: used for messages that are not actually rolls. */
declare function eventToRollMode(event: Maybe<Event>): RollMode | "roll";
export { eventToRollMode, eventToRollParams };
