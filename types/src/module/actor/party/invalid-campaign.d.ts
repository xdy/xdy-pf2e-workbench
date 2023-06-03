import { PartyCampaign } from "./types.ts";
import { PartyPF2e } from "./document.ts";
/**
 * Exists if the party's campaign type does not match the configured setting.
 * Creates a warning and deletion dialog to give one last chance to back out.
 */
declare class InvalidCampaign implements PartyCampaign {
    type: string;
    actor: PartyPF2e;
    configuredType: string;
    constructor(actor: PartyPF2e, currentType: string);
    createSidebarButtons(): HTMLElement[];
}
export { InvalidCampaign };
