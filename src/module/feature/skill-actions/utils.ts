import { PF2eActorFlag } from "./globals";
import { MODULENAME } from "../../xdy-pf2e-workbench";

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const Flag = {
    set: async function <K extends keyof PF2eActorFlag, V extends PF2eActorFlag[K]>(actor: Actor, key: K, data: V) {
        await actor.setFlag(MODULENAME, key, data);
    },
    get: function <K extends keyof PF2eActorFlag>(actor: Actor, key: K): unknown {
        return actor.getFlag(MODULENAME, key);
    },
} as const;

export function camelize(value: string): string {
    return value.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
}
