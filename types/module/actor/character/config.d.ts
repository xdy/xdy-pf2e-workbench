import { CreatureConfig, CreatureConfigData } from "@actor/creature/config";
import { CharacterPF2e } from ".";
export declare class CharacterConfig extends CreatureConfig<CharacterPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<PCConfigData>;
}
interface PCConfigData extends CreatureConfigData<CharacterPF2e> {
    showBasicUnarmed: boolean;
}
export {};
