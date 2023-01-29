/// <reference types="jquery" />
import { BaseRollContext } from "@system/rolls";
/** Returns statistic dialog roll parameters based on held keys */
type ParamsFromEvent = Pick<BaseRollContext, "rollMode" | "skipDialog">;
export declare function eventToRollParams(event: JQuery.TriggeredEvent | MouseEvent): ParamsFromEvent;
export {};
