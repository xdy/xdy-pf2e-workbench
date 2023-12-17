import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function climb(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { climb as legacy, action };
