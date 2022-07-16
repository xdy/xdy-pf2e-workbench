import { CharacterPF2e } from "@actor";
import { CreatureTrait } from "@actor/creature/data";
import { ItemPF2e } from "@item";
import { Rarity } from "@module/data";
import { HeritageData } from "./data";
declare class HeritagePF2e extends ItemPF2e {
    get traits(): Set<CreatureTrait>;
    get rarity(): Rarity;
    /** Prepare a character's data derived from their heritage */
    prepareActorData(this: Embedded<HeritagePF2e>): void;
}
interface HeritagePF2e extends ItemPF2e {
    readonly parent: CharacterPF2e | null;
    readonly data: HeritageData;
}
export { HeritagePF2e };
