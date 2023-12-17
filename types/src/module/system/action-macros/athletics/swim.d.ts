import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function swim(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { swim as legacy, action };
