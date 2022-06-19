import { ABCItemPF2e, FeatPF2e } from "@item";
import { ClassData, ClassTrait } from "./data";
declare class ClassPF2e extends ABCItemPF2e {
    get hpPerLevel(): number;
    /** Include all class features in addition to any with the expected location ID */
    getLinkedFeatures(): Embedded<FeatPF2e>[];
    /** Prepare a character's data derived from their class */
    prepareActorData(this: Embedded<ClassPF2e>): void;
}
interface ClassPF2e {
    readonly data: ClassData;
    get slug(): ClassTrait | null;
}
export { ClassPF2e };
