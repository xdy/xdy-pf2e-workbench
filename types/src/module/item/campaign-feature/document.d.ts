import type { ActorPF2e } from "@actor";
import type { FeatGroup } from "@actor/character/feats/index.ts";
import { ItemPF2e } from "@item";
import { ActionCost, Frequency } from "@item/base/data/index.ts";
import type { UserPF2e } from "@module/user/index.ts";
import { CampaignFeatureSource, CampaignFeatureSystemData } from "./data.ts";
import type { BehaviorType, KingmakerCategory, KingmakerTrait } from "./types.ts";

declare class CampaignFeaturePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    group: FeatGroup<ActorPF2e, CampaignFeaturePF2e> | null;
    grants: CampaignFeaturePF2e[];
    behavior: BehaviorType;
    levelLabel: string;
    /** The item that granted this feature */
    granter: CampaignFeaturePF2e | null;
    static get validTraits(): Record<KingmakerTrait, string>;
    get category(): KingmakerCategory;
    /** Returns the level if the feature type supports it */
    get level(): number | null;
    get traits(): Set<KingmakerTrait>;
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    get isAction(): boolean;
    get isFeature(): boolean;
    get isFeat(): boolean;
    prepareBaseData(): void;
    /** Set a self roll option for this feat(ure). Skip for actions */
    prepareActorData(this: CampaignFeaturePF2e<ActorPF2e>): void;
    prepareSiblingData(): void;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string, options?: {
        includeGranter?: boolean;
    }): string[];
    protected _preCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<CampaignFeatureSource>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected embedHTMLString(_config: DocumentHTMLEmbedConfig, _options: EnrichmentOptions): string;
}
interface CampaignFeaturePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: CampaignFeatureSource;
    system: CampaignFeatureSystemData;
}
export { CampaignFeaturePF2e };
