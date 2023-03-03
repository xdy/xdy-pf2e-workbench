import { ItemSourcePF2e } from "@item/data";
import { AELikeChangeMode } from "./ae-like";
import { RuleElementPF2e } from "./base";
import { RuleElementSchema } from "./data";
/** A mixin for rule elements that allow item alterations */
declare abstract class WithItemAlterations<TSchema extends RuleElementSchema> {
    static apply<TSchema extends RuleElementSchema>(Class: typeof RuleElementPF2e<TSchema>): void;
    /** Is the item-alteration data structurally sound? Currently only overrides are supported. */
    isValidItemAlteration(data: {}): data is ItemAlterationData[];
    /** Is the item alteration valid for the item type? */
    itemCanBeAltered(this: RuleElementPF2e, source: ItemSourcePF2e, value: unknown): boolean | null;
    /** Set the badge value of a condition or effect */
    applyAlterations(this: WithItemAlterations<TSchema>, itemSource: ItemSourcePF2e): void;
}
interface WithItemAlterations<TSchema extends RuleElementSchema> extends RuleElementPF2e<TSchema> {
    alterations: ItemAlterationData[];
}
interface ItemAlterationData {
    mode: AELikeChangeMode;
    property: string;
    value: string | number | null;
}
export { ItemAlterationData, WithItemAlterations };
