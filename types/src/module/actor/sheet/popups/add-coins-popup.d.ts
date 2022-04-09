import { Coins } from "@item/treasure/helpers";
import { ActorPF2e } from "@actor/base";
interface AddCoinsFormData extends Coins {
    combineStacks: boolean;
}
/**
 * @category Other
 */
export declare class AddCoinsPopup extends FormApplication<ActorPF2e> {
    static get defaultOptions(): FormApplicationOptions;
    _updateObject(_event: Event, formData: Record<string, unknown> & AddCoinsFormData): Promise<void>;
}
export {};
