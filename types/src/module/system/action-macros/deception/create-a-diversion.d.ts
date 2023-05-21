import { SkillActionOptions } from "../index.ts";
declare const CREATE_A_DIVERSION_VARIANTS: readonly ["distracting-words", "gesture", "trick"];
type CreateADiversionVariant = (typeof CREATE_A_DIVERSION_VARIANTS)[number];
export declare function createADiversion(options: {
    variant: CreateADiversionVariant;
} & SkillActionOptions): void;
export {};
