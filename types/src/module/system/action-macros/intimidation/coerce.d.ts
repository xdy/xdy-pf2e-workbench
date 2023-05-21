import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function coerce(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { coerce as legacy, action };
