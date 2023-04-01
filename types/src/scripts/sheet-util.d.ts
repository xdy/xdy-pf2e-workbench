/// <reference types="jquery" />
import { BaseRollContext } from "@system/rolls";
/** Returns statistic dialog roll parameters based on held keys */
type ParamsFromEvent = Pick<BaseRollContext, "rollMode" | "skipDialog">;
declare function eventToRollParams(event?: JQuery.TriggeredEvent | Event | null): ParamsFromEvent;
export { eventToRollParams };
