/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { PhysicalItemPF2e } from "@item";
import { PickAThingPrompt, PickableThing } from "@module/apps/pick-a-thing-prompt.ts";
/** A prompt for the user to select an item to receive an attachment */
declare class ItemAttacher<TItem extends PhysicalItemPF2e> extends PickAThingPrompt<TItem, PhysicalItemPF2e> {
    #private;
    static get defaultOptions(): ApplicationOptions;
    constructor({ item }: {
        item: TItem;
    });
    /** Only allow one of these dialogs to be open. */
    get id(): string;
    get title(): string;
    protected getSelection(event: MouseEvent): PickableThing<PhysicalItemPF2e> | null;
    resolveSelection(): Promise<PickableThing<PhysicalItemPF2e> | null>;
    activateListeners($html: JQuery<HTMLElement>): void;
}
export { ItemAttacher };
