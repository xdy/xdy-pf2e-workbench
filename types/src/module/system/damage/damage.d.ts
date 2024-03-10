import { DamageRoll } from "./roll.ts";
import { DamageDamageContext, DamageTemplate } from "./types.ts";
/** Create a chat message containing a damage roll */
export declare class DamagePF2e {
    static roll(data: DamageTemplate, context: DamageDamageContext, callback?: Function): Promise<Rolled<DamageRoll> | null>;
}
