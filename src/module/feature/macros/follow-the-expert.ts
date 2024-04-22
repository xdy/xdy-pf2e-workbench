import type { Action, ActionVariant, ActionUseOptions, ActionMessageOptions } from "@actor/actions/types.d.ts";
import type { ChatMessagePF2e } from "@module/chat-message/document.d.ts";
import type { ActionTrait } from "@item/ability/index.d.ts";
import type { EffectPF2e } from "@item";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";

class FollowTheExpertAction implements Action {
    readonly img: string;
    readonly name: string;
    readonly slug: string;
    readonly traits: ActionTrait[];
    // variants is required for the interface, but this action has no variants.
    // Since nothing in this module uses them, an empty collection satifies the
    // requirements with the least code.
    readonly variants: Collection<ActionVariant>;

    readonly effect: ItemUUID;

    public constructor() {
        this.img = "systems/pf2e/icons/spells/favorable-review.webp";
        this.name = `${MODULENAME}.macros.basicActionMacros.actions.FollowTheExpertToggle`;
        this.slug = "follow-the-expert";
        this.traits = ["exploration"];
        this.variants = new Collection();
        this.effect = "Compendium.pf2e.other-effects.VCSpuc3Tf3XWMkd3" as ItemUUID; // Effect: Follow The Expert
    }

    async use(_options?: Partial<ActionUseOptions>): Promise<unknown> {
        const source = (await fromUuid(this.effect)) as EffectPF2e | null;
        if (!source) throw new Error(`Effect ${this.effect} not found!`);
        const effect = source.toObject();
        (effect.flags.core ??= {}).sourceId = this.effect;

        const actors = canvas.tokens.controlled.flatMap((token) => token.actor ?? []);
        if (actors.length === 0 && game.user.character) actors.push(game.user.character);
        if (actors.length === 0) {
            return ui.notifications.error("PF2E.ErrorMessage.NoTokenSelected", { localize: true });
        }

        for (const actor of actors) {
            const existing = actor.itemTypes.effect.find((e) => e.flags.core?.sourceId === this.effect);
            if (existing) {
                await existing.delete();
            } else {
                await actor.createEmbeddedDocuments("Item", [effect]);
            }
        }

        // SimpleAction would return a list of [actor, effect, message] tuples,
        // but nothing will use it, so it's not done here.
        return true;
    }

    async toMessage(_options?: Partial<ActionMessageOptions>): Promise<ChatMessagePF2e | undefined> {
        // There isn't a message for toggling an effect.  Could be added.
        return undefined;
    }
}

let followTheExpert: FollowTheExpertAction;
// Break module initialization order issue w.r.t. MODULENAME from xdy-pf2e-workbench.js
Hooks.once("setup", () => {
    followTheExpert = new FollowTheExpertAction();
});

export { followTheExpert };
