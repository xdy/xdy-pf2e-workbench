import { ActorPF2e } from "@actor";
import { ConsumablePF2e, SpellcastingEntryPF2e } from "@item";
export declare class ActorSpellcasting extends Collection<SpellcastingEntryPF2e> {
    readonly actor: ActorPF2e;
    constructor(actor: ActorPF2e, entries?: SpellcastingEntryPF2e[]);
    /** Returns a list of entries pre-filtered to SpellcastingEntryPF2e */
    get regular(): SpellcastingEntryPF2e[];
    /**
     * All spellcasting entries that count as prepared/spontaneous, which qualify as a
     * full fledged spellcasting feature for wands and scrolls.
     */
    get spellcastingFeatures(): SpellcastingEntryPF2e[];
    canCastConsumable(item: ConsumablePF2e): boolean;
    refocus(options?: {
        all?: boolean;
    }): {
        "data.resources.focus.value": number;
    } | null;
    /** Recharges all spellcasting entries based on the type of entry it is */
    recharge(): {
        itemUpdates: ((Record<string, unknown> & {
            _id: string;
        }) | (Partial<import("../item/data").ArmorSource> & {
            _id: string;
        }) | (Partial<import("../item/book").BookSource> & {
            _id: string;
        }) | (Partial<import("../item/data").ConsumableSource> & {
            _id: string;
        }) | (Partial<import("../item/container/data").ContainerSource> & {
            _id: string;
        }) | (Partial<import("../item/data").EquipmentSource> & {
            _id: string;
        }) | (Partial<import("../item/treasure/data").TreasureSource> & {
            _id: string;
        }) | (Partial<import("../item/data").WeaponSource> & {
            _id: string;
        }) | (Partial<import("../item/data").ActionSource> & {
            _id: string;
        }) | (Partial<import("../item/data").AncestrySource> & {
            _id: string;
        }) | (Partial<import("../item/data").BackgroundSource> & {
            _id: string;
        }) | (Partial<import("../item/data").ClassSource> & {
            _id: string;
        }) | (Partial<import("../item/data").ConditionSource> & {
            _id: string;
        }) | (Partial<import("../item/deity").DeitySource> & {
            _id: string;
        }) | (Partial<import("../item/data").EffectSource> & {
            _id: string;
        }) | (Partial<import("../item/data").FeatSource> & {
            _id: string;
        }) | (Partial<import("../item/heritage/data").HeritageSource> & {
            _id: string;
        }) | (Partial<import("../item/data").KitSource> & {
            _id: string;
        }) | (Partial<import("../item/data").LoreSource> & {
            _id: string;
        }) | (Partial<import("../item/data").MeleeSource> & {
            _id: string;
        }) | (Partial<import("../item/data").SpellcastingEntrySource> & {
            _id: string;
        }) | (Partial<import("../item/data").SpellSource> & {
            _id: string;
        }))[];
        actorUpdates: {
            "data.resources.focus.value": number;
        } | null;
    };
}
