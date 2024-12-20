import type { ActorPF2e, CharacterPF2e } from "@actor";
import type { FeatSlotData } from "@actor/character/feats/index.ts";
import { SaveType } from "@actor/types.ts";
import { ABCItemPF2e, FeatPF2e } from "@item";
import { ZeroToFour } from "@module/data.ts";
import { ClassAttackProficiencies, ClassDefenseProficiencies, ClassSource, ClassSystemData } from "./data.ts";
import { ClassTrait } from "./types.ts";

declare class ClassPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ABCItemPF2e<TParent> {
    get attacks(): ClassAttackProficiencies;
    get defenses(): ClassDefenseProficiencies;
    get hpPerLevel(): number;
    get perception(): ZeroToFour;
    get savingThrows(): Record<SaveType, ZeroToFour>;
    get grantedFeatSlots(): Record<"ancestry" | "class" | "skill" | "general", (number | FeatSlotData)[]>;
    /** Include all top-level class features in addition to any with the expected location ID */
    getLinkedItems(): FeatPF2e<ActorPF2e>[];
    /** Pulls the features that should be granted by this class, sorted by level */
    createGrantedItems(options?: {
        level?: number;
    }): Promise<FeatPF2e<null>[]>;
    prepareBaseData(): void;
    /** Prepare a character's data derived from their class */
    prepareActorData(this: ClassPF2e<CharacterPF2e>): void;
}
interface ClassPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ABCItemPF2e<TParent> {
    readonly _source: ClassSource;
    system: ClassSystemData;
    get slug(): ClassTrait | null;
}
export { ClassPF2e };
