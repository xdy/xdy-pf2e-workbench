import { DamageRoll } from "./roll";
import { DamageRollContext, DamageTemplate } from "./types";
/** Create a chat message containing a damage roll */
export declare class DamagePF2e {
    #private;
    static roll(data: DamageTemplate, context: DamageRollContext, callback?: Function): Promise<Rolled<DamageRoll> | null>;
}
