import { Alignment } from "@actor/creature/types.ts";
declare function isEvil(alignment: Alignment): boolean;
declare function isGood(alignment: Alignment): boolean;
declare function isLawful(alignment: Alignment): boolean;
declare function isChaotic(alignment: Alignment): boolean;
export { isChaotic, isEvil, isGood, isLawful };
