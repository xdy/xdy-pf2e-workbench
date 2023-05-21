import { TraitViewData } from "@actor/data/base.ts";
import Tagify from "@yaireo/tagify";
type WhitelistData = string[] | Record<string, string | {
    label: string;
}>;
declare function traitSlugToObject(trait: string, dictionary: Record<string, string | undefined>): TraitViewData;
/** Create a tagify select menu out of a JSON input element */
declare function tagify(input: HTMLInputElement, options?: TagifyOptions): Tagify<TagRecord>;
declare function tagify(input: HTMLInputElement | null, options?: TagifyOptions): Tagify<TagRecord> | null;
/**
 * Standard properties expected by Tagify, where the `id` and `value` is what Foundry and the system would respectively
 * call the `value` and `label`
 */
type TagRecord = Record<"id" | "value", string>;
interface TagifyOptions {
    /** The maximum number of tags that may be added to the input */
    maxTags?: number;
    /** A whitelist record, typically pulled from `CONFIG.PF2E` */
    whitelist?: WhitelistData;
    /** Whether this whitelist is exhaustive */
    enforceWhitelist?: boolean;
}
export { tagify, traitSlugToObject };
