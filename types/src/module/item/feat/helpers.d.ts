import type { FeatPF2e } from "./document.ts";
/**
 * Whether a feat item can have key ability options
 * The item must be a level-1 class feature that is either not (RE-)granted or is granted by another class feature. It
 * must also only have at most a single trait (assumed to be that of the class)
 */
declare function featCanHaveKeyOptions(feat: FeatPF2e): boolean;
export { featCanHaveKeyOptions };
