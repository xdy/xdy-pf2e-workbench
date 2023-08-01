/// <reference types="jquery" resolution-mode="require"/>
/** Returns statistic dialog roll parameters based on held keys */
type ParamsFromEvent = {
    skipDialog: boolean;
    rollMode?: RollMode | "roll";
};
declare function eventToRollParams(event?: JQuery.TriggeredEvent | Event | null): ParamsFromEvent;
export { eventToRollParams };
