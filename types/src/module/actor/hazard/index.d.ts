import { HazardData } from "./data";
import { ActorPF2e } from "@actor/index";
import { Rarity } from "@module/data";
import { SaveType } from "@actor/data";
import { Statistic } from "@system/statistic";
export declare class HazardPF2e extends ActorPF2e {
    static get schema(): typeof HazardData;
    get rarity(): Rarity;
    get isComplex(): boolean;
    /** Minimal check since the disabled status of a hazard isn't logged */
    get canAttack(): boolean;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    protected prepareSaves(): {
        [K in SaveType]?: Statistic;
    };
}
export interface HazardPF2e {
    readonly data: HazardData;
}
