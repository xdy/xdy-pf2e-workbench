/// <reference types="jquery" />
import { ItemConstructionContextPF2e, ItemPF2e, SpellcastingEntryPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
import { TrickMagicItemEntry } from "@item/spellcasting-entry/trick";
import { GhostTemplate } from "@module/canvas/ghost-measured-template";
import { ChatMessagePF2e } from "@module/chat-message";
import { OneToTen } from "@module/data";
import { UserPF2e } from "@module/user";
import { StatisticRollParameters } from "@system/statistic";
import { EnrichHTMLOptionsPF2e } from "@system/text-editor";
import { SpellData, SpellHeightenLayer, SpellOverlayType, SpellSource } from "./data";
import { MagicSchool, MagicTradition, SpellComponent, SpellTrait } from "./types";
import { SpellOverlayCollection } from "./overlay";
import { ActionTrait } from "@item/action/data";
interface SpellConstructionContext extends ItemConstructionContextPF2e {
    fromConsumable?: boolean;
}
declare class SpellPF2e extends ItemPF2e {
    readonly isFromConsumable: boolean;
    /** The original spell. Only exists if this is a variant */
    original?: SpellPF2e;
    /** The overlays that were applied to create this variant */
    appliedOverlays?: Map<SpellOverlayType, string>;
    /** Set if casted with trick magic item. Will be replaced via overriding spellcasting on cast later. */
    trickMagicEntry: TrickMagicItemEntry | null;
    get baseLevel(): OneToTen;
    /**
     * Heightened level of the spell if heightened, otherwise base.
     * This applies for spontaneous or innate spells usually, but not prepared ones.
     */
    get level(): number;
    get traits(): Set<SpellTrait>;
    /** Action traits added when Casting this Spell */
    get castingTraits(): ActionTrait[];
    get school(): MagicSchool;
    get traditions(): Set<MagicTradition>;
    get spellcasting(): SpellcastingEntryPF2e | undefined;
    get isCantrip(): boolean;
    get isFocusSpell(): boolean;
    get isRitual(): boolean;
    get components(): Record<SpellComponent, boolean> & {
        value: string;
    };
    /** Whether this spell has unlimited uses */
    get unlimited(): boolean;
    get isVariant(): boolean;
    get hasVariants(): boolean;
    get uuid(): ItemUUID;
    constructor(data: PreCreate<ItemSourcePF2e>, context?: SpellConstructionContext);
    private computeCastLevel;
    getRollData(rollOptions?: {
        spellLvl?: number | string;
    }): NonNullable<EnrichHTMLOptions["rollData"]>;
    /** Calculates the full damage formula for a specific spell level */
    private getDamageFormula;
    /**
     * Loads an alternative version of this spell, called a variant.
     * The variant is created via the application of one or more overlays based on parameters.
     * This handles heightening as well as alternative cast modes of spells.
     * If there's nothing to apply, returns null.
     */
    loadVariant(options?: {
        castLevel?: number;
        overlayIds?: string[];
    }): Embedded<SpellPF2e> | null;
    getHeightenLayers(level?: number): SpellHeightenLayer[];
    createTemplate(): GhostTemplate;
    placeTemplate(): void;
    prepareBaseData(): void;
    prepareSiblingData(this: Embedded<SpellPF2e>): void;
    getRollOptions(prefix?: string): string[];
    toMessage(event?: JQuery.TriggeredEvent, { create, data }?: ToMessageOptions): Promise<ChatMessagePF2e | undefined>;
    getChatData(htmlOptions?: EnrichHTMLOptionsPF2e, rollOptions?: {
        spellLvl?: number | string;
    }): Record<string, unknown>;
    rollAttack(this: Embedded<SpellPF2e>, event: JQuery.ClickEvent, attackNumber?: number, context?: StatisticRollParameters): Promise<void>;
    rollDamage(this: Embedded<SpellPF2e>, event: JQuery.ClickEvent<unknown, unknown, HTMLElement>): Promise<void>;
    /**
     * Roll Counteract check
     * Rely upon the DicePF2e.d20Roll logic for the core implementation
     */
    rollCounteract(event: JQuery.ClickEvent): void;
    update(data: DocumentUpdateData<this>, options?: DocumentModificationContext<this>): Promise<this>;
    protected _preUpdate(changed: DeepPartial<SpellSource>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
interface SpellPF2e {
    readonly data: SpellData;
    overlays: SpellOverlayCollection;
}
interface ToMessageOptions {
    create?: boolean;
    data?: Record<string, unknown> & {
        slotLevel?: number;
        castLevel?: number;
    };
}
export { SpellPF2e };
