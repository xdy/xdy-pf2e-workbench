import { ActorPF2e, CreaturePF2e } from "@actor";
import { ItemType } from "@item/data/index.ts";
import { UserPF2e } from "@module/documents.ts";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter/index.ts";
import { TokenDocumentPF2e } from "@scene/index.ts";
import { Statistic } from "@system/statistic/index.ts";
import { DataModelValidationOptions } from "types/foundry/common/abstract/data.js";
import { PartySource, PartySystemData } from "./data.ts";
import { PartyCampaign, PartyUpdateContext } from "./types.ts";
import { RuleElementPF2e } from "@module/rules/index.ts";
import { RuleElementSchema } from "@module/rules/rule-element/data.ts";
declare class PartyPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    armorClass: null;
    members: CreaturePF2e[];
    campaign: PartyCampaign | null;
    get active(): boolean;
    get baseAllowedItemTypes(): (ItemType | "physical")[];
    get allowedItemTypes(): (ItemType | "physical")[];
    /** Friendship lives in our hearts */
    get canAct(): false;
    /** Part members can add and remove items (though system socket shenanigans)  */
    canUserModify(user: UserPF2e, action: UserAction): boolean;
    /** Our bond is unbreakable */
    isAffectedBy(): false;
    /** Override validation to defer certain properties to the campaign model */
    validate(options?: DataModelValidationOptions): boolean;
    /** Only prepare rule elements for non-physical items (in case campaigin items exist) */
    protected prepareRuleElements(): RuleElementPF2e<RuleElementSchema>[];
    prepareBaseData(): void;
    /** Run rule elements (which may occur if it contains a kingdom) */
    prepareEmbeddedDocuments(): void;
    prepareDerivedData(): void;
    addMembers(...membersToAdd: CreaturePF2e[]): Promise<void>;
    removeMembers(...remove: (ActorUUID | CreaturePF2e)[]): Promise<void>;
    /** Adds all members to combat */
    addToCombat(options?: {
        combat?: EncounterPF2e;
    }): Promise<CombatantPF2e<EncounterPF2e>[]>;
    getRollData(): Record<string, unknown>;
    /** Re-render the sheet if data preparation is called from the familiar's master */
    reset({ actor }?: {
        actor?: boolean | undefined;
    }): void;
    /** Include campaign statistics in party statistics */
    getStatistic(slug: string): Statistic | null;
    private _resetAndRerenderDebounced;
    protected _preUpdate(changed: DeepPartial<PartySource>, options: PartyUpdateContext<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** Override to inform creatures when they were booted from a party */
    protected _onUpdate(changed: DeepPartial<PartySource>, options: PartyUpdateContext<TParent>, userId: string): void;
    /** Overriden to inform creatures the party is defunct */
    protected _onDelete(options: DocumentModificationContext<TParent>, userId: string): void;
}
interface PartyPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: PartySource;
    system: PartySystemData;
}
export { PartyPF2e };
