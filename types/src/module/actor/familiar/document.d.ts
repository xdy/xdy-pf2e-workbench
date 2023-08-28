import { CharacterPF2e, CreaturePF2e } from "@actor";
import { ItemType } from "@item/data/index.ts";
import { RuleElementPF2e } from "@module/rules/index.ts";
import { TokenDocumentPF2e } from "@scene/index.ts";
import { FamiliarSource, FamiliarSystemData } from "./data.ts";
declare class FamiliarPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    get allowedItemTypes(): (ItemType | "physical")[];
    /** The familiar's master, if selected */
    get master(): CharacterPF2e | null;
    get masterAttributeModifier(): number;
    /** Re-render the sheet if data preparation is called from the familiar's master */
    reset({ fromMaster }?: {
        fromMaster?: boolean | undefined;
    }): void;
    /** Set base emphemeral data for later updating by derived-data preparation */
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
