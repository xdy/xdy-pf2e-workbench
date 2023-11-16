/// <reference types="jquery" resolution-mode="require"/>
/** Returns statistic dialog roll parameters based on held keys */
type ParamsFromEvent = {
    skipDialog: boolean;
    rollMode?: RollMode | "roll";
};
declare function eventToRollParams(event: Maybe<JQuery.TriggeredEvent | Event>, rollType: {
    type: "check" | "damage";
}): ParamsFromEvent;
export { eventToRollParams };
