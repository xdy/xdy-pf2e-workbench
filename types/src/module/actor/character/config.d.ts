import { CreatureConfig, CreatureConfigData } from "@actor/creature/config.ts";
import { CharacterPF2e } from "./document.ts";
export declare class CharacterConfig extends CreatureConfig<CharacterPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<PCConfigData>;
}
interface PCConfigData extends CreatureConfigData<CharacterPF2e> {
    showBasicUnarmed: boolean;
}
export {};
