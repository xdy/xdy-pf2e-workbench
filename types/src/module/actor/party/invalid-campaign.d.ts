import type { DataSchema } from "types/foundry/common/data/fields.d.ts";
import { PartyPF2e } from "./document.ts";
import { PartyCampaign } from "./types.ts";
declare const DataModel: typeof import("../../../../types/foundry/common/abstract/data.js").default;
/**
 * Exists if the party's campaign type does not match the configured setting.
 * Creates a warning and deletion dialog to give one last chance to back out.
 */
declare class InvalidCampaign extends DataModel<PartyPF2e, {}> implements PartyCampaign {
    type: string;
    actor: PartyPF2e;
    options: InvalidCampaignOptions;
    constructor(actor: PartyPF2e, options: InvalidCampaignOptions);
    static defineSchema(): DataSchema;
    createSidebarButtons(): HTMLElement[];
}
interface InvalidCampaignOptions {
    campaignType?: string;
    reason: "error" | "mismatch";
}
export { InvalidCampaign };
