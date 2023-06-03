import { KingdomCHG, KingdomGovernment, KingdomSchema, KingdomSource } from "./data.ts";
import type { PartyPF2e } from "../document.ts";
import { ModelPropsFromSchema } from "types/foundry/common/data/fields.js";
import { PartyCampaign } from "../types.ts";
import { ItemType } from "@item/data/index.ts";
import { FeatGroup } from "@actor/character/feats.ts";
import { PartyCampaignSource } from "../data.ts";
declare const DataModel: typeof import("../../../../../types/foundry/common/abstract/data.js").default;
/** Model for the Kingmaker campaign data type, which represents a Kingdom */
declare class KingdomModel extends DataModel<null, KingdomSchema> implements PartyCampaign {
    #private;
    private actor;
    feats: FeatGroup<PartyPF2e>;
    bonusFeats: FeatGroup<PartyPF2e>;
    static defineSchema(): KingdomSchema;
    get extraItemTypes(): ItemType[];
    get charter(): KingdomCHG | null;
    get heartland(): KingdomCHG | null;
    get government(): KingdomGovernment | null;
    constructor(actor: PartyPF2e, source?: PartyCampaignSource);
    /** Creates sidebar buttons to inject into the chat message sidebar */
    createSidebarButtons(): HTMLElement[];
    update(data: DeepPartial<KingdomSource> & Record<string, unknown>): Promise<void>;
}
interface KingdomModel extends ModelPropsFromSchema<KingdomSchema> {
}
export { KingdomModel };
