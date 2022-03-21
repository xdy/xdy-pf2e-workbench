import { SkillActionOptions } from "../actions";

declare type CreateADiversionVariant = "distracting-words" | "gesture" | "trick";
export declare function createADiversion(options: {
    variant: CreateADiversionVariant;
} & SkillActionOptions): void;
export {};
