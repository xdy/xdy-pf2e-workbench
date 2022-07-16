import { CharacterPF2e, NPCPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { DamageDiceOverride } from "@actor/modifiers";
import { RuleElementData, RuleElementPF2e } from "./";
import { RuleElementSource } from "./data";
/**
 * @category RuleElement
 */
export declare class DamageDiceRuleElement extends RuleElementPF2e {
    constructor(data: DamageDiceSource, item: Embedded<ItemPF2e>);
    beforePrepareData(): void;
}
export interface DamageDiceRuleElement {
    data: DamageDiceData;
    get actor(): CharacterPF2e | NPCPF2e;
}
interface DamageDiceData extends RuleElementData {
    slug?: string;
    name?: string;
    damageType?: string;
    override?: DamageDiceOverride;
    diceNumber?: number;
}
interface DamageDiceSource extends RuleElementSource {
    name?: unknown;
    damageType?: unknown;
    override?: unknown;
    diceNumber?: unknown;
}
export {};
