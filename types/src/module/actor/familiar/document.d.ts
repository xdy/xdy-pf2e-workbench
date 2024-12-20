import { type CharacterPF2e, CreaturePF2e } from "@actor";
import type { ActorUpdateOperation } from "@actor/base.ts";
import type { ItemType } from "@item/base/data/index.ts";
import type { CombatantPF2e, EncounterPF2e } from "@module/encounter/index.ts";
import type { RuleElementPF2e } from "@module/rules/index.ts";
import type { UserPF2e } from "@module/user/document.ts";
import type { TokenDocumentPF2e } from "@scene";
import { Statistic } from "@system/statistic/index.ts";
import type { FamiliarSource, FamiliarSystemData } from "./data.ts";

declare class FamiliarPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    /** The familiar's attack statistic, for the rare occasion it must make an attack roll */
    attackStatistic: Statistic;
    get allowedItemTypes(): (ItemType | "physical")[];
    /** The familiar's master, if selected */
    get master(): CharacterPF2e | null;
    /** Returns attribute modifier value from the master, or 0 if no attribute */
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
    /** Detect if a familiar is being reassigned from a master */
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: FamiliarUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** Remove familiar from former master if the master changed */
    protected _onUpdate(changed: DeepPartial<this["_source"]>, operation: FamiliarUpdateOperation<TParent>, userId: string): void;
    /** Remove the master's reference to this familiar */
    protected _onDelete(operation: DatabaseDeleteOperation<TParent>, userId: string): void;
}
interface FamiliarPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    readonly _source: FamiliarSource;
    system: FamiliarSystemData;
}
interface FamiliarUpdateOperation<TParent extends TokenDocumentPF2e | null> extends ActorUpdateOperation<TParent> {
    previousMaster?: ActorUUID;
}
export { FamiliarPF2e };
