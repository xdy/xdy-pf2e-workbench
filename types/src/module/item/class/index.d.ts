import { SaveType } from "@actor/types";
import { ABCItemPF2e, FeatPF2e } from "@item";
import { ZeroToFour } from "@module/data";
import { ClassData, ClassTrait } from "./data";
declare class ClassPF2e extends ABCItemPF2e {
    get attacks(): {
        simple: ZeroToFour;
        martial: ZeroToFour;
        advanced: ZeroToFour;
        unarmed: ZeroToFour;
        other: {
            name: string;
            rank: ZeroToFour;
        };
    };
    get defenses(): {
        unarmored: ZeroToFour;
        light: ZeroToFour;
        medium: ZeroToFour;
        heavy: ZeroToFour;
    };
    get classDC(): ZeroToFour;
    get hpPerLevel(): number;
    get perception(): ZeroToFour;
    get savingThrows(): Record<SaveType, ZeroToFour>;
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
