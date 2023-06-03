import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function track(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { track as legacy, action };
