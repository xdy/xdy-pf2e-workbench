/// <reference types="jquery" />
import { CharacterPF2e } from "@actor/character";
declare function add(actor: CharacterPF2e, event: JQuery.ClickEvent): Promise<void>;
declare function remove(actor: CharacterPF2e, event: JQuery.ClickEvent): void;
export declare const ManageCombatProficiencies: {
    add: typeof add;
    remove: typeof remove;
};
export {};
