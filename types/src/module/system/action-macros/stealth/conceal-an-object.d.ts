import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function concealAnObject(options: SkillActionOptions): Promise<void>;
declare const action: SingleCheckAction;
export { concealAnObject as legacy, action };
