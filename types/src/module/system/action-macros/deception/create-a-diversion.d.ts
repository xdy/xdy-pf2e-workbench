import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare const CREATE_A_DIVERSION_VARIANTS: readonly ["distracting-words", "gesture", "trick"];
type CreateADiversionVariant = (typeof CREATE_A_DIVERSION_VARIANTS)[number];
declare function createADiversion(options: {
    variant: CreateADiversionVariant;
} & SkillActionOptions): void;
declare const action: SingleCheckAction;
export { createADiversion as legacy, action };
