import { SKILL_ACTIONS_DATA } from "./skill-actions-data";
import { ActionItemPF2e, ItemPF2e } from "@item";
import { sluggify } from "../../utils";

const ACTION_IDS = SKILL_ACTIONS_DATA.map((row) => row.compendiumId);

export class ActionsIndex extends Map<string, ItemPF2e> {
    private static _instance: ActionsIndex;

    static get instance() {
        if (!this._instance) {
            this._instance = new ActionsIndex();
        }
        return this._instance;
    }

    private constructor() {
        super();
    }

    async loadCompendium(packName: string) {
        const pack = game.packs.get(packName);
        if (!pack) {
            return;
        }

        const actions = <ActionItemPF2e[]>await pack.getDocuments({ _id: { $in: ACTION_IDS } });
        for (const action of actions) {
            // It's weird that this is needed, but...
            const slug = action.slug ?? sluggify(action.name);
            if (slug) {
                this.set(slug, action);
            }
        }
    }
}
