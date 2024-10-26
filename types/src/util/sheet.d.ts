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
/** Creates a listener that can be used to create tooltips with dynamic content */
declare function createTooltipListener(element: HTMLElement, options: {
    /** Controls if the top edge of this tooltip aligns with the top edge of the target */
    align?: "top";
    /** If given, the tooltip will spawn on elements that match this selector */
    selector?: string;
    locked?: boolean;
    direction?: TooltipActivationOptions["direction"];
    cssClass?: string;
    render: (element: HTMLElement) => Promise<HTMLElement | null>;
}): void;
export { createTooltipListener, eventToRollMode, eventToRollParams };
