import { ActorPF2e } from "@actor";
import { ConditionSource } from "@item";
import { DamageInstance, DamageRoll } from "./roll";
/** Apply an actor's IWR applications to an evaluated damage roll's instances */
declare function applyIWR(actor: ActorPF2e, roll: Rolled<DamageRoll>, rollOptions: Set<string>): IWRApplicationData;
/** Get the theoretic maximum damage for an instance of persistent damage after applying IWR */
declare function maxPersistentAfterIWR(actor: ActorPF2e, data: ConditionSource, rollOptions: Set<string>): Promise<number>;
interface IWRApplicationData {
    finalDamage: number;
    applications: IWRApplication[];
    persistent: DamageInstance[];
}
interface UnafectedApplication {
    category: "unaffected";
    type: string;
    adjustment: number;
}
interface ImmunityApplication {
    category: "immunity";
    type: string;
    adjustment: number;
}
interface WeaknessApplication {
    category: "weakness";
    type: string;
    adjustment: number;
}
interface ResistanceApplication {
    category: "resistance";
    type: string;
    adjustment: number;
    ignored: boolean;
}
type IWRApplication = UnafectedApplication | ImmunityApplication | WeaknessApplication | ResistanceApplication;
export { IWRApplication, IWRApplicationData, applyIWR, maxPersistentAfterIWR };
