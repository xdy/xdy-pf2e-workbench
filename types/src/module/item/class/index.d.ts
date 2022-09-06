import { FeatSlotLevel } from "@actor/character/feats";
import { SaveType } from "@actor/types";
import { ABCItemPF2e, FeatPF2e } from "@item";
import { ZeroToFour } from "@module/data";
import { ClassAttackProficiencies, ClassData, ClassDefenseProficiencies, ClassTrait } from "./data";
declare class ClassPF2e extends ABCItemPF2e {
    get attacks(): ClassAttackProficiencies;
    get defenses(): ClassDefenseProficiencies;
    get classDC(): ZeroToFour;
    get hpPerLevel(): number;
    get perception(): ZeroToFour;
    get savingThrows(): Record<SaveType, ZeroToFour>;
    get grantedFeatSlots(): {
        ancestry: FeatSlotLevel[];
        class: number[];
        skill: number[];
        general: number[];
    };
    /** Include all class features in addition to any with the expected location ID */
    getLinkedFeatures(): Embedded<FeatPF2e>[];
    prepareBaseData(): void;
    /** Prepare a character's data derived from their class */
    prepareActorData(this: Embedded<ClassPF2e>): void;
}
interface ClassPF2e {
    readonly data: ClassData;
    get slug(): ClassTrait | null;
}
export { ClassPF2e };
