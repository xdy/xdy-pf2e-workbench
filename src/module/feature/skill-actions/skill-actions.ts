/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { ActionsIndex } from "./actions-index";
import { camelize, Flag } from "./utils";
import { ActionType, SKILL_ACTIONS_DATA, SkillActionData, SkillActionDataParameters } from "./skill-actions-data";
import { ItemConstructor } from "./globals";
import { VariantsCollection } from "./variants";

const ACTION_ICONS: Record<ActionType, string> = {
    A: "OneAction",
    D: "TwoActions",
    T: "ThreeActions",
    F: "FreeAction",
    R: "Reaction",
    "": "Passive",
};

export interface ActorSkillAction {
    visible: boolean;
}

export class SkillAction {
    data: SkillActionData;

    constructor(data: SkillActionDataParameters) {
        data.key ??= camelize(data.slug);
        data.actionType ??= "A";
        if (data.icon) {
            data.icon = "systems/pf2e/icons/spells/" + data.icon + ".webp";
        } else {
            data.icon = "systems/pf2e/icons/actions/" + ACTION_ICONS[data.actionType] + ".webp";
        }
        this.data = data;

        this.variants = new VariantsCollection();
        data.variants.forEach(function (variantData) {
            this.buildVariants(variantData);
        }, this);
    }

    get actor() {
        return this.data.actor;
    }

    get key() {
        return this.data.key;
    }

    get label() {
        return this.data.translation ? game.i18n.localize(this.data.translation) : this.pf2eItem.name;
    }

    get visible() {
        return this.actorData?.visible ?? true;
    }

    get pf2eItem(): ItemPF2e {
        return ActionsIndex.instance.get(this.data.slug);
    }

    isDisplayed(filter: string, allVisible: boolean) {
        if (filter) {
            return this.label.toLowerCase().includes(filter) || this.variants.matchFilter(filter);
        } else {
            return this.visible || allVisible;
        }
    }

    hasTrait(trait: string) {
        return this.pf2eItem.system.traits.value.includes(trait);
    }

    getData({ allVisible }: { allVisible: boolean }) {
        const enabled = this.variants.length > 0 && (this.pf2eItem.type !== "feat" || this.actorHasItem());

        return {
            ...this.data,
            enabled: enabled,
            visible: this.visible,
            displayed: this.isDisplayed("", allVisible),
            label: this.label,
            variants: this.variants,
        };
    }

    private get actorData(): ActorSkillAction | undefined {
        return Flag.get(this.actor, `actions.${this.key}`);
    }

    async update(data: ActorSkillAction) {
        await Flag.set(this.actor, `actions.${this.key}`, data);
    }

    async toggleVisibility(visible = !this.visible) {
        await this.update({ visible: visible });
    }

    async rollSkillAction(event) {
        const variant = this.variants[parseInt(event.currentTarget.dataset.variant)];

        if (variant.assuranceTotal) {
            await this.toChat(variant.assuranceTotal);
        } else {
            const rollAction = game.pf2e.actions[this.key];
            if (rollAction) {
                // eslint-disable-next-line @typescript-eslint/await-thenable
                await rollAction({ event, modifiers: variant.modifiers, actors: [this.actor], ...variant.extra });
            } else {
                await this.toChat();
                await variant.skill.roll({ event, modifiers: variant.modifiers, options: [`action:${this.slug}`] });
            }
        }
    }

    async toChat(assurance?: number) {
        const constructor = this.pf2eItem.constructor as ItemConstructor;
        const ownedItem = new constructor(this.pf2eItem.toJSON(), { parent: this.actor });
        if (assurance) {
            ownedItem.system.description.value =
                ownedItem.system.description.value + `<hr /> <p><strong>Assurance</strong> : ${assurance}</p>`;
        }
        await ownedItem.toChat();
    }

    async toggleItemSummary($li: JQuery) {
        // Toggle summary
        if ($li.hasClass("expanded")) {
            const $summary = $li.children(".item-summary");
            $summary.slideUp(200, () => $summary.remove());
        } else {
            const $summary = $('<div class="item-summary">');
            const chatData = await this.pf2eItem.getChatData({ secrets: this.actor.isOwner }, $li.data());
            this.renderItemSummary($summary, this.pf2eItem, chatData);
            $li.children(".item-name, .item-controls, .action-header").last().after($summary);
            $summary.hide().slideDown(200, () => {
                // nothing to do
            });
        }
        $li.toggleClass("expanded");
    }

    /**
     * Called when an item summary is expanded and needs to be filled out.
     */
    renderItemSummary($div: JQuery, item: Embedded<ItemPF2e>, chatData: ItemSummaryData) {
        // append traits (only style the tags if they contain description data)
        const traitTags = Array.isArray(chatData.traits)
            ? chatData.traits
                  .filter((trait) => !trait.excluded)
                  .map((trait) => {
                      const label: string = game.i18n.localize(trait.label);
                      const $trait = $(`<span class="tag">${label}</span>`);
                      if (trait.description) {
                          const description = game.i18n.localize(trait.description);
                          $trait
                              .attr({ title: description })
                              .tooltipster({ maxWidth: 400, theme: "crb-hover", contentAsHTML: true });
                      }
                      return $trait;
                  })
            : [];

        const allTags = [...traitTags].filter((tag): tag is JQuery => !!tag);
        const $properties = $('<div class="item-properties tags"></div>').append(...allTags);
        $div.append($properties, `<div class="item-description">${chatData.description.value}</div>`);
    }

    private actorHasItem(slug = this.data.slug) {
        return !!this.actor.items.find((item) => item.slug === slug);
    }

    private getSkills(proficiencyKey: string) {
        const skills = this.actor.system.skills;
        if (proficiencyKey === "lore") {
            return Object.values(skills).filter((skill) => skill.lore);
        } else {
            return [skills[proficiencyKey]];
        }
    }

    private buildVariants(data) {
        this.getSkills(data.proficiencyKey).forEach((skill) => {
            const requiredRank = data.requiredRank ?? 0;
            const hasRank =
                skill.rank >= requiredRank || (requiredRank === 1 && this.actorHasItem("clever-improviser"));
            if (!hasRank) {
                return;
            }

            this.variants.addBasicVariant(skill, data.extra, data.label);

            if (this.hasTrait("attack")) {
                this.variants.addMapVariant(skill, data.extra, -5);
                this.variants.addMapVariant(skill, data.extra, -10);
            }

            if (
                this.actor.items
                    .filter((x) => x.slug === "assurance")
                    .filter((x) => x.flags.pf2e.rulesSelections.assurance === skill.name)?.length > 0
            ) {
                this.variants.addAssuranceVariant(skill, data.extra);
            }
        });
    }
}

export class SkillActionCollection extends Collection<SkillAction> {
    static allActionsFor(actor): SkillAction[] {
        return deepClone(SKILL_ACTIONS_DATA).map((row) => {
            return new SkillAction({ ...row, actor: actor });
        });
    }

    add(action: SkillAction) {
        if (this.get(action.key)) {
            console.warn("Overwriting existing skill action", action.key);
        }
        this.set(action.key, action);
    }

    fromElement(el: HTMLElement) {
        return this.get(el.dataset.actionId, { strict: true });
    }

    fromEvent(e: JQuery.TriggeredEvent) {
        return this.fromElement(e.delegateTarget);
    }

    toggleVisibility() {
        const visible = !this.some((action) => action.visible);
        this.forEach((action) => action.toggleVisibility(visible));
    }
}
