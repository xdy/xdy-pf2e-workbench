import { DamageRoll } from "./roll.ts";
import { DamageRollContext, DamageTemplate } from "./types.ts";
/** Create a chat message containing a damage roll */
export declare class DamagePF2e {
    static roll(data: DamageTemplate, context: DamageRollContext, callback?: Function): Promise<Rolled<DamageRoll> | null>;
}
