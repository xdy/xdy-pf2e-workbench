import { PF2eActorFlag } from "./globals";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { ActorPF2e } from "@actor";

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const Flag = {
    set: async function <K extends keyof PF2eActorFlag, V extends PF2eActorFlag[K]>(actor: ActorPF2e, key: K, data: V) {
        await actor.setFlag(MODULENAME, key, data);
    },
    get: function <K extends keyof PF2eActorFlag>(actor: ActorPF2e, key: K): unknown {
        return actor.getFlag(MODULENAME, key);
    },
} as const;

export function camelize(value: string): string {
    return value.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
}
