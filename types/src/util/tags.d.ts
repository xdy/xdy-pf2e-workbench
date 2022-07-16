import { TraitViewData } from "@actor/data/base";
import Tagify from "@yaireo/tagify";
declare function traitSlugToObject(trait: string, dictionary: Record<string, string | undefined>): TraitViewData;
/** Create a tagify select menu out of a JSON input element */
declare function tagify(input: HTMLInputElement | null, { whitelist, maxTags }: TagifyOptions): Tagify<TagRecord>;
/**
 * Standard properties expected by Tagify, where the `id` and `value` is what Foundry and the system would respectively
 * call the `value` and `label`
 */
declare type TagRecord = Record<"id" | "value", string>;
interface TagifyOptions {
    /** The maximum number of tags that may be added to the input */
    maxTags?: number;
    /** A whitelist record, typically pulled from `CONFIG.PF2E` */
    whitelist: string[] | Record<string, string | {
        label: string;
    }>;
}
export { tagify, traitSlugToObject };
