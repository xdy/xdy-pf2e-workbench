import { ABCItemPF2e } from "../abc";
import { ClassData, ClassTrait } from "./data";

export declare class ClassPF2e extends ABCItemPF2e {
    static get schema(): typeof ClassData;
    get hpPerLevel(): number;
    /** Prepare a character's data derived from their class */
    prepareActorData(this: Embedded<ClassPF2e>): void;
}
export interface ClassPF2e {
    readonly data: ClassData;
    get slug(): ClassTrait | null;
}
