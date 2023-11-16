import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function reposition(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { reposition as legacy, action };
