/// <reference types="jquery" />
import { DamageDicePF2e, ModifierPF2e } from "@actor/modifiers";
import { AbilityString } from "@actor/types";
import { ItemConstructionContextPF2e, ItemPF2e, SpellcastingEntryPF2e } from "@item";
import { ActionTrait } from "@item/action/data";
import { ItemSourcePF2e, ItemSummaryData } from "@item/data";
import { TrickMagicItemEntry } from "@item/spellcasting-entry/trick";
import { GhostTemplate } from "@module/canvas/ghost-measured-template";
import { ChatMessagePF2e } from "@module/chat-message";
import { OneToTen } from "@module/data";
import { UserPF2e } from "@module/user";
import { CheckRoll } from "@system/check";
import { StatisticRollParameters } from "@system/statistic";
import { EnrichHTMLOptionsPF2e } from "@system/text-editor";
import { SpellData, SpellHeightenLayer, SpellOverlayType, SpellSource } from "./data";
import { SpellOverlayCollection } from "./overlay";
import { MagicSchool, MagicTradition, SpellComponent, SpellTrait } from "./types";
import { DamageRoll } from "@system/damage/roll";
interface SpellConstructionContext extends ItemConstructionContextPF2e {
    fromConsumable?: boolean;
}
interface SpellDamage {
    roll: DamageRoll;
    domains: string[];
    options: Set<string>;
    modifiers: (ModifierPF2e | DamageDicePF2e)[];
    breakdownTags: string[];
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
    get isAttack(): boolean;
    get isCantrip(): boolean;
    get isFocusSpell(): boolean;
    get isRitual(): boolean;
    get ability(): AbilityString;
    get components(): Record<SpellComponent, boolean> & {
        value: string;
    };
    /** Whether this spell has unlimited uses */
    get unlimited(): boolean;
    get isVariant(): boolean;
    get hasVariants(): boolean;
    get uuid(): ItemUUID;
    constructor(data: PreCreate<ItemSourcePF2e>, context?: SpellConstructionContext);
    /** Given a slot level, compute the actual level the spell will be cast at */
    computeCastLevel(slotLevel?: number): number;
    getRollData(rollOptions?: {
        castLevel?: number | string;
    }): NonNullable<EnrichHTMLOptions["rollData"]>;
    get damage(): SpellDamage | null;
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
    toMessage(event?: JQuery.TriggeredEvent, { create, data, rollMode }?: SpellToMessageOptions): Promise<ChatMessagePF2e | undefined>;
    getChatData(htmlOptions?: EnrichHTMLOptionsPF2e, rollOptions?: {
        castLevel?: number | string;
        slotLevel?: number | string;
    }): Promise<Omit<ItemSummaryData, "traits">>;
    rollAttack(this: Embedded<SpellPF2e>, event: JQuery.ClickEvent, attackNumber?: number, context?: StatisticRollParameters): Promise<void>;
    rollDamage(this: Embedded<SpellPF2e>, event: JQuery.ClickEvent<unknown, unknown, HTMLElement>): Promise<Rolled<DamageRoll> | null>;
    /** Roll counteract check */
    rollCounteract(event: JQuery.ClickEvent): Promise<Rolled<CheckRoll> | null>;
    update(data: DocumentUpdateData<this>, options?: DocumentModificationContext<this>): Promise<this>;
    protected _preUpdate(changed: DeepPartial<SpellSource>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
interface SpellPF2e {
    readonly data: SpellData;
    overlays: SpellOverlayCollection;
}
interface SpellToMessageOptions {
    create?: boolean;
    rollMode?: RollMode;
    data?: {
        castLevel?: number;
    };
}
export { SpellPF2e, SpellToMessageOptions };
