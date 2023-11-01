import { SingleCheckAction } from "@actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function demoralize(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, demoralize as legacy };
