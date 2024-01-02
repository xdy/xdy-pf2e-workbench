import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare function makeAnImpression(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { makeAnImpression as legacy, action };
