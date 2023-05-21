import { SingleCheckAction } from "@actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function balance(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { balance as legacy, action };
