/// <reference types="jquery" resolution-mode="require"/>
import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";

/** Prepare form options on an item or actor sheet */
declare function createSheetOptions(options: Record<string, string | {
    label: string;
}>, selections?: SheetSelections, { selected }?: {
    selected?: boolean | undefined;
}): SheetOptions;
declare function createSheetTags(options: Record<string, string | {
    label: string;
}>, selections: SheetSelections): SheetOptions;
declare function createTagifyTraits(traits: Iterable<string>, { sourceTraits, record }: TagifyTraitOptions): TagifyEntry[];
/**
 * Get a CSS class for an adjusted value
 * @param value A value from prepared/derived data
 * @param base A value from base/source data
 * @param options.better Which value is "better" in the context of the data: default is "higher"
 **/
declare function getAdjustment(value: number, base: number, { better }?: {
    better?: "higher" | "lower";
}): "adjusted-higher" | "adjusted-lower" | null;
declare function getAdjustedValue(value: number, reference: number, options?: {
    better?: "higher" | "lower";
}): AdjustedValue;
interface AdjustedValue {
    value: number;
    adjustedHigher: boolean;
    adjustedLower: boolean;
    adjustmentClass: "adjusted-higher" | "adjusted-lower" | null;
}
/** Override to refocus tagify elements in _render() to workaround handlebars full re-render */
declare function maintainFocusInRender(sheet: Application, renderLogic: () => Promise<void>): Promise<void>;
declare function getItemFromDragEvent(event: DragEvent): Promise<ItemPF2e | null>;
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
/** Given a uuid, loads the item and sends it to chat, potentially recontextualizing it with a given actor */
declare function sendItemToChat(itemUuid: ItemUUID, options: {
    event?: Event;
    actor?: ActorPF2e;
}): Promise<void>;
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
interface SheetOption {
    value: string;
    label: string;
    selected: boolean;
}
type SheetOptions = Record<string, SheetOption>;
type SheetSelections = {
    value: (string | number)[];
} | (string[] & {
    custom?: never;
});
interface TagifyTraitOptions {
    sourceTraits?: Iterable<string>;
    record?: Record<string, string>;
}
interface TagifyEntry {
    id: string;
    value: string;
    /** If true, the tag will exist in tagify but unremovable. */
    readonly: boolean;
    /**
     * If true, it will be hidden from tagify itself but exist in submit data.
     * Tagify treats any value as true, even false or null.
     */
    hidden?: true;
}
export { createSheetOptions, createSheetTags, createTagifyTraits, createTooltipListener, eventToRollMode, eventToRollParams, getAdjustedValue, getAdjustment, getItemFromDragEvent, maintainFocusInRender, sendItemToChat, };
export type { AdjustedValue, SheetOption, SheetOptions, TagifyEntry };
