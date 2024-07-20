import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;

/**
 * Change the image representing an actor's token
 * @category RuleElement
 */
declare class TokenImageRuleElement extends RuleElementPF2e<TokenImageRuleSchema> {
    #private;
    static defineSchema(): TokenImageRuleSchema;
    afterPrepareData(): void;
}
interface TokenImageRuleElement extends RuleElementPF2e<TokenImageRuleSchema>, ModelPropsFromRESchema<TokenImageRuleSchema> {
}
type TokenImageRuleSchema = RuleElementSchema & {
    /** An image or video path */
    value: fields.StringField<string, string, true, false, false>;
    /** An optional scale adjustment */
    scale: fields.NumberField<number, number, false, true, true>;
    /** An optional tint adjustment */
    tint: fields.ColorField;
    /** An optional alpha adjustment */
    alpha: fields.AlphaField<false, true, true>;
    /** Animation options for when the image is applied */
    animation: fields.SchemaField<{
        duration: fields.NumberField<number, number, false, false, false>;
        transition: fields.StringField<TextureTransitionType, TextureTransitionType, false, false, false>;
        easing: fields.StringField<string, string, false, false, false>;
        name: fields.StringField<string, string, false, false, false>;
    }, {
        duration: number | undefined;
        transition: TextureTransitionType | undefined;
        easing: string | undefined;
        name: string | undefined;
    }, {
        duration: number | undefined;
        transition: TextureTransitionType | undefined;
        easing: string | undefined;
        name: string | undefined;
    }, false, true, true>;
};
export { TokenImageRuleElement };
