/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { CreatureSheetData } from "@actor/creature/index.ts";
import { ActorSheetDataPF2e, InventoryItem } from "@actor/sheet/data-types.ts";
import { AttributeString, SaveType } from "@actor/types.ts";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e, DeityPF2e, FeatPF2e, HeritagePF2e, ItemPF2e, PhysicalItemPF2e } from "@item";
import { ActionCost, Frequency } from "@item/data/base.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
import { MagicTradition } from "@item/spell/types.ts";
import { SpellcastingSheetData } from "@item/spellcasting-entry/types.ts";
import { DropCanvasItemDataPF2e } from "@module/canvas/drop-canvas-data.ts";
import { ActorPF2e } from "@module/documents.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import { DamageType } from "@system/damage/types.ts";
import { CreatureSheetPF2e } from "../creature/sheet.ts";
import { CharacterConfig } from "./config.ts";
import { CraftingEntry, CraftingFormula } from "./crafting/index.ts";
import { CharacterSaveData, CharacterStrike, CharacterSystemData, ClassDCData } from "./data.ts";
import { CharacterPF2e } from "./document.ts";
import { ElementalBlastConfig } from "./elemental-blast.ts";
import { FeatGroup } from "./feats.ts";
import { CHARACTER_SHEET_TABS } from "./values.ts";
declare class CharacterSheetPF2e<TActor extends CharacterPF2e> extends CreatureSheetPF2e<TActor> {
    #private;
    protected readonly actorConfigClass: typeof CharacterConfig;
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(options?: ActorSheetOptions): Promise<CharacterSheetData<TActor>>;
    /** Organize and classify Items for Character sheets */
    prepareItems(sheetData: ActorSheetDataPF2e<CharacterPF2e>): Promise<void>;
    protected prepareInventoryItem(item: PhysicalItemPF2e): InventoryItem;
    activateListeners($html: JQuery): void;
    protected activateInventoryListeners(panel: HTMLElement | null): void;
    /** Toggle availability of the roll-initiative link on the sidebar */
    toggleInitiativeLink(link?: HTMLElement | null): void;
    protected _onDropItem(event: ElementDragEvent, data: DropCanvasItemDataPF2e): Promise<ItemPF2e<ActorPF2e | null>[]>;
    protected _onDrop(event: ElementDragEvent): Promise<boolean | void>;
    /** Handle a drop event for an existing Owned Item to sort that item */
    protected _onSortItem(event: ElementDragEvent, itemSource: ItemSourcePF2e): Promise<ItemPF2e<TActor>[]>;
    /** Overriden to open sub-tabs if requested */
    protected openTab(name: string): void;
}
interface CharacterSheetPF2e<TActor extends CharacterPF2e> extends CreatureSheetPF2e<TActor> {
    getStrikeFromDOM(target: HTMLElement): CharacterStrike | null;
}
type CharacterSheetOptions = ActorSheetOptions;
type CharacterSystemSheetData = CharacterSystemData & {
    attributes: {
        perception: {
            rankName: string;
        };
    };
    details: CharacterSystemData["details"] & {
        keyability: {
            value: keyof typeof CONFIG.PF2E.abilities;
            singleOption: boolean;
        };
    };
    resources: {
        heroPoints: {
            icon: string;
            hover: string;
        };
    };
    saves: Record<SaveType, CharacterSaveData & {
        rankName?: string;
        short?: string;
    }>;
};
export interface CraftingEntriesSheetData {
    dailyCrafting: boolean;
    other: CraftingEntry[];
    alchemical: {
        entries: CraftingEntry[];
        totalReagentCost: number;
        infusedReagents: {
            value: number;
            max: number;
        };
    };
}
interface CraftingSheetData {
    noCost: boolean;
    hasQuickAlchemy: boolean;
    knownFormulas: Record<number, CraftingFormula[]>;
    entries: CraftingEntriesSheetData;
}
type CharacterSheetTabVisibility = Record<(typeof CHARACTER_SHEET_TABS)[number], boolean>;
interface CharacterSheetData<TActor extends CharacterPF2e = CharacterPF2e> extends CreatureSheetData<TActor> {
    abpEnabled: boolean;
    ancestry: AncestryPF2e<CharacterPF2e> | null;
    heritage: HeritagePF2e<CharacterPF2e> | null;
    background: BackgroundPF2e<CharacterPF2e> | null;
    adjustedBonusEncumbranceBulk: boolean;
    adjustedBonusLimitBulk: boolean;
    attributeBoostsAllocated: boolean;
    class: ClassPF2e<CharacterPF2e> | null;
    classDCs: {
        dcs: ClassDCSheetData[];
        /** The slug of the character's primary class DC */
        primary: string | null;
        /** Show class label and individual modifier lists for each class DC */
        perDCDetails: boolean;
    };
    apexAttributeOptions: AttributeString[];
    crafting: CraftingSheetData;
    data: CharacterSystemSheetData;
    deity: DeityPF2e<CharacterPF2e> | null;
    hasStamina: boolean;
    /** This actor has actual containers for stowing, rather than just containers serving as a UI convenience */
    hasRealContainers: boolean;
    magicTraditions: Record<MagicTradition, string>;
    options: CharacterSheetOptions;
    preparationType: Object;
    showPFSTab: boolean;
    spellcastingEntries: SpellcastingSheetData[];
    tabVisibility: CharacterSheetTabVisibility;
    actions: {
        encounter: Record<"action" | "reaction" | "free", {
            label: string;
            actions: ActionSheetData[];
        }>;
        exploration: {
            active: ActionSheetData[];
            other: ActionSheetData[];
        };
        downtime: ActionSheetData[];
    };
    feats: FeatGroup[];
    elementalBlasts: ElementalBlastSheetConfig[];
}
interface ActionSheetData {
    id: string;
    name: string;
    img: string;
    glyph: string | null;
    actionCost: ActionCost | null;
    frequency: Frequency | null;
    feat: FeatPF2e | null;
    traits: SheetOptions;
    exploration?: {
        active: boolean;
    };
    hasEffect: boolean;
}
interface ClassDCSheetData extends ClassDCData {
    icon: string;
    hover: string;
    rankSlug: string;
    rankName: string;
}
interface ElementalBlastSheetConfig extends ElementalBlastConfig {
    damageType: DamageType;
    formula: {
        ranged: {
            damage: string;
            critical: string;
        };
        melee: {
            damage: string;
            critical: string;
        };
    };
}
export { CharacterSheetPF2e, CharacterSheetTabVisibility };
