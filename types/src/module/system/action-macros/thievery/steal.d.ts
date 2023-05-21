import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function steal(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { steal as legacy, action };
