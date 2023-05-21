import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function senseMotive(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { senseMotive as legacy, action };
