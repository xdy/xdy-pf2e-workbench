import { CharacterPF2e } from "@actor";
import { ConsumablePF2e, TrickMagicItemDifficultyData } from "@item";
import { TrickMagicItemSkill } from "@item/spellcasting-entry/trick";
export declare class TrickMagicItemPopup {
    /** The wand or scroll being "tricked" */
    readonly item: Embedded<ConsumablePF2e>;
    /** The actor doing the tricking */
    readonly actor: CharacterPF2e;
    /** The skill DC of the action's check */
    readonly checkDC: TrickMagicItemDifficultyData;
    private translations;
    constructor(item: Embedded<ConsumablePF2e>);
    private initialize;
    handleTrickItem(skill: TrickMagicItemSkill): void;
}
