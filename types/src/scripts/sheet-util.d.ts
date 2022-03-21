/// <reference types="jquery" />
/** Returns statistic dialog roll parameters based on held keys */
interface ParamsFromEvent {
    secret?: boolean;
    skipDialog: boolean;
}
export declare function eventToRollParams(event: JQuery.TriggeredEvent | PointerEvent): ParamsFromEvent;
export {};
