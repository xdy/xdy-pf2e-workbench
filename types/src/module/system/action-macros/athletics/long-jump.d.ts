import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function longJump(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { longJump as legacy, action };
