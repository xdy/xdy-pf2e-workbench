import { FeatPF2e, ClassPF2e, ItemPF2e } from "@item/index";
import { AncestrySource, BackgroundSource, ClassSource } from "@item/data";
import { ABCFeatureEntryData } from "@item/abc/data";
import { CharacterPF2e } from "@actor/index";
import type { FeatSource } from "@item/feat/data";
export interface ABCManagerOptions {
    assurance?: string[];
}
export declare class AncestryBackgroundClassManager {
    static addABCItem(source: AncestrySource | BackgroundSource | ClassSource, actor: CharacterPF2e, options?: ABCManagerOptions): Promise<ItemPF2e[]>;
    /** Add or remove class features as appropriate to the PC's level */
    static ensureClassFeaturesForLevel(actor: CharacterPF2e, newLevel: number): Promise<void>;
    static sortClassFeaturesByLevelAndChoiceSet(features: FeatSource[]): FeatSource[];
    static getItemSource(packName: "pf2e.ancestries", name: string): Promise<AncestrySource>;
    static getItemSource(packName: "pf2e.backgrounds", name: string): Promise<BackgroundSource>;
    static getItemSource(packName: "pf2e.classes", name: string): Promise<ClassSource>;
    static getItemSource(packName: "pf2e.feats-srd", name: string): Promise<FeatSource>;
    protected static getClassFeaturesForLevel(item: ClassPF2e | ClassSource, minLevel: number, actorLevel: number): Promise<FeatSource[]>;
    protected static getFeatures(entries: ABCFeatureEntryData[], locationId: string): Promise<FeatSource[]>;
    protected static getFromCompendium(entries: ABCFeatureEntryData[]): Promise<FeatPF2e[]>;
    protected static addFeatures(itemSource: AncestrySource | BackgroundSource, actor: CharacterPF2e, createSource?: boolean, options?: ABCManagerOptions): Promise<ItemPF2e[]>;
}
