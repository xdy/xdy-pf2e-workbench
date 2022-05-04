/// <reference types="jquery" />
import { ItemPF2e, ItemConstructionContextPF2e, SpellcastingEntryPF2e } from "@item";
import { MagicTradition } from "@item/spellcasting-entry/data";
import { OneToTen } from "@module/data";
import { MagicSchool, SpellData, SpellHeightenLayer, SpellTrait } from "./data";
import { ItemSourcePF2e } from "@item/data";
import { TrickMagicItemEntry } from "@item/spellcasting-entry/trick";
import { ChatMessagePF2e } from "@module/chat-message";
import { EnrichHTMLOptionsPF2e } from "@system/text-editor";
import { UserPF2e } from "@module/user";
import { StatisticRollParameters } from "@system/statistic";
interface SpellConstructionContext extends ItemConstructionContextPF2e {
    fromConsumable?: boolean;
}
export declare class SpellPF2e extends ItemPF2e {
    static get schema(): typeof SpellData;
    readonly isFromConsumable: boolean;
    /** The original spell. Only exists if this is a variant */
    original?: SpellPF2e;
    /** Set if casted with trick magic item. Will be replaced via overriding spellcasting on cast later. */
    trickMagicEntry?: TrickMagicItemEntry;
    get baseLevel(): OneToTen;
    /**
     * Heightened level of the spell if heightened, otherwise base.
     * This applies for spontaneous or innate spells usually, but not prepared ones.
     */
    get level(): number;
    get traits(): Set<SpellTrait>;
    get school(): MagicSchool;
    get traditions(): Set<MagicTradition>;
    get spellcasting(): SpellcastingEntryPF2e | undefined;
    get isCantrip(): boolean;
    get isFocusSpell(): boolean;
    get isRitual(): boolean;
    get components(): {
        value: string;
        focus: boolean;
        material: boolean;
        somatic: boolean;
        verbal: boolean;
    };
    /** Returns true if this spell has unlimited uses, false otherwise. */
    get unlimited(): boolean;
    get isVariant(): boolean;
    constructor(data: PreCreate<ItemSourcePF2e>, context?: SpellConstructionContext);
    private computeCastLevel;
    getRollData(rollOptions?: {
        spellLvl?: number | string;
    }): NonNullable<EnrichHTMLOptions["rollData"]>;
    /** Calculates the full damage formula for a specific spell level */
    getDamageFormula(castLevel?: number, rollData?: object): string;
    /**
     * Loads an alternative version of this spell, called a variant.
     * The variant is created via the application of one or more overlays based on parameters.
     * This handles heightening as well as alternative cast modes of spells.
     * If there's nothing to apply, returns null.
     */
    loadVariant(this: SpellPF2e, castLevel: number): SpellPF2e | null;
    getHeightenLayers(level?: number): SpellHeightenLayer[];
    prepareBaseData(): void;
    prepareSiblingData(this: Embedded<SpellPF2e>): void;
    getRollOptions(prefix?: string): string[];
    toMessage(event?: JQuery.TriggeredEvent, { create, data }?: {
        create?: boolean | undefined;
        data?: {} | undefined;
    }): Promise<ChatMessagePF2e | undefined>;
    getChatData(htmlOptions?: EnrichHTMLOptionsPF2e, rollOptions?: {
        spellLvl?: number | string;
    }): Record<string, unknown>;
    rollAttack(this: Embedded<SpellPF2e>, event: JQuery.ClickEvent, attackNumber?: number, context?: StatisticRollParameters): void;
    rollDamage(this: Embedded<SpellPF2e>, event: JQuery.ClickEvent): void;
    /**
     * Roll Counteract check
     * Rely upon the DicePF2e.d20Roll logic for the core implementation
     */
    rollCounteract(event: JQuery.ClickEvent): void;
    protected _preUpdate(changed: DeepPartial<this["data"]["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
export interface SpellPF2e {
    readonly data: SpellData;
}
export {};
