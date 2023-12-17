import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.js";
declare function forceOpen(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { forceOpen as legacy, action };
