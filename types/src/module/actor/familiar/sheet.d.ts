/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { FamiliarPF2e } from "@actor/familiar";
import type { ItemPF2e } from "@item/base";
/**
 * @category Actor
 */
export declare class FamiliarSheetPF2e extends ActorSheet<FamiliarPF2e, ItemPF2e> {
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(): Promise<{
        master: import("../character").CharacterPF2e | null;
        masters: import("../base").ActorPF2e[];
        abilities: {
            str: string;
            dex: string;
            con: string;
            int: string;
            wis: string;
            cha: string;
        };
        size: string;
        familiarAbilities: {
            value: number;
        } | {
            value: number;
            breakdown: string;
        };
        traits: {
            value: string;
            label: string;
            description: string;
        }[];
        actor: any;
        data: any;
        items: any;
        cssClass: "editable" | "locked";
        effects: RawObject<foundry.data.ActiveEffectData<foundry.documents.BaseActiveEffect>>[];
        limited: boolean;
        options: ActorSheetOptions;
        editable: boolean;
        document: FamiliarPF2e;
        owner: boolean;
        title: string;
    }>;
    activateListeners($html: JQuery): void;
}
