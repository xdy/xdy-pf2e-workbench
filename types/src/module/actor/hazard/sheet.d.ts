/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "../sheet/base";
import { HazardPF2e } from "./index";

export declare class HazardSheetPF2e extends ActorSheetPF2e<HazardPF2e> {
    static get defaultOptions(): ActorSheetOptions;
    /** Get the HTML template path to use depending on whether this sheet is in edit mode */
    get template(): string;
    getData(): Promise<{
        flags: any;
        hazardTraits: {
            aquatic: string;
            alchemical: string;
            auditory: string;
            clockwork: string;
            consumable: string;
            curse: string;
            environmental: string;
            fungus: string;
            haunt: string;
            inhaled: string;
            kaiju: string;
            magical: string;
            mechanical: string;
            steam: string;
            summoned: string;
            technological: string;
            teleportation: string;
            trap: string;
            virulent: string;
            arcane: string;
            divine: string;
            occult: string;
            primal: string;
            abjuration: string;
            conjuration: string;
            divination: string;
            enchantment: string;
            evocation: string;
            illusion: string;
            necromancy: string;
            transmutation: string;
            light: string;
            mental: string;
            nonlethal: string;
            plant: string;
            radiation: string;
            acid: string;
            cold: string;
            electricity: string;
            fire: string;
            force: string;
            negative: string;
            positive: string;
            sonic: string;
            air: string;
            earth: string;
            water: string;
            chaotic: string;
            evil: string;
            good: string;
            lawful: string;
        };
        actorTraits: string[];
        actorRarities: {
            common: string;
            uncommon: string;
            rare: string;
            unique: string;
        };
        actorRarity: string;
        stealthDC: number;
        hasStealthDescription: string | boolean;
        hasImmunities: boolean | ("hidden" | "force" | "adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "warpglass" | "chaotic" | "evil" | "good" | "lawful" | "bludgeoning" | "piercing" | "slashing" | "bleed" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "untyped" | "alignment" | "coldiron" | "energy" | "ghostTouch" | "physical" | "precision" | "salt" | "salt-water" | "area-damage" | "nonlethal-attacks" | "persistent-damage" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "critical-hits" | "emotion" | "abjuration" | "conjuration" | "divination" | "enchantment" | "evocation" | "illusion" | "necromancy" | "transmutation" | "blinded" | "broken" | "clumsy" | "concealed" | "confused" | "controlled" | "dazzled" | "deafened" | "doomed" | "drained" | "dying" | "encumbered" | "enfeebled" | "fascinated" | "fatigued" | "flat-footed" | "fleeing" | "friendly" | "frightened" | "grabbed" | "helpful" | "hostile" | "immobilized" | "indifferent" | "invisible" | "observed" | "paralyzed" | "petrified" | "prone" | "quickened" | "restrained" | "sickened" | "slowed" | "stunned" | "stupefied" | "unconscious" | "undetected" | "unfriendly" | "unnoticed" | "wounded" | "auditory" | "confusion" | "curse" | "detection" | "death-effects" | "disease" | "fear-effects" | "healing" | "inhaled" | "magic" | "nonmagical-attacks" | "object-immunities" | "olfactory" | "polymorph" | "possession" | "scrying" | "sleep" | "spellDeflection" | "swarm-attacks" | "swarm-mind" | "trip" | "visual")[];
        hasResistances: boolean;
        hasWeaknesses: boolean;
        hasDescription: string | boolean;
        hasDisable: string | boolean;
        hasRoutineDetails: string | boolean;
        hasResetDetails: string | boolean;
        hasHPDetails: string | boolean;
        hasWillSave: boolean;
        brokenThreshold: number;
        isTargetFlatFooted: boolean;
        user: {
            isGM: boolean;
        };
        hasRealContainers?: boolean | undefined;
        totalCoinage: import("../sheet/data-types").CoinageSummary;
        totalCoinageGold: string;
        totalWealth: import("../../item/treasure/helpers").Coins;
        totalWealthGold: string;
        actor: any;
        data: any;
        items: any;
        cssClass: "editable" | "locked";
        effects: RawObject<foundry.abstract.DocumentData<foundry.abstract.Document> & foundry.data.ActiveEffectData<import("../../active-effect").ActiveEffectPF2e>>[];
        limited: boolean;
        options: ActorSheetOptions;
        editable: boolean;
        document: HazardPF2e;
        owner: boolean;
        title: string;
    }>;
    prepareItems(sheetData: any): void;
    activateListeners($html: JQuery): void;
}
