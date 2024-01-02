import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function feint(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { feint as legacy, action };
