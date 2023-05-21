import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function treatPoison(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { treatPoison as legacy, action };
