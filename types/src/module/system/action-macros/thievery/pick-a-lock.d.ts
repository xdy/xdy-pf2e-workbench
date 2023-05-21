import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function pickALock(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { pickALock as legacy, action };
