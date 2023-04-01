import { SkillActionOptions } from "..";
import { SingleCheckAction } from "@actor/actions";
declare function sneak(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { sneak as legacy, action };
