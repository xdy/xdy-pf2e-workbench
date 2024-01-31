import type { CharacterPF2e } from "@actor/character/document.ts";
declare function add(actor: CharacterPF2e): Promise<void>;
declare function remove(actor: CharacterPF2e, event: MouseEvent): void;
export declare const ManageAttackProficiencies: {
    add: typeof add;
    remove: typeof remove;
};
export {};
