import { ResistanceData } from "@actor/data/iwr";
import { ResistanceType } from "@actor/types";
import { ItemPF2e } from "@item";
import { RuleElementOptions } from "../base";
import { IWRRuleElement, IWRRuleElementSource } from "./base";
/** @category RuleElement */
declare class ResistanceRuleElement extends IWRRuleElement {
    protected dictionary: {
        acid: string;
        adamantine: string;
        air: string;
        "all-damage": string;
        "area-damage": string;
        bleed: string;
        bludgeoning: string;
        chaotic: string;
        cold: string;
        "cold-iron": string;
        "critical-hits": string;
        darkwood: string;
        earth: string;
        electricity: string;
        energy: string;
        evil: string;
        fire: string;
        force: string;
        "ghost-touch": string;
        good: string;
        lawful: string;
        light: string;
        magical: string;
        mental: string;
        metal: string;
        mithral: string;
        negative: string;
        "non-magical": string;
        nonlethal: string;
        "nonlethal-attacks": string;
        orichalcum: string;
        physical: string;
        piercing: string;
        plant: string;
        poison: string;
        positive: string;
        precision: string;
        "protean-anatomy": string;
        radiation: string;
        salt: string;
        "salt-water": string;
        silver: string;
        slashing: string;
        sonic: string;
        "unarmed-attacks": string;
        vorpal: string;
        "vorpal-adamantine": string;
        warpglass: string;
        water: string;
        weapons: string;
        "weapons-shedding-bright-light": string;
    };
    doubleVs: ResistanceType[];
    constructor(data: ResistanceRESource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    get property(): ResistanceData[];
    getIWR(value: number): ResistanceData[];
}
interface ResistanceRuleElement extends IWRRuleElement {
    type: ResistanceType[];
    exceptions: ResistanceType[];
}
interface ResistanceRESource extends IWRRuleElementSource {
    doubleVs?: unknown;
}
export { ResistanceRuleElement };
