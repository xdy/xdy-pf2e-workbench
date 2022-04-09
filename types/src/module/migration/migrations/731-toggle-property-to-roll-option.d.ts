import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { Migration727TrimSelfRollOptions } from "./727-trim-self-roll-options";
/** Retire ToggleProperty rule element, converting them to toggleable RollOption ones */
export declare class Migration731TogglePropertyToRollOption extends Migration727TrimSelfRollOptions {
    #private;
    static version: number;
    protected optionPattern: RegExp;
    protected optionReplacement: string;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
