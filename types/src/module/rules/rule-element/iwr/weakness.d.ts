import { WeaknessData } from "@actor/data/iwr";
import { WeaknessType } from "@actor/types";
import { IWRRuleElement } from "./base";
/** @category RuleElement */
declare class WeaknessRuleElement extends IWRRuleElement {
    protected dictionary: {
        acid: string;
        adamantine: string;
        air: string;
        "area-damage": string;
        "arrow-vulnerability": string;
        "axe-vulnerability": string;
        bleed: string;
        bludgeoning: string;
        chaotic: string;
        cold: string;
        "cold-iron": string;
        "critical-hits": string;
        darkwood: string;
        earth: string;
        electricity: string;
        emotion: string;
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
        "nonlethal-attacks": string;
        orichalcum: string;
        physical: string;
        piercing: string;
        poison: string;
        positive: string;
        precision: string;
        radiation: string;
        salt: string;
        "salt-water": string;
        silver: string;
        slashing: string;
        sonic: string;
        "splash-damage": string;
        "unarmed-attacks": string;
        "vampire-weaknesses": string;
        vorpal: string;
        "vorpal-fear": string;
        "vulnerable-to-sunlight": string;
        warpglass: string;
        water: string;
        weapons: string;
        "weapons-shedding-bright-light": string;
    };
    get property(): WeaknessData[];
    getIWR(value: number): WeaknessData[];
}
interface WeaknessRuleElement extends IWRRuleElement {
    type: WeaknessType[];
    exceptions: WeaknessType[];
}
export { WeaknessRuleElement };
