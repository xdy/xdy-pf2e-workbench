import { CreaturePF2e, type CharacterPF2e } from "@actor";
import { ItemType } from "@item/base/data/index.ts";
import type { CombatantPF2e, EncounterPF2e } from "@module/encounter/index.ts";
import type { RuleElementPF2e } from "@module/rules/index.ts";
import type { TokenDocumentPF2e } from "@scene";
import { Statistic } from "@system/statistic/index.ts";
import { FamiliarSource, FamiliarSystemData } from "./data.ts";
declare class FamiliarPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    /** The familiar's attack statistic, for the rare occasion it must make an attack roll */
    attackStatistic: Statistic;
    get allowedItemTypes(): (ItemType | "physical")[];
    /** The familiar's master, if selected */
    get master(): CharacterPF2e | null;
    get masterAttributeModifier(): number;
    /** @deprecated for internal use but not rule elements referencing it until a migration is in place. */
    get masterAbilityModifier(): number;
    get combatant(): CombatantPF2e<EncounterPF2e> | null;
    /** Re-render the sheet if data preparation is called from the familiar's master */
    reset({ fromMaster }?: {
        fromMaster?: boolean | undefined;
    }): void;
    /** Set base emphemeral data for later updating by derived-data preparation. */
    prepareBaseData(): void;
    /** Skip rule-element preparation if there is no master */
    protected prepareRuleElements(): RuleElementPF2e[];
    prepareDerivedData(): void;
    /** Remove the master's reference to this familiar */
    protected _onDelete(options: DocumentModificationContext<TParent>, userId: string): void;
}
interface FamiliarPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    readonly _source: FamiliarSource;
    system: FamiliarSystemData;
}
export { FamiliarPF2e };
