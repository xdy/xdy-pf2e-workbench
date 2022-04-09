import { ABCItemPF2e, FeatPF2e } from "@item";
import { ClassData, ClassTrait } from "./data";
export declare class ClassPF2e extends ABCItemPF2e {
    static get schema(): typeof ClassData;
    get hpPerLevel(): number;
    /** Include all class features in addition to any with the expected location ID */
    getLinkedFeatures(): Embedded<FeatPF2e>[];
    /** Prepare a character's data derived from their class */
    prepareActorData(this: Embedded<ClassPF2e>): void;
}
export interface ClassPF2e {
    readonly data: ClassData;
    get slug(): ClassTrait | null;
}
