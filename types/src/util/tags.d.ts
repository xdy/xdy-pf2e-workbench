import { TraitViewData } from "@actor/data/base.ts";
import { HTMLTagifyTagsElement } from "@system/html-elements/tagify-tags.ts";
import Tagify, { TagifySettings } from "@yaireo/tagify";

declare function traitSlugToObject(trait: string, dictionary: Record<string, string | undefined>): TraitViewData;
/** Create a tagify select menu out of a JSON input element */
declare function tagify(element: HTMLInputElement, options?: TagifyOptions): Tagify<TagRecord>;
declare function tagify(element: HTMLTagifyTagsElement, options?: TagifyOptions): Tagify<TagRecord>;
declare function tagify(element: HTMLInputElement | HTMLTagifyTagsElement | null, options?: TagifyOptions): Tagify<TagRecord> | null;
/**
 * Standard properties expected by Tagify, where the `id` and `value` is what Foundry and the system would respectively
 * call the `value` and `label`
 */
type TagRecord = Record<"id" | "value", string>;
type WhitelistData = string[] | Record<string, string | {
    label: string;
}>;
interface TagifyOptions {
    /** The maximum number of tags that may be added to the input */
    maxTags?: number;
    /** A whitelist record, typically pulled from `CONFIG.PF2E` */
    whitelist?: WhitelistData;
    /** Whether this whitelist is exhaustive */
    enforceWhitelist?: boolean;
    /**
     *  Number of clicks to enter edit mode: `1` for single click, `2` for a double-click.
     * `false` or `null` will disallow editing.
     * @default {clicks: 2, keepInvalid: true}
     */
    editTags?: TagifySettings["editTags"];
    /**
     * RegEx string. Split tags by any of these delimiters. Example delimiters: ",|.| " (comma, dot, or whitespace)
     * @default ','
     */
    delimiters?: TagifySettings["delimiters"];
}
export { tagify, traitSlugToObject };
